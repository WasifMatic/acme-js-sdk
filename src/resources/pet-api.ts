import type { AuthSchemes } from "../auth-schemes.js";
import { ApiError, type Declared, type ErrorDecoders, type ErrorPayload } from "../core/api-error.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import { anyAuth } from "../core/auth/schemes.js";
import type { FileInput } from "../core/binary.js";
import type { RawClient } from "../core/raw-client.js";
import { uuid } from "../core/uuid.js";
import * as s from "../core/validation/index.js";
import { apiResponseSchema, type ApiResponse } from "../models/api-response.js";
import { categorySchema, type Category } from "../models/category.js";
import { petStatusSchema, type PetStatus } from "../models/pet-status.js";
import { petSchema, type Pet } from "../models/pet.js";
import { tagSchema, type Tag } from "../models/tag.js";
import type { Servers } from "../servers.js";

/**
 * Everything about your Pets
 */
export class PetApi {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  /**
   * Add a new pet to the store.
   *
   * @remarks
   * Add a new pet to the store.
   *
   * @returns Successful operation
   *
   * @throws {@link PetApi.AddPetError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link SwaggerPetstoreOpenApi30Error} when no usable response was produced: a
   * connection failure, a timeout, a body that would not decode, a value that would not encode, or
   * a credential that could not be obtained
   */
  addPet(request: PetApi.AddPetRequest, options?: RequestOptions): ApiPromise<Pet, PetApi.AddPetError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/pet"),
        auth: this.#auth.petstoreAuth,
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: {
          kind: "formUrlEncoded",
          value: [
            { name: "name", value: request.name, schema: s.string() },
            { name: "photoUrls", value: request.photoUrls, schema: s.array(s.string()) },
            { name: "id", value: request.id, schema: s.optional(s.number()) },
            { name: "category", value: request.category, schema: s.optional(s.lazy(() => categorySchema)) },
            { name: "tags", value: request.tags, schema: s.optional(s.array(s.lazy(() => tagSchema))) },
            { name: "status", value: request.status, schema: s.optional(s.lazy(() => petStatusSchema)) },
          ],
        },
      },
      {
        success: { kind: "json", schema: petSchema },
        errorFactory: PetApi.AddPetError,
      },
      options,
    );
  }

  /**
   * Deletes a pet.
   *
   * @remarks
   * Delete a pet.
   *
   * @returns Pet deleted
   *
   * @throws {@link PetApi.DeletePetError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link SwaggerPetstoreOpenApi30Error} when no usable response was produced: a
   * connection failure, a timeout, a body that would not decode, a value that would not encode, or
   * a credential that could not be obtained
   */
  deletePet(
    request: PetApi.DeletePetRequest,
    options?: RequestOptions,
  ): ApiPromise<undefined, PetApi.DeletePetError> {
    return this.#rawClient.execute(
      {
        method: "DELETE",
        url: this.#servers.default("/pet/{petId}"),
        auth: this.#auth.petstoreAuth,
        pathParams: [{ name: "petId", value: request.petId, schema: s.number() }],
        headers: [
          { name: "api_key", value: request.apiKey, schema: s.optional(s.string()) },
          { name: "Idempotency-Key", value: uuid(), schema: s.string() },
        ],
        body: { kind: "empty" },
      },
      {
        success: { kind: "empty" },
        errorFactory: PetApi.DeletePetError,
      },
      options,
    );
  }

  /**
   * Finds Pets by status.
   *
   * @remarks
   * Multiple status values can be provided with comma separated strings.
   *
   * @returns successful operation
   *
   * @throws {@link PetApi.FindPetsByStatusError} when the API answers with an error status — narrow
   * on `err.payload.kind`
   *
   * @throws {@link SwaggerPetstoreOpenApi30Error} when no usable response was produced: a
   * connection failure, a timeout, a body that would not decode, a value that would not encode, or
   * a credential that could not be obtained
   */
  findPetsByStatus(
    request: PetApi.FindPetsByStatusRequest,
    options?: RequestOptions,
  ): ApiPromise<Pet[], PetApi.FindPetsByStatusError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        url: this.#servers.default("/pet/findByStatus"),
        auth: this.#auth.petstoreAuth,
        query: [{ name: "status", value: request.status, schema: s.optional(s.lazy(() => petStatusSchema)) }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: s.array(s.lazy(() => petSchema)) },
        errorFactory: PetApi.FindPetsByStatusError,
      },
      options,
    );
  }

  /**
   * Finds Pets by tags.
   *
   * @remarks
   * Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
   *
   * @returns successful operation
   *
   * @throws {@link PetApi.FindPetsByTagsError} when the API answers with an error status — narrow
   * on `err.payload.kind`
   *
   * @throws {@link SwaggerPetstoreOpenApi30Error} when no usable response was produced: a
   * connection failure, a timeout, a body that would not decode, a value that would not encode, or
   * a credential that could not be obtained
   */
  findPetsByTags(
    request: PetApi.FindPetsByTagsRequest,
    options?: RequestOptions,
  ): ApiPromise<Pet[], PetApi.FindPetsByTagsError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        url: this.#servers.default("/pet/findByTags"),
        auth: this.#auth.petstoreAuth,
        query: [{ name: "tags", value: request.tags, schema: s.optional(s.array(s.string())) }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: s.array(s.lazy(() => petSchema)) },
        errorFactory: PetApi.FindPetsByTagsError,
      },
      options,
    );
  }

  /**
   * Find pet by ID.
   *
   * @remarks
   * Returns a single pet.
   *
   * @returns successful operation
   *
   * @throws {@link PetApi.GetPetByIdError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link SwaggerPetstoreOpenApi30Error} when no usable response was produced: a
   * connection failure, a timeout, a body that would not decode, a value that would not encode, or
   * a credential that could not be obtained
   */
  getPetById(
    request: PetApi.GetPetByIdRequest,
    options?: RequestOptions,
  ): ApiPromise<Pet, PetApi.GetPetByIdError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        url: this.#servers.default("/pet/{petId}"),
        auth: anyAuth(this.#auth.apiKey, this.#auth.petstoreAuth),
        pathParams: [{ name: "petId", value: request.petId, schema: s.number() }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: petSchema },
        errorFactory: PetApi.GetPetByIdError,
      },
      options,
    );
  }

  /**
   * Update an existing pet.
   *
   * @remarks
   * Update an existing pet by Id.
   *
   * @returns Successful operation
   *
   * @throws {@link PetApi.UpdatePetError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link SwaggerPetstoreOpenApi30Error} when no usable response was produced: a
   * connection failure, a timeout, a body that would not decode, a value that would not encode, or
   * a credential that could not be obtained
   */
  updatePet(
    request: PetApi.UpdatePetRequest,
    options?: RequestOptions,
  ): ApiPromise<Pet, PetApi.UpdatePetError> {
    return this.#rawClient.execute(
      {
        method: "PUT",
        url: this.#servers.default("/pet"),
        auth: this.#auth.petstoreAuth,
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: {
          kind: "formUrlEncoded",
          value: [
            { name: "name", value: request.name, schema: s.string() },
            { name: "photoUrls", value: request.photoUrls, schema: s.array(s.string()) },
            { name: "id", value: request.id, schema: s.optional(s.number()) },
            { name: "category", value: request.category, schema: s.optional(s.lazy(() => categorySchema)) },
            { name: "tags", value: request.tags, schema: s.optional(s.array(s.lazy(() => tagSchema))) },
            { name: "status", value: request.status, schema: s.optional(s.lazy(() => petStatusSchema)) },
          ],
        },
      },
      {
        success: { kind: "json", schema: petSchema },
        errorFactory: PetApi.UpdatePetError,
      },
      options,
    );
  }

  /**
   * Updates a pet in the store with form data.
   *
   * @remarks
   * Updates a pet resource based on the form data.
   *
   * @returns successful operation
   *
   * @throws {@link PetApi.UpdatePetWithFormError} when the API answers with an error status —
   * narrow on `err.payload.kind`
   *
   * @throws {@link SwaggerPetstoreOpenApi30Error} when no usable response was produced: a
   * connection failure, a timeout, a body that would not decode, a value that would not encode, or
   * a credential that could not be obtained
   */
  updatePetWithForm(
    request: PetApi.UpdatePetWithFormRequest,
    options?: RequestOptions,
  ): ApiPromise<Pet, PetApi.UpdatePetWithFormError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/pet/{petId}"),
        auth: this.#auth.petstoreAuth,
        pathParams: [{ name: "petId", value: request.petId, schema: s.number() }],
        query: [
          { name: "name", value: request.name, schema: s.optional(s.string()) },
          { name: "status", value: request.status, schema: s.optional(s.string()) },
        ],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: petSchema },
        errorFactory: PetApi.UpdatePetWithFormError,
      },
      options,
    );
  }

  /**
   * Uploads an image.
   *
   * @remarks
   * Upload image of the pet.
   *
   * @returns successful operation
   *
   * @throws {@link PetApi.UploadFileError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link SwaggerPetstoreOpenApi30Error} when no usable response was produced: a
   * connection failure, a timeout, a body that would not decode, a value that would not encode, or
   * a credential that could not be obtained
   */
  uploadFile(
    request: PetApi.UploadFileRequest,
    options?: RequestOptions,
  ): ApiPromise<ApiResponse, PetApi.UploadFileError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/pet/{petId}/uploadImage"),
        auth: this.#auth.petstoreAuth,
        pathParams: [{ name: "petId", value: request.petId, schema: s.number() }],
        query: [
          { name: "additionalMetadata", value: request.additionalMetadata, schema: s.optional(s.string()) },
        ],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: { kind: "binary", value: request.body, contentType: "application/octet-stream" },
      },
      {
        success: { kind: "json", schema: apiResponseSchema },
        errorFactory: PetApi.UploadFileError,
      },
      options,
    );
  }
}

export namespace PetApi {
  export type AddPetRequest = {
    name: string;
    photoUrls: string[];
    id?: number;
    category?: Category;
    tags?: Tag[];
    /** pet status in the store */
    status?: PetStatus;
  };

  export class AddPetError extends ApiError {
    declare readonly payload: ErrorPayload<
      Declared<"error400", undefined> | Declared<"error422", undefined> | Declared<"errorDefault", undefined>
    >;

    static readonly errors: ErrorDecoders<AddPetError> = [
      { on: 400, kind: "error400", decode: { kind: "empty" } },
      { on: 422, kind: "error422", decode: { kind: "empty" } },
      { on: "default", kind: "errorDefault", decode: { kind: "empty" } },
    ];
  }

  export type DeletePetRequest = {
    /** Pet id to delete */
    petId: number;
    apiKey?: string;
  };

  export class DeletePetError extends ApiError {
    declare readonly payload: ErrorPayload<
      Declared<"error400", undefined> | Declared<"errorDefault", undefined>
    >;

    static readonly errors: ErrorDecoders<DeletePetError> = [
      { on: 400, kind: "error400", decode: { kind: "empty" } },
      { on: "default", kind: "errorDefault", decode: { kind: "empty" } },
    ];
  }

  export type FindPetsByStatusRequest = {
    /** Status values that need to be considered for filter */
    status?: PetStatus;
  };

  export class FindPetsByStatusError extends ApiError {
    declare readonly payload: ErrorPayload<
      Declared<"error400", undefined> | Declared<"errorDefault", undefined>
    >;

    static readonly errors: ErrorDecoders<FindPetsByStatusError> = [
      { on: 400, kind: "error400", decode: { kind: "empty" } },
      { on: "default", kind: "errorDefault", decode: { kind: "empty" } },
    ];
  }

  export type FindPetsByTagsRequest = {
    /** Tags to filter by */
    tags?: string[];
  };

  export class FindPetsByTagsError extends ApiError {
    declare readonly payload: ErrorPayload<
      Declared<"error400", undefined> | Declared<"errorDefault", undefined>
    >;

    static readonly errors: ErrorDecoders<FindPetsByTagsError> = [
      { on: 400, kind: "error400", decode: { kind: "empty" } },
      { on: "default", kind: "errorDefault", decode: { kind: "empty" } },
    ];
  }

  export type GetPetByIdRequest = {
    /** ID of pet to return */
    petId: number;
  };

  export class GetPetByIdError extends ApiError {
    declare readonly payload: ErrorPayload<
      Declared<"error400", undefined> | Declared<"error404", undefined> | Declared<"errorDefault", undefined>
    >;

    static readonly errors: ErrorDecoders<GetPetByIdError> = [
      { on: 400, kind: "error400", decode: { kind: "empty" } },
      { on: 404, kind: "error404", decode: { kind: "empty" } },
      { on: "default", kind: "errorDefault", decode: { kind: "empty" } },
    ];
  }

  export type UpdatePetRequest = {
    name: string;
    photoUrls: string[];
    id?: number;
    category?: Category;
    tags?: Tag[];
    /** pet status in the store */
    status?: PetStatus;
  };

  export class UpdatePetError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"error400", undefined>
      | Declared<"error404", undefined>
      | Declared<"error422", undefined>
      | Declared<"errorDefault", undefined>
    >;

    static readonly errors: ErrorDecoders<UpdatePetError> = [
      { on: 400, kind: "error400", decode: { kind: "empty" } },
      { on: 404, kind: "error404", decode: { kind: "empty" } },
      { on: 422, kind: "error422", decode: { kind: "empty" } },
      { on: "default", kind: "errorDefault", decode: { kind: "empty" } },
    ];
  }

  export type UpdatePetWithFormRequest = {
    /** ID of pet that needs to be updated */
    petId: number;
    /** Name of pet that needs to be updated */
    name?: string;
    /** Status of pet that needs to be updated */
    status?: string;
  };

  export class UpdatePetWithFormError extends ApiError {
    declare readonly payload: ErrorPayload<
      Declared<"error400", undefined> | Declared<"errorDefault", undefined>
    >;

    static readonly errors: ErrorDecoders<UpdatePetWithFormError> = [
      { on: 400, kind: "error400", decode: { kind: "empty" } },
      { on: "default", kind: "errorDefault", decode: { kind: "empty" } },
    ];
  }

  export type UploadFileRequest = {
    /** ID of pet to update */
    petId: number;
    /** Additional Metadata */
    additionalMetadata?: string;
    body?: FileInput;
  };

  export class UploadFileError extends ApiError {
    declare readonly payload: ErrorPayload<
      Declared<"error400", undefined> | Declared<"error404", undefined> | Declared<"errorDefault", undefined>
    >;

    static readonly errors: ErrorDecoders<UploadFileError> = [
      { on: 400, kind: "error400", decode: { kind: "empty" } },
      { on: 404, kind: "error404", decode: { kind: "empty" } },
      { on: "default", kind: "errorDefault", decode: { kind: "empty" } },
    ];
  }
}
