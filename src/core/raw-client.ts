import type { ApiRequest, RequestOptions, RawClientOptions, FetchLike } from "./api-request.js";
import { CoreError, ConnectionError, SdkError } from "./errors.js";
import { decodeErrorPayload, type AnyResponseError, type ResponseHandler } from "./response-error.js";
import { decodeResponse } from "./response-decoder.js";
import { ApiPromise, type RequestOutcome } from "./api-promise.js";
import { buildBody } from "./request-body.js";
import { startDeadline } from "./deadline.js";
import { buildUrl } from "./url.js";
import { buildHeaders } from "./headers.js";
import * as s from "./validation/index.js";

const DEFAULT_TIMEOUT_MS = 100_000;
const MAX_TIMEOUT_MS = 2_147_483_647;

export class RawClient {
  readonly #config: RawClientOptions;
  readonly #fetch: FetchLike;

  constructor(config: RawClientOptions) {
    const fetchImpl = config.fetch ?? globalThis.fetch;
    if (typeof fetchImpl !== "function") {
      throw new SdkError({ message: "No fetch implementation available; pass ClientOptions.fetch." });
    }
    this.#config = config;
    this.#fetch = fetchImpl;
  }

  execute<T, E extends AnyResponseError>(
    apiRequest: ApiRequest,
    responseHandler: ResponseHandler<T, E>,
    options?: RequestOptions,
  ): ApiPromise<T, E> {
    return new ApiPromise<T, E>(this.#dispatch<T, E>(apiRequest, responseHandler, options?.signal));
  }

  async #dispatch<T, E extends AnyResponseError>(
    apiRequest: ApiRequest,
    responseHandler: ResponseHandler<T, E>,
    callerSignal: AbortSignal | undefined,
  ): Promise<RequestOutcome<T, E>> {
    const deadline = startDeadline(resolveTimeout(this.#config.timeout), callerSignal);

    let response: Response;
    try {
      const auth = await apiRequest.auth.resolve(deadline.signal);

      const url = buildUrl(
        apiRequest.url,
        apiRequest.pathParams,
        apiRequest.query,
        this.#config.defaultQuery,
        this.#config.defaultPathParams,
        auth.query,
      );
      const body = buildBody(apiRequest.body, deadline.signal);
      const headers = buildHeaders(
        [
          [
            { name: "content-type", value: body.contentType, schema: s.optional(s.string()) },
            { name: "content-disposition", value: body.contentDisposition, schema: s.optional(s.string()) },
          ],
          this.#config.defaultHeaders,
          apiRequest.headers,
          auth.headers,
        ],
        auth.cookies,
      );

      response = await this.#fetch.call(undefined, url, {
        method: apiRequest.method,
        headers,
        body: body.body,
        signal: deadline.signal,
        ...(body.streaming === true ? { duplex: "half", window: null, redirect: "error" } : {}),
      });
    } catch (err) {
      deadline.settle();
      if (err instanceof CoreError) throw err;
      if (deadline.signal.aborted) throw deadline.signal.reason;
      throw new ConnectionError({ message: errorMessage(err, "Connection error."), cause: err });
    }

    if (response.status === 401) apiRequest.auth.invalidate?.();

    const { status, headers: responseHeaders, statusText } = response;
    try {
      if (isSuccess(status)) {
        const data = await decodeResponse(responseHandler.success, response, deadline);
        return { ok: true, status, headers: responseHeaders, data };
      }

      const payload = await decodeErrorPayload(response, responseHandler.errorFactory.errors, status);
      const error = new responseHandler.errorFactory({
        status,
        headers: responseHeaders,
        message: statusMessage(status, statusText),
        payload,
      });

      return { ok: false, status, headers: responseHeaders, error };
    } catch (err) {
      if (err instanceof CoreError) throw err;
      throw new SdkError({ message: errorMessage(err, "Response handling failed."), cause: err });
    } finally {
      deadline.settle();
    }
  }
}

function resolveTimeout(configured: number): number {
  if (!Number.isFinite(configured) || configured <= 0) return DEFAULT_TIMEOUT_MS;
  return Math.min(configured, MAX_TIMEOUT_MS);
}

function isSuccess(status: number): boolean {
  return status >= 200 && status <= 299;
}

function statusMessage(status: number, statusText: string): string {
  return `${status} ${statusText || "HTTP error"}`;
}

function errorMessage(err: unknown, fallback: string): string {
  return err instanceof Error && err.message ? err.message : fallback;
}
