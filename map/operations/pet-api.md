<!-- Generated file — do not edit; regenerated with the SDK. -->

# PetApi — operations

Accessor: `client.petApi` · Source: `src/resources/pet-api.ts` · 8 operations · Request and error types: namespace `PetApi`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `automated-package-publishing-sdk`; the `Source` path is where to **read** the shape, never what to import. `ResponseError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### addPet

- **Signature**: `addPet(request: PetApi.AddPetRequest, options?: RequestOptions): ApiPromise<Pet, PetApi.AddPetError>`
- **Wire**: `POST /pet`
- **Auth**: `petstoreAuth`
- **Request body**: `application/x-www-form-urlencoded;charset=UTF-8` — every field marked `form`
- **Returns**: `Pet`
- **Error**: `PetApi.AddPetError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error400"` [400] no body · `"error422"` [422] no body · `"errorDefault"` [400–599] no body · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `PetApi.AddPetRequest` (6):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `name` | `form` | `string` | yes |
| `photoUrls` | `form` | `string[]` | yes |
| `id` | `form` | `number` | no |
| `category` | `form` | `Category` | no |
| `tags` | `form` | `Tag[]` | no |
| `status` | `form` | `PetStatus` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `Category` | `categorySchema` | `src/models/category.ts` |
| `Tag` | `tagSchema` | `src/models/tag.ts` |
| `PetStatus` | `petStatusSchema` | `src/models/pet-status.ts` |
| `Pet` | `petSchema` | `src/models/pet.ts` |

### deletePet

- **Signature**: `deletePet(request: PetApi.DeletePetRequest, options?: RequestOptions): ApiPromise<undefined, PetApi.DeletePetError>`
- **Wire**: `DELETE /pet/{petId}`
- **Auth**: `petstoreAuth`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `undefined` — the operation resolves to nothing
- **Error**: `PetApi.DeletePetError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error400"` [400] no body · `"errorDefault"` [400–599] no body · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `PetApi.DeletePetRequest` (2):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `petId` | `path` | — | `number` | yes |
| `apiKey` | `header` | `api_key` | `string` | no |

### findPetsByStatus

- **Signature**: `findPetsByStatus(request: PetApi.FindPetsByStatusRequest, options?: RequestOptions): ApiPromise<Pet[], PetApi.FindPetsByStatusError>`
- **Wire**: `GET /pet/findByStatus`
- **Auth**: `petstoreAuth`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `Pet[]` — a bare `application/json` array; the success type *is* the array, not a wrapper model
- **Error**: `PetApi.FindPetsByStatusError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error400"` [400] no body · `"errorDefault"` [400–599] no body · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `PetApi.FindPetsByStatusRequest` (1):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `status` | `query` | `PetStatus` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `PetStatus` | `petStatusSchema` | `src/models/pet-status.ts` |
| `Pet` | `petSchema` | `src/models/pet.ts` |

### findPetsByTags

- **Signature**: `findPetsByTags(request: PetApi.FindPetsByTagsRequest, options?: RequestOptions): ApiPromise<Pet[], PetApi.FindPetsByTagsError>`
- **Wire**: `GET /pet/findByTags`
- **Auth**: `petstoreAuth`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `Pet[]` — a bare `application/json` array; the success type *is* the array, not a wrapper model
- **Error**: `PetApi.FindPetsByTagsError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error400"` [400] no body · `"errorDefault"` [400–599] no body · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `PetApi.FindPetsByTagsRequest` (1):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `tags` | `query` | `string[]` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `Pet` | `petSchema` | `src/models/pet.ts` |

### getPetById

- **Signature**: `getPetById(request: PetApi.GetPetByIdRequest, options?: RequestOptions): ApiPromise<Pet, PetApi.GetPetByIdError>`
- **Wire**: `GET /pet/{petId}`
- **Auth**: any of `apiKey`, `petstoreAuth` — the first one configured is sent
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `Pet`
- **Error**: `PetApi.GetPetByIdError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error400"` [400] no body · `"error404"` [404] no body · `"errorDefault"` [400–599] no body · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `PetApi.GetPetByIdRequest` (1):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `petId` | `path` | `number` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `Pet` | `petSchema` | `src/models/pet.ts` |

### updatePet

- **Signature**: `updatePet(request: PetApi.UpdatePetRequest, options?: RequestOptions): ApiPromise<Pet, PetApi.UpdatePetError>`
- **Wire**: `PUT /pet`
- **Auth**: `petstoreAuth`
- **Request body**: `application/x-www-form-urlencoded;charset=UTF-8` — every field marked `form`
- **Returns**: `Pet`
- **Error**: `PetApi.UpdatePetError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error400"` [400] no body · `"error404"` [404] no body · `"error422"` [422] no body · `"errorDefault"` [400–599] no body · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `PetApi.UpdatePetRequest` (6):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `name` | `form` | `string` | yes |
| `photoUrls` | `form` | `string[]` | yes |
| `id` | `form` | `number` | no |
| `category` | `form` | `Category` | no |
| `tags` | `form` | `Tag[]` | no |
| `status` | `form` | `PetStatus` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `Category` | `categorySchema` | `src/models/category.ts` |
| `Tag` | `tagSchema` | `src/models/tag.ts` |
| `PetStatus` | `petStatusSchema` | `src/models/pet-status.ts` |
| `Pet` | `petSchema` | `src/models/pet.ts` |

### updatePetWithForm

- **Signature**: `updatePetWithForm(request: PetApi.UpdatePetWithFormRequest, options?: RequestOptions): ApiPromise<Pet, PetApi.UpdatePetWithFormError>`
- **Wire**: `POST /pet/{petId}`
- **Auth**: `petstoreAuth`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `Pet`
- **Error**: `PetApi.UpdatePetWithFormError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error400"` [400] no body · `"errorDefault"` [400–599] no body · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `PetApi.UpdatePetWithFormRequest` (3):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `petId` | `path` | `number` | yes |
| `name` | `query` | `string` | no |
| `status` | `query` | `string` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `Pet` | `petSchema` | `src/models/pet.ts` |

### uploadFile

- **Signature**: `uploadFile(request: PetApi.UploadFileRequest, options?: RequestOptions): ApiPromise<ApiResponse, PetApi.UploadFileError>`
- **Wire**: `POST /pet/{petId}/uploadImage`
- **Auth**: `petstoreAuth`
- **Request body**: `application/octet-stream` — the `body` field, sent as raw bytes with no schema over them. That media type is what the SDK declares; a value carrying its own wins outright. **Optional**: omit it and the request carries no body and no `Content-Type` header at all
- **Returns**: `ApiResponse`
- **Error**: `PetApi.UploadFileError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error400"` [400] no body · `"error404"` [404] no body · `"errorDefault"` [400–599] no body · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `PetApi.UploadFileRequest` (3):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `petId` | `path` | `number` | yes |
| `additionalMetadata` | `query` | `string` | no |
| `body` | `body` | `FileInput` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `ApiResponse` | `apiResponseSchema` | `src/models/api-response.ts` |

