import type { AuthSchemes } from "../auth-schemes.js";
import { ApiError, type Declared, type ErrorDecoders, type ErrorPayload } from "../core/api-error.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import { noneAuth } from "../core/auth/schemes.js";
import type { RawClient } from "../core/raw-client.js";
import { uuid } from "../core/uuid.js";
import * as s from "../core/validation/index.js";
import { orderStatusSchema, type OrderStatus } from "../models/order-status.js";
import { orderSchema, type Order } from "../models/order.js";
import type { Servers } from "../servers.js";

/**
 * Access to Petstore orders
 */
export class Store {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  /**
   * Delete purchase order by identifier.
   *
   * @remarks
   * For valid response try integer IDs with value < 1000. Anything above 1000 or non-integers will
   * generate API errors.
   *
   * @returns order deleted
   *
   * @throws {@link Store.DeleteOrderError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link SwaggerPetstoreOpenApi30Error} when no usable response was produced: a
   * connection failure, a timeout, a body that would not decode, a value that would not encode, or
   * a credential that could not be obtained
   */
  deleteOrder(
    request: Store.DeleteOrderRequest,
    options?: RequestOptions,
  ): ApiPromise<undefined, Store.DeleteOrderError> {
    return this.#rawClient.execute(
      {
        method: "DELETE",
        url: this.#servers.default("/store/order/{orderId}"),
        auth: noneAuth,
        pathParams: [{ name: "orderId", value: request.orderId, schema: s.number() }],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "empty" },
        errorFactory: Store.DeleteOrderError,
      },
      options,
    );
  }

  /**
   * Returns pet inventories by status.
   *
   * @remarks
   * Returns a map of status codes to quantities.
   *
   * @returns successful operation
   *
   * @throws {@link Store.GetInventoryError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link SwaggerPetstoreOpenApi30Error} when no usable response was produced: a
   * connection failure, a timeout, a body that would not decode, a value that would not encode, or
   * a credential that could not be obtained
   */
  getInventory(options?: RequestOptions): ApiPromise<Record<string, number>, Store.GetInventoryError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        url: this.#servers.default("/store/inventory"),
        auth: this.#auth.apiKey,
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: s.record(s.string(), s.number()) },
        errorFactory: Store.GetInventoryError,
      },
      options,
    );
  }

  /**
   * Find purchase order by ID.
   *
   * @remarks
   * For valid response try integer IDs with value <= 5 or > 10. Other values will generate
   * exceptions.
   *
   * @returns successful operation
   *
   * @throws {@link Store.GetOrderByIdError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link SwaggerPetstoreOpenApi30Error} when no usable response was produced: a
   * connection failure, a timeout, a body that would not decode, a value that would not encode, or
   * a credential that could not be obtained
   */
  getOrderById(
    request: Store.GetOrderByIdRequest,
    options?: RequestOptions,
  ): ApiPromise<Order, Store.GetOrderByIdError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        url: this.#servers.default("/store/order/{orderId}"),
        auth: noneAuth,
        pathParams: [{ name: "orderId", value: request.orderId, schema: s.number() }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: orderSchema },
        errorFactory: Store.GetOrderByIdError,
      },
      options,
    );
  }

  /**
   * Place an order for a pet.
   *
   * @remarks
   * Place a new order in the store.
   *
   * @returns successful operation
   *
   * @throws {@link Store.PlaceOrderError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link SwaggerPetstoreOpenApi30Error} when no usable response was produced: a
   * connection failure, a timeout, a body that would not decode, a value that would not encode, or
   * a credential that could not be obtained
   */
  placeOrder(
    request: Store.PlaceOrderRequest,
    options?: RequestOptions,
  ): ApiPromise<Order, Store.PlaceOrderError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/store/order"),
        auth: noneAuth,
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: {
          kind: "formUrlEncoded",
          value: [
            { name: "id", value: request.id, schema: s.optional(s.number()) },
            { name: "petId", value: request.petId, schema: s.optional(s.number()) },
            { name: "quantity", value: request.quantity, schema: s.optional(s.number()) },
            { name: "shipDate", value: request.shipDate, schema: s.optional(s.dateTime()) },
            { name: "status", value: request.status, schema: s.optional(s.lazy(() => orderStatusSchema)) },
            { name: "complete", value: request.complete, schema: s.optional(s.boolean()) },
          ],
        },
      },
      {
        success: { kind: "json", schema: orderSchema },
        errorFactory: Store.PlaceOrderError,
      },
      options,
    );
  }
}

export namespace Store {
  export type DeleteOrderRequest = {
    /** ID of the order that needs to be deleted */
    orderId: number;
  };

  export class DeleteOrderError extends ApiError {
    declare readonly payload: ErrorPayload<
      Declared<"error400", undefined> | Declared<"error404", undefined> | Declared<"errorDefault", undefined>
    >;

    static readonly errors: ErrorDecoders<DeleteOrderError> = [
      { on: 400, kind: "error400", decode: { kind: "empty" } },
      { on: 404, kind: "error404", decode: { kind: "empty" } },
      { on: "default", kind: "errorDefault", decode: { kind: "empty" } },
    ];
  }

  export class GetInventoryError extends ApiError {
    declare readonly payload: ErrorPayload<Declared<"errorDefault", undefined>>;

    static readonly errors: ErrorDecoders<GetInventoryError> = [
      { on: "default", kind: "errorDefault", decode: { kind: "empty" } },
    ];
  }

  export type GetOrderByIdRequest = {
    /** ID of order that needs to be fetched */
    orderId: number;
  };

  export class GetOrderByIdError extends ApiError {
    declare readonly payload: ErrorPayload<
      Declared<"error400", undefined> | Declared<"error404", undefined> | Declared<"errorDefault", undefined>
    >;

    static readonly errors: ErrorDecoders<GetOrderByIdError> = [
      { on: 400, kind: "error400", decode: { kind: "empty" } },
      { on: 404, kind: "error404", decode: { kind: "empty" } },
      { on: "default", kind: "errorDefault", decode: { kind: "empty" } },
    ];
  }

  export type PlaceOrderRequest = {
    id?: number;
    petId?: number;
    quantity?: number;
    shipDate?: Date;
    /** Order Status */
    status?: OrderStatus;
    complete?: boolean;
  };

  export class PlaceOrderError extends ApiError {
    declare readonly payload: ErrorPayload<
      Declared<"error400", undefined> | Declared<"error422", undefined> | Declared<"errorDefault", undefined>
    >;

    static readonly errors: ErrorDecoders<PlaceOrderError> = [
      { on: 400, kind: "error400", decode: { kind: "empty" } },
      { on: 422, kind: "error422", decode: { kind: "empty" } },
      { on: "default", kind: "errorDefault", decode: { kind: "empty" } },
    ];
  }
}
