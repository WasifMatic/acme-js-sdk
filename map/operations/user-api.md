<!-- Generated file — do not edit; regenerated with the SDK. -->

# UserApi — operations

Accessor: `client.userApi` · Source: `src/resources/user-api.ts` · 7 operations · Request and error types: namespace `UserApi`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `swagger-petstore-open-api-3-0`; the `Source` path is where to **read** the shape, never what to import. `ApiError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### createUser

- **Signature**: `createUser(request: UserApi.CreateUserRequest, options?: RequestOptions): ApiPromise<User, UserApi.CreateUserError>`
- **Wire**: `POST /user`
- **Auth**: none — public; no credential is sent
- **Request body**: `application/x-www-form-urlencoded;charset=UTF-8` — every field marked `form`
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `User`
- **Error**: `SwaggerPetstoreOpenApi30Error` with `kind: "api"`, an instance of `UserApi.CreateUserError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"errorDefault"` [default — any status no arm above covers] no body · `"undeclared"` [a `default`-matched response that carried a body] `rawBody: ArrayBuffer`

**Fields** — `UserApi.CreateUserRequest` (8):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `form` | `number` | no |
| `username` | `form` | `string` | no |
| `firstName` | `form` | `string` | no |
| `lastName` | `form` | `string` | no |
| `email` | `form` | `string` | no |
| `password` | `form` | `string` | no |
| `phone` | `form` | `string` | no |
| `userStatus` | `form` | `number` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `User` | `userSchema` | `src/models/user.ts` |

### createUsersWithListInput

- **Signature**: `createUsersWithListInput(request: UserApi.CreateUsersWithListInputRequest, options?: RequestOptions): ApiPromise<User, UserApi.CreateUsersWithListInputError>`
- **Wire**: `POST /user/createWithList`
- **Auth**: none — public; no credential is sent
- **Request body**: `application/json` — the `body` field, a bare top-level JSON array. **Optional**: omit it and the request carries no body and no `Content-Type` header at all
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `User`
- **Error**: `SwaggerPetstoreOpenApi30Error` with `kind: "api"`, an instance of `UserApi.CreateUsersWithListInputError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"errorDefault"` [default — any status no arm above covers] no body · `"undeclared"` [a `default`-matched response that carried a body] `rawBody: ArrayBuffer`

**Fields** — `UserApi.CreateUsersWithListInputRequest` (1):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `body` | `body` | `User[]` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `User` | `userSchema` | `src/models/user.ts` |

### deleteUser

- **Signature**: `deleteUser(request: UserApi.DeleteUserRequest, options?: RequestOptions): ApiPromise<undefined, UserApi.DeleteUserError>`
- **Wire**: `DELETE /user/{usersname}`
- **Auth**: none — public; no credential is sent
- **Request body**: none — no `Content-Type` header is sent
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `undefined` — the operation resolves to nothing
- **Error**: `SwaggerPetstoreOpenApi30Error` with `kind: "api"`, an instance of `UserApi.DeleteUserError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error400"` [400] no body · `"error404"` [404] no body · `"errorDefault"` [default — any status no arm above covers] no body · `"undeclared"` [a `default`-matched response that carried a body] `rawBody: ArrayBuffer`

**Fields** — `UserApi.DeleteUserRequest` (1):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `usersname` | `path` | `string` | yes |

### getUserByName

- **Signature**: `getUserByName(request: UserApi.GetUserByNameRequest, options?: RequestOptions): ApiPromise<User, UserApi.GetUserByNameError>`
- **Wire**: `GET /user/{usersname}`
- **Auth**: none — public; no credential is sent
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `User`
- **Error**: `SwaggerPetstoreOpenApi30Error` with `kind: "api"`, an instance of `UserApi.GetUserByNameError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error400"` [400] no body · `"error404"` [404] no body · `"errorDefault"` [default — any status no arm above covers] no body · `"undeclared"` [a `default`-matched response that carried a body] `rawBody: ArrayBuffer`

**Fields** — `UserApi.GetUserByNameRequest` (1):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `usersname` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `User` | `userSchema` | `src/models/user.ts` |

### loginUser

- **Signature**: `loginUser(request: UserApi.LoginUserRequest, options?: RequestOptions): ApiPromise<undefined, UserApi.LoginUserError>`
- **Wire**: `GET /user/login`
- **Auth**: none — public; no credential is sent
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `undefined` — the operation resolves to nothing
- **Error**: `SwaggerPetstoreOpenApi30Error` with `kind: "api"`, an instance of `UserApi.LoginUserError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error400"` [400] no body · `"errorDefault"` [default — any status no arm above covers] no body · `"undeclared"` [a `default`-matched response that carried a body] `rawBody: ArrayBuffer`

**Fields** — `UserApi.LoginUserRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `username` | `query` | `string` | no |
| `password` | `query` | `string` | no |

### logoutUser

- **Signature**: `logoutUser(options?: RequestOptions): ApiPromise<undefined, UserApi.LogoutUserError>`
- **Wire**: `GET /user/logout`
- **Auth**: none — public; no credential is sent
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `undefined` — the operation resolves to nothing
- **Error**: `SwaggerPetstoreOpenApi30Error` with `kind: "api"`, an instance of `UserApi.LogoutUserError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"errorDefault"` [default — any status no arm above covers] no body · `"undeclared"` [a `default`-matched response that carried a body] `rawBody: ArrayBuffer`

### updateUser

- **Signature**: `updateUser(request: UserApi.UpdateUserRequest, options?: RequestOptions): ApiPromise<undefined, UserApi.UpdateUserError>`
- **Wire**: `PUT /user/{usersname}`
- **Auth**: none — public; no credential is sent
- **Request body**: `application/x-www-form-urlencoded;charset=UTF-8` — every field marked `form`
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `undefined` — the operation resolves to nothing
- **Error**: `SwaggerPetstoreOpenApi30Error` with `kind: "api"`, an instance of `UserApi.UpdateUserError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error400"` [400] no body · `"error404"` [404] no body · `"errorDefault"` [default — any status no arm above covers] no body · `"undeclared"` [a `default`-matched response that carried a body] `rawBody: ArrayBuffer`

**Fields** — `UserApi.UpdateUserRequest` (9):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `usersname` | `path` | `string` | yes |
| `id` | `form` | `number` | no |
| `username` | `form` | `string` | no |
| `firstName` | `form` | `string` | no |
| `lastName` | `form` | `string` | no |
| `email` | `form` | `string` | no |
| `password` | `form` | `string` | no |
| `phone` | `form` | `string` | no |
| `userStatus` | `form` | `number` | no |

