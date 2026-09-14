import type { ClientOptions } from "./client-options.js";
import type { AuthScheme } from "./core/api-request.js";
import { apiKeyHeaderAuth } from "./core/auth/schemes.js";

export type AuthSchemes = {
  readonly petstoreAuth: AuthScheme;
  readonly apiKey: AuthScheme;
};

export function buildAuthSchemes(options: ClientOptions): AuthSchemes {
  return {
    petstoreAuth: apiKeyHeaderAuth({ name: "Authorization", token: options.petstoreAuth }),
    apiKey: apiKeyHeaderAuth({ name: "api_key", token: options.apiKey }),
  };
}
