export { SwaggerPetstoreOpenApi30Client } from "./client.js";
export { DEFAULT_CLIENT_OPTIONS, type ClientOptions } from "./client-options.js";

export type { TokenProvider } from "./core/auth/credentials.js";

export { ServerEnvironment, DEFAULT_SERVER_OPTIONS } from "./servers.js";
export type { ServerOptions, DefaultServerOptions, AuthServerServerOptions } from "./servers.js";

export { PetApi } from "./resources/pet-api.js";
export { Store } from "./resources/store.js";
export { UserApi } from "./resources/user-api.js";

export { apiResponseSchema, type ApiResponse } from "./models/api-response.js";
export { categorySchema, type Category } from "./models/category.js";
export { orderSchema, type Order } from "./models/order.js";
export { OrderStatus, orderStatusSchema } from "./models/order-status.js";
export { petSchema, type Pet } from "./models/pet.js";
export { PetStatus, petStatusSchema } from "./models/pet-status.js";
export { tagSchema, type Tag } from "./models/tag.js";
export { userSchema, type User } from "./models/user.js";

export {
  CoreError as SwaggerPetstoreOpenApi30Error,
  ConnectionError,
  TimeoutError,
  AbortError,
  SdkError,
  AuthError,
} from "./core/errors.js";
export { ResponseError } from "./core/response-error.js";
export { SchemaError } from "./core/validation/schema-error.js";
export type { ApiPromise, ApiResult } from "./core/api-promise.js";
export type { RequestOptions } from "./core/api-request.js";
export type { BinaryContent, BinaryData, BinaryErrorContent, FileData, FileInput } from "./core/binary.js";
export type { ErrorKind } from "./core/errors.js";
export type { ErrorPayload, Declared, Undeclared } from "./core/response-error.js";
export type { Schema, EnumSchema, Encoded } from "./core/validation/schema.js";
