import { buildAuthSchemes, type AuthSchemes } from "./auth-schemes.js";
import { DEFAULT_CLIENT_OPTIONS, type ClientOptions } from "./client-options.js";
import { RawClient } from "./core/raw-client.js";
import { PetApi } from "./resources/pet-api.js";
import { Store } from "./resources/store.js";
import { UserApi } from "./resources/user-api.js";
import { buildServers, type Servers } from "./servers.js";

/**
 * Sample Pet Store server based on the OpenAPI 3.0 specification.
 */
export class SwaggerPetstoreOpenApi30Client {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;
  #petApi?: PetApi;
  #store?: Store;
  #userApi?: UserApi;

  constructor(clientOptions: Partial<ClientOptions> = {}) {
    const options = { ...DEFAULT_CLIENT_OPTIONS, ...clientOptions };

    this.#rawClient = new RawClient({
      timeout: options.timeout,
      defaultHeaders: [],
      defaultQuery: [],
      defaultPathParams: [],
      fetch: options.fetch,
    });

    this.#servers = buildServers(options.serverEnvironment, options.serverOptions);

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
