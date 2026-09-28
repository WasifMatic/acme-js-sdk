import type { TokenProvider } from "./core/auth/credentials.js";
import type { CoreClientOptions } from "./core/client-options.js";

export type ClientOptions = SdkClientOptions & Partial<CoreClientOptions>;

type SdkClientOptions = ServerOptions & {
  readonly petstoreAuth?: TokenProvider | undefined;
  readonly apiKey?: TokenProvider | undefined;
};

type ServerOptions = {
  readonly serverOptions?: {
    default?: {
      baseUrl?: string;
    };
    authServer?: {
      baseUrl?: string;
    };
  };
};
