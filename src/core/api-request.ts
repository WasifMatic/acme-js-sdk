import type { RequestBody } from "./request-body.js";
import type { CoreClientOptions } from "./client-options.js";
import type { StyledParam, Param } from "./param-value.js";

/** HTTP method of a call. Closed, and the type of `method` on every failure the SDK raises. */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";

/**
 * Per-call options, the optional second argument of every operation.
 *
 * @remarks
 * Aborting rejects the returned {@link ApiPromise} with the signal's own `reason`. Credentials,
 * the server and the timeout are configured once on the client rather than per call.
 */
export type RequestOptions = {
  signal?: AbortSignal;
};

export type RawClientOptions = CoreClientOptions & {
  readonly defaultHeaders: readonly Param[];
  readonly defaultQuery: readonly StyledParam[];
  readonly defaultPathParams: readonly Param[];
};

export type UrlTemplate = {
  baseUrl: string;
  subPath: string;
  variables?: Record<string, string> | undefined;
};

/**
 * A named server with its options already decoded: the base URL and its variables, still
 * unexpanded, and without an operation's sub-path.
 */
export type ServerBase = Omit<UrlTemplate, "subPath">;

export type AuthParams = {
  readonly headers?: readonly Param[];
  readonly query?: readonly StyledParam[];
  readonly cookies?: readonly Param[];
};

export type AuthScheme = {
  resolve(signal: AbortSignal): Promise<AuthParams> | AuthParams;
  hasCredentials(): boolean;
  invalidate?(): void;
};

export type ApiRequest = {
  method: HttpMethod;
  url: UrlTemplate;
  auth: AuthScheme;
  pathParams?: Param[] | undefined;
  query?: StyledParam[] | undefined;
  headers?: Param[] | undefined;
  body: RequestBody;
};
