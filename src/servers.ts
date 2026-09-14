import type { UrlTemplate } from "./core/api-request.js";
import { SdkError } from "./core/errors.js";

export const ServerEnvironment = {
  Production: "production",
} as const;
export type ServerEnvironment = (typeof ServerEnvironment)[keyof typeof ServerEnvironment];

export type DefaultServerOptions = {
  production?: { baseUrl?: string };
};

export type AuthServerServerOptions = {
  production?: { baseUrl?: string };
};

export type ServerOptions = {
  default?: DefaultServerOptions;
  authServer?: AuthServerServerOptions;
};

export type Servers = {
  default: (subPath: string) => UrlTemplate;
  authServer: (subPath: string) => UrlTemplate;
};

export const DEFAULT_SERVER_OPTIONS = {
  default: {
    production: { baseUrl: "https://petstore3.swagger.io/api/v3" },
  },
  authServer: {
    production: { baseUrl: "https://petstore3.swagger.io/oauth" },
  },
} as const satisfies ServerOptions;

export function buildServers(environment: ServerEnvironment, options: ServerOptions): Servers {
  return {
    default: (s) => defaultServer(environment, s, options.default),
    authServer: (s) => authServerServer(environment, s, options.authServer),
  };
}

function defaultServer(
  environment: ServerEnvironment,
  subPath: string,
  options?: DefaultServerOptions,
): UrlTemplate {
  switch (environment) {
    case ServerEnvironment.Production: {
      const production = { ...DEFAULT_SERVER_OPTIONS.default.production, ...options?.production };
      return { baseUrl: production.baseUrl, subPath };
    }
    default:
      unknownEnvironment(environment);
  }
}

function authServerServer(
  environment: ServerEnvironment,
  subPath: string,
  options?: AuthServerServerOptions,
): UrlTemplate {
  switch (environment) {
    case ServerEnvironment.Production: {
      const production = { ...DEFAULT_SERVER_OPTIONS.authServer.production, ...options?.production };
      return { baseUrl: production.baseUrl, subPath };
    }
    default:
      unknownEnvironment(environment);
  }
}

function unknownEnvironment(environment: never): never {
  throw new SdkError({ message: `Unknown server environment: ${String(environment)}` });
}
