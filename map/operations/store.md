<!-- Generated file — do not edit; regenerated with the SDK. -->

# Store — operations

Accessor: `client.store` · Source: `src/resources/store.ts` · 4 operations · Request and error types: namespace `Store`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `automated-package-publishing-sdk`; the `Source` path is where to **read** the shape, never what to import. `ResponseError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### deleteOrder

- **Signature**: `deleteOrder(request: Store.DeleteOrderRequest, options?: RequestOptions): ApiPromise<undefined, Store.DeleteOrderError>`
- **Wire**: `DELETE /store/order/{orderId}`
- **Auth**: none — public; no credential is sent
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `undefined` — the operation resolves to nothing
- **Error**: `Store.DeleteOrderError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error400"` [400] no body · `"error404"` [404] no body · `"errorDefault"` [400–599] no body · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Store.DeleteOrderRequest` (1):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `orderId` | `path` | `number` | yes |

### getInventory

- **Signature**: `getInventory(options?: RequestOptions): ApiPromise<Record<string, number>, Store.GetInventoryError>`
- **Wire**: `GET /store/inventory`
- **Auth**: `apiKey`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `Record<string, number>` — a bare `application/json` map; the success type *is* the map
- **Error**: `Store.GetInventoryError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"errorDefault"` [400–599] no body · `"undeclared"` [any other] `rawBody: ArrayBuffer`

### getOrderById

- **Signature**: `getOrderById(request: Store.GetOrderByIdRequest, options?: RequestOptions): ApiPromise<Order, Store.GetOrderByIdError>`
- **Wire**: `GET /store/order/{orderId}`
- **Auth**: none — public; no credential is sent
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `Order`
- **Error**: `Store.GetOrderByIdError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error400"` [400] no body · `"error404"` [404] no body · `"errorDefault"` [400–599] no body · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Store.GetOrderByIdRequest` (1):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `orderId` | `path` | `number` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `Order` | `orderSchema` | `src/models/order.ts` |

### placeOrder

- **Signature**: `placeOrder(request: Store.PlaceOrderRequest, options?: RequestOptions): ApiPromise<Order, Store.PlaceOrderError>`
- **Wire**: `POST /store/order`
- **Auth**: none — public; no credential is sent
- **Request body**: `application/x-www-form-urlencoded;charset=UTF-8` — every field marked `form`
- **Returns**: `Order`
- **Error**: `Store.PlaceOrderError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error400"` [400] no body · `"error422"` [422] no body · `"errorDefault"` [400–599] no body · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Store.PlaceOrderRequest` (6):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `form` | `number` | no |
| `petId` | `form` | `number` | no |
| `quantity` | `form` | `number` | no |
| `shipDate` | `form` | `Date` (date-time) | no |
| `status` | `form` | `OrderStatus` | no |
| `complete` | `form` | `boolean` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `OrderStatus` | `orderStatusSchema` | `src/models/order-status.ts` |
| `Order` | `orderSchema` | `src/models/order.ts` |

