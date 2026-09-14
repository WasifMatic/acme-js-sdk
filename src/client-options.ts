import type { FetchLike } from "./core/api-request.js";
import type { TokenProvider } from "./core/auth/credentials.js";
import { ServerEnvironment, type ServerOptions } from "./servers.js";

export type ClientOptions = {
  readonly serverEnvironment: ServerEnvironment;
  readonly serverOptions: ServerOptions;
  readonly timeout: number;
  readonly fetch?: FetchLike | undefined;
  readonly petstoreAuth?: TokenProvider | undefined;
  readonly apiKey?: TokenProvider | undefined;
};

export const DEFAULT_CLIENT_OPTIONS: ClientOptions = {
  serverEnvironment: ServerEnvironment.Production,
  serverOptions: {},
  timeout: 60_000,
};
