import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import { noneAuth } from "../core/auth/schemes.js";
import type { RawClient } from "../core/raw-client.js";
import { ResponseError, type Declared, type ErrorDecoders } from "../core/response-error.js";
import * as s from "../core/validation/index.js";
import { userSchema, type User } from "../models/user.js";
import type { Servers } from "../servers.js";

/**
 * Operations about user
 */
export class UserApi {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;

  constructor(rawClient: RawClient, servers: Servers) {
    this.#rawClient = rawClient;
    this.#servers = servers;
  }

  /**
   * Create user.
   *
   * @remarks
   * This can only be done by the logged in user.
   *
   * @returns successful operation
   *
   * @throws {@link UserApi.CreateUserError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link SwaggerPetstoreOpenApi30Error} when no usable response was produced: a
   * connection failure, a timeout, an abort, a schema violation, or a credential that could not be
   * obtained
   */
  createUser(
    request: UserApi.CreateUserRequest,
    options?: RequestOptions,
  ): ApiPromise<User, UserApi.CreateUserError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/user"),
        auth: noneAuth,
        body: {
          kind: "formUrlEncoded",
          value: [
            { name: "id", value: request.id, schema: s.optional(s.number()) },
            { name: "username", value: request.username, schema: s.optional(s.string()) },
            { name: "firstName", value: request.firstName, schema: s.optional(s.string()) },
            { name: "lastName", value: request.lastName, schema: s.optional(s.string()) },
            { name: "email", value: request.email, schema: s.optional(s.string()) },
            { name: "password", value: request.password, schema: s.optional(s.string()) },
            { name: "phone", value: request.phone, schema: s.optional(s.string()) },
            { name: "userStatus", value: request.userStatus, schema: s.optional(s.number()) },
          ],
        },
      },
      {
        success: { kind: "json", schema: userSchema },
        errorFactory: UserApi.CreateUserError,
      },
      options,
    );
  }

  /**
   * Creates list of users with given input array.
   *
   * @remarks
   * Creates list of users with given input array.
   *
   * @returns Successful operation
   *
   * @throws {@link UserApi.CreateUsersWithListInputError} when the API answers with an error status
   * — narrow on `err.payload.kind`
   *
   * @throws {@link SwaggerPetstoreOpenApi30Error} when no usable response was produced: a
   * connection failure, a timeout, an abort, a schema violation, or a credential that could not be
   * obtained
   */
  createUsersWithListInput(
    request: UserApi.CreateUsersWithListInputRequest,
    options?: RequestOptions,
  ): ApiPromise<User, UserApi.CreateUsersWithListInputError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/user/createWithList"),
        auth: noneAuth,
        body: { kind: "json", value: request.body, schema: s.optional(s.array(s.lazy(() => userSchema))) },
      },
      {
        success: { kind: "json", schema: userSchema },
        errorFactory: UserApi.CreateUsersWithListInputError,
      },
      options,
    );
  }

  /**
   * Delete user resource.
   *
   * @remarks
   * This can only be done by the logged in user.
   *
   * @returns User deleted
   *
   * @throws {@link UserApi.DeleteUserError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link SwaggerPetstoreOpenApi30Error} when no usable response was produced: a
   * connection failure, a timeout, an abort, a schema violation, or a credential that could not be
   * obtained
   */
  deleteUser(
    request: UserApi.DeleteUserRequest,
    options?: RequestOptions,
  ): ApiPromise<undefined, UserApi.DeleteUserError> {
    return this.#rawClient.execute(
      {
        method: "DELETE",
        url: this.#servers.default("/user/{usersname}"),
        auth: noneAuth,
        pathParams: [{ name: "usersname", value: request.usersname, schema: s.string() }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "empty" },
        errorFactory: UserApi.DeleteUserError,
      },
      options,
    );
  }

  /**
   * Get user by user name.
   *
   * @remarks
   * Get user detail based on username.
   *
   * @returns successful operation
   *
   * @throws {@link UserApi.GetUserByNameError} when the API answers with an error status — narrow
   * on `err.payload.kind`
   *
   * @throws {@link SwaggerPetstoreOpenApi30Error} when no usable response was produced: a
   * connection failure, a timeout, an abort, a schema violation, or a credential that could not be
   * obtained
   */
  getUserByName(
    request: UserApi.GetUserByNameRequest,
    options?: RequestOptions,
  ): ApiPromise<User, UserApi.GetUserByNameError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        url: this.#servers.default("/user/{usersname}"),
        auth: noneAuth,
        pathParams: [{ name: "usersname", value: request.usersname, schema: s.string() }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: userSchema },
        errorFactory: UserApi.GetUserByNameError,
      },
      options,
    );
  }

  /**
   * Logs user into the system.
   *
   * @remarks
   * Log into the system.
   *
   * @returns successful operation
   *
   * @throws {@link UserApi.LoginUserError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link SwaggerPetstoreOpenApi30Error} when no usable response was produced: a
   * connection failure, a timeout, an abort, a schema violation, or a credential that could not be
   * obtained
   */
  loginUser(
    request: UserApi.LoginUserRequest,
    options?: RequestOptions,
  ): ApiPromise<undefined, UserApi.LoginUserError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        url: this.#servers.default("/user/login"),
        auth: noneAuth,
        query: [
          { name: "username", value: request.username, schema: s.optional(s.string()) },
          { name: "password", value: request.password, schema: s.optional(s.string()) },
        ],
        body: { kind: "empty" },
      },
      {
        success: { kind: "empty" },
        errorFactory: UserApi.LoginUserError,
      },
      options,
    );
  }

  /**
   * Logs out current logged in user session.
   *
   * @remarks
   * Log user out of the system.
   *
   * @returns successful operation
   *
   * @throws {@link UserApi.LogoutUserError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link SwaggerPetstoreOpenApi30Error} when no usable response was produced: a
   * connection failure, a timeout, an abort, a schema violation, or a credential that could not be
   * obtained
   */
  logoutUser(options?: RequestOptions): ApiPromise<undefined, UserApi.LogoutUserError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        url: this.#servers.default("/user/logout"),
        auth: noneAuth,
        body: { kind: "empty" },
      },
      {
        success: { kind: "empty" },
        errorFactory: UserApi.LogoutUserError,
      },
      options,
    );
  }

  /**
   * Update user resource.
   *
   * @remarks
   * This can only be done by the logged in user.
   *
   * @returns successful operation
   *
   * @throws {@link UserApi.UpdateUserError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link SwaggerPetstoreOpenApi30Error} when no usable response was produced: a
   * connection failure, a timeout, an abort, a schema violation, or a credential that could not be
   * obtained
   */
  updateUser(
    request: UserApi.UpdateUserRequest,
    options?: RequestOptions,
  ): ApiPromise<undefined, UserApi.UpdateUserError> {
    return this.#rawClient.execute(
      {
        method: "PUT",
        url: this.#servers.default("/user/{usersname}"),
        auth: noneAuth,
        pathParams: [{ name: "usersname", value: request.usersname, schema: s.string() }],
        body: {
          kind: "formUrlEncoded",
          value: [
            { name: "id", value: request.id, schema: s.optional(s.number()) },
            { name: "username", value: request.username, schema: s.optional(s.string()) },
            { name: "firstName", value: request.firstName, schema: s.optional(s.string()) },
            { name: "lastName", value: request.lastName, schema: s.optional(s.string()) },
            { name: "email", value: request.email, schema: s.optional(s.string()) },
            { name: "password", value: request.password, schema: s.optional(s.string()) },
            { name: "phone", value: request.phone, schema: s.optional(s.string()) },
            { name: "userStatus", value: request.userStatus, schema: s.optional(s.number()) },
          ],
        },
      },
      {
        success: { kind: "empty" },
        errorFactory: UserApi.UpdateUserError,
      },
      options,
    );
  }
}

export namespace UserApi {
  export type CreateUserRequest = {
    id?: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    /** User Status */
    userStatus?: number;
  };

  export class CreateUserError extends ResponseError<Declared<"errorDefault", undefined>> {
    static readonly errors: ErrorDecoders<CreateUserError> = [
      { on: [400, 599], kind: "errorDefault", decode: { kind: "empty" } },
    ];
  }

  export type CreateUsersWithListInputRequest = {
    body?: User[];
  };

  export class CreateUsersWithListInputError extends ResponseError<Declared<"errorDefault", undefined>> {
    static readonly errors: ErrorDecoders<CreateUsersWithListInputError> = [
      { on: [400, 599], kind: "errorDefault", decode: { kind: "empty" } },
    ];
  }

  export type DeleteUserRequest = {
    /** The username that needs to be processed */
    usersname: string;
  };

  export class DeleteUserError extends ResponseError<
    Declared<"error400", undefined> | Declared<"error404", undefined> | Declared<"errorDefault", undefined>
  > {
    static readonly errors: ErrorDecoders<DeleteUserError> = [
      { on: 400, kind: "error400", decode: { kind: "empty" } },
      { on: 404, kind: "error404", decode: { kind: "empty" } },
      { on: [400, 599], kind: "errorDefault", decode: { kind: "empty" } },
    ];
  }

  export type GetUserByNameRequest = {
    /** The username that needs to be processed */
    usersname: string;
  };

  export class GetUserByNameError extends ResponseError<
    Declared<"error400", undefined> | Declared<"error404", undefined> | Declared<"errorDefault", undefined>
  > {
    static readonly errors: ErrorDecoders<GetUserByNameError> = [
      { on: 400, kind: "error400", decode: { kind: "empty" } },
      { on: 404, kind: "error404", decode: { kind: "empty" } },
      { on: [400, 599], kind: "errorDefault", decode: { kind: "empty" } },
    ];
  }

  export type LoginUserRequest = {
    /** The user name for login */
    username?: string;
    /** The password for login in clear text */
    password?: string;
  };

  export class LoginUserError extends ResponseError<
    Declared<"error400", undefined> | Declared<"errorDefault", undefined>
  > {
    static readonly errors: ErrorDecoders<LoginUserError> = [
      { on: 400, kind: "error400", decode: { kind: "empty" } },
      { on: [400, 599], kind: "errorDefault", decode: { kind: "empty" } },
    ];
  }

  export class LogoutUserError extends ResponseError<Declared<"errorDefault", undefined>> {
    static readonly errors: ErrorDecoders<LogoutUserError> = [
      { on: [400, 599], kind: "errorDefault", decode: { kind: "empty" } },
    ];
  }

  export type UpdateUserRequest = {
    /** The username that needs to be processed */
    usersname: string;
    id?: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    /** User Status */
    userStatus?: number;
  };

  export class UpdateUserError extends ResponseError<
    Declared<"error400", undefined> | Declared<"error404", undefined> | Declared<"errorDefault", undefined>
  > {
    static readonly errors: ErrorDecoders<UpdateUserError> = [
      { on: 400, kind: "error400", decode: { kind: "empty" } },
      { on: 404, kind: "error404", decode: { kind: "empty" } },
      { on: [400, 599], kind: "errorDefault", decode: { kind: "empty" } },
    ];
  }
}
