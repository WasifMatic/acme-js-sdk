import type { ApiRequest, RequestOptions, RawClientOptions } from "./api-request.js";
import { AuthError, CoreError, ConnectionError, DecodeError, EncodeError } from "./errors.js";
import { decodeErrorPayload, type AnyApiError, type ResponseHandler } from "./api-error.js";
import { decodeResponse } from "./response-decoder.js";
import { ApiPromise, type RequestOutcome } from "./api-promise.js";
import { buildBody, type BodyContent } from "./request-body.js";
import { startDeadline } from "./deadline.js";
import { applyQuery, resolveUri, templateUri } from "./url.js";
import { buildHeaders } from "./headers.js";
import { queryString } from "./params.js";
import * as s from "./validation/index.js";
import { SchemaError } from "./validation/schema-error.js";

export class RawClient {
  readonly #config: RawClientOptions;

  constructor(config: RawClientOptions) {
    this.#config = config;
  }

  execute<T, E extends AnyApiError>(
    apiRequest: ApiRequest,
    responseHandler: ResponseHandler<T, E>,
    options?: RequestOptions,
  ): ApiPromise<T, E> {
    return new ApiPromise<T, E>(this.#dispatch<T, E>(apiRequest, responseHandler, options?.signal));
  }

  async #dispatch<T, E extends AnyApiError>(
    apiRequest: ApiRequest,
    responseHandler: ResponseHandler<T, E>,
    callerSignal: AbortSignal | undefined,
  ): Promise<RequestOutcome<T, E>> {
    let uri = templateUri(apiRequest.url);
    const deadline = startDeadline(this.#config.timeout, callerSignal, apiRequest.method, () => uri);

    let url: URL;
    let body: BodyContent;
    let headers: Headers;
    try {
      url = resolveUri(apiRequest.url, apiRequest.pathParams, this.#config.defaultPathParams);
      uri = url.href;
      applyQuery(url, apiRequest.query, this.#config.defaultQuery);
      body = buildBody(apiRequest.body, deadline.signal);
      headers = buildHeaders([
        [
          { name: "content-type", value: body.contentType, schema: s.optional(s.string()) },
          { name: "content-disposition", value: body.contentDisposition, schema: s.optional(s.string()) },
        ],
        this.#config.defaultHeaders,
        apiRequest.headers,
      ]);
    } catch (err) {
      deadline.settle();
      if (err instanceof CoreError) throw err;
      if (deadline.signal.aborted) throw deadline.signal.reason;
      if (err instanceof SchemaError) {
        throw new EncodeError(`${apiRequest.method} ${uri} failed: Request value could not be encoded.`, {
          cause: err,
          method: apiRequest.method,
          uri,
        });
      }
      throw err;
    }

    try {
      const auth = await apiRequest.auth.resolve(deadline.signal);
      if (auth.query !== undefined && auth.query.length > 0) {
        url.search = queryString([auth.query], [...url.searchParams]);
      }
      buildHeaders([auth.headers], auth.cookies, headers);
    } catch (err) {
      deadline.settle();
      if (err instanceof CoreError && err.kind !== "api" && err.kind !== "decode" && err.kind !== "encode")
        throw err;
      if (deadline.signal.aborted) throw deadline.signal.reason;
      throw new AuthError(
        `${apiRequest.method} ${uri} failed: ${
          err instanceof Error && err.message !== "" ? err.message : "A credential could not be obtained."
        }`,
        { cause: err, method: apiRequest.method, uri },
      );
    }

    let response: Response;
    try {
      response = await this.#config.fetch.call(undefined, url, {
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
      throw new ConnectionError(
        `${apiRequest.method} ${uri} failed: ${
          err instanceof Error && err.message !== "" ? err.message : "Connection error."
        }`,
        { cause: err, method: apiRequest.method, uri },
      );
    }

    if (response.status === 401) apiRequest.auth.invalidate?.();

    const { status, headers: responseHeaders } = response;
    try {
      if (isSuccess(status)) {
        const data = await decodeResponse(
          responseHandler.success,
          response,
          apiRequest.method,
          uri,
          deadline,
        );
        return { ok: true, status, headers: responseHeaders, data };
      }

      const payload = await decodeErrorPayload(
        response,
        responseHandler.errorFactory.errors,
        status,
        apiRequest.method,
        uri,
      );
      const error = new responseHandler.errorFactory({
        status,
        headers: responseHeaders,
        method: apiRequest.method,
        uri,
        payload,
      });

      return { ok: false, status, headers: responseHeaders, error };
    } catch (err) {
      if (deadline.signal.aborted && err instanceof DecodeError && err.cause === deadline.signal.reason)
        throw deadline.signal.reason;
      throw err;
    } finally {
      deadline.settle();
    }
  }
}

function isSuccess(status: number): boolean {
  return status >= 200 && status <= 299;
}
