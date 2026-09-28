import type { ClientOptions } from "./client-options.js";
import type { ServerBase, UrlTemplate } from "./core/api-request.js";
import * as s from "./core/validation/index.js";

export type Servers = {
  default: (subPath: string) => UrlTemplate;
  authServer: (subPath: string) => UrlTemplate;
};

const serverSchemas = {
  default: { baseUrl: s.of(s.defaulted(s.string(), "https://petstore3.swagger.io/api/v3")) },
  authServer: { baseUrl: s.of(s.defaulted(s.string(), "https://petstore3.swagger.io/oauth")) },
};

export function buildServers(options: ClientOptions): Servers {
  const base = {
    default: defaultServer(options),
    authServer: authServerServer(options),
  };
  return {
    default: (subPath) => ({ ...base.default, subPath }),
    authServer: (subPath) => ({ ...base.authServer, subPath }),
  };
}

function defaultServer(options: ClientOptions): ServerBase {
  return { baseUrl: serverSchemas.default.baseUrl.decode(options.serverOptions?.default?.baseUrl) };
}

function authServerServer(options: ClientOptions): ServerBase {
  return { baseUrl: serverSchemas.authServer.baseUrl.decode(options.serverOptions?.authServer?.baseUrl) };
}
