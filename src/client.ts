import { buildAuthSchemes, type AuthSchemes } from "./auth-schemes.js";
import type { ClientOptions } from "./client-options.js";
import { buildCoreClientOptions } from "./core/client-options.js";
import { RawClient } from "./core/raw-client.js";
import * as host from "./core/runtime-environment.js";
import * as s from "./core/validation/index.js";
import { PetApi } from "./resources/pet-api.js";
import { Store } from "./resources/store.js";
import { UserApi } from "./resources/user-api.js";
import { buildServers, type Servers } from "./servers.js";

/**
 * This is a sample Pet Store Server based on the OpenAPI 3.0 specification. You can find out more
 * about Swagger at [https://swagger.io](https://swagger.io). In the third iteration of the pet
 * store, we've switched to the design first approach! You can now help us improve the API whether
 * it's by making changes to the definition itself or to the code. That way, with time, we can
 * improve the API in general, and expose some of the new features in OAS3.
 *
 * Some useful links:
 * - [The Pet Store repository](https://github.com/swagger-api/swagger-petstore)
 * - [The source API definition for the Pet
 *   Store](https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml)
 */
export class SwaggerPetstoreOpenApi30Client {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;
  #petApi?: PetApi;
  #store?: Store;
  #userApi?: UserApi;

  constructor(options: ClientOptions = {}) {
    this.#rawClient = new RawClient({
      ...buildCoreClientOptions(options),
      defaultHeaders: [
        { name: "User-Agent", value: "SwaggerPetstoreOpenApi30Client/1.0.26 TypeScript", schema: s.string() },
        { name: "X-APIMatic-Lang", value: "TypeScript", schema: s.string() },
        { name: "X-APIMatic-Package-Version", value: "1.0.26", schema: s.string() },
        { name: "X-APIMatic-Gen-Version", value: "4.0.0", schema: s.string() },
        { name: "X-APIMatic-OS", value: host.operatingSystem(), schema: s.optional(s.string()) },
        { name: "X-APIMatic-Runtime", value: host.runtimeDescription(), schema: s.optional(s.string()) },
      ],
      defaultQuery: [],
      defaultPathParams: [],
    });

    this.#servers = buildServers(options);

    this.#auth = buildAuthSchemes(options);
  }

  /**
   * Everything about your Pets
   */
  get petApi(): PetApi {
    return (this.#petApi ??= new PetApi(this.#rawClient, this.#servers, this.#auth));
  }

  /**
   * Access to Petstore orders
   */
  get store(): Store {
    return (this.#store ??= new Store(this.#rawClient, this.#servers, this.#auth));
  }

  /**
   * Operations about user
   */
  get userApi(): UserApi {
    return (this.#userApi ??= new UserApi(this.#rawClient, this.#servers));
  }
}
