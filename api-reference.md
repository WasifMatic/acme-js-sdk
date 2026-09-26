# Reference

> Source: [SwaggerPetstoreOpenApi30Client](src/client.ts)

## PetApi

> Source: [PetApi](src/resources/pet-api.ts)

<details>
<summary><code>addPet(request: PetApi.AddPetRequest, options?: RequestOptions): ApiPromise&lt;Pet, PetApi.AddPetError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Add a new pet to the store.

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.petApi.addPet({ name: "doggie", photoUrls: ["some example string"], id: 10 });
  // TODO: Handle 'response' of type Pet
} catch (err) {
  // TODO: Handle 'err' of type PetApi.AddPetError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.petApi.addPet({
  name: "doggie",
  photoUrls: ["some example string"],
  id: 10,
}).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Pet
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>name</code> | <code>string</code> | - |
| <code>photoUrls</code> | <code>string[]</code> | - |
| <code>id?</code> | <code>number</code> | - |
| <code>category?</code> | <code>[Category](src/models/category.ts)</code> | - |
| <code>tags?</code> | <code>[Tag](src/models/tag.ts)[]</code> | - |
| <code>status?</code> | <code>[PetStatus](src/models/pet-status.ts)</code> | pet status in the store |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.petApi.addPet(request)`

- **OnSuccess**: <code>[Pet](src/models/pet.ts)</code>
- **OnError**: throws <code>[PetApi.AddPetError](src/resources/pet-api.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.petApi.addPet(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Pet, PetApi.AddPetError&gt;</code>, with `result.value` of type <code>[Pet](src/models/pet.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[SwaggerPetstoreOpenApi30Error](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>deletePet(request: PetApi.DeletePetRequest, options?: RequestOptions): ApiPromise&lt;undefined, PetApi.DeletePetError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Delete a pet.

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  await client.petApi.deletePet({ petId: 10 });
} catch (err) {
  // TODO: Handle 'err' of type PetApi.DeletePetError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.petApi.deletePet({ petId: 10 }).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: The call succeeded and resolves to no body
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>petId</code> | <code>number</code> | Pet id to delete |
| <code>apiKey?</code> | <code>string</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.petApi.deletePet(request)`

- **OnSuccess**: <code>undefined</code>
- **OnError**: throws <code>[PetApi.DeletePetError](src/resources/pet-api.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.petApi.deletePet(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;undefined, PetApi.DeletePetError&gt;</code>, with `result.value` of type <code>undefined</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[SwaggerPetstoreOpenApi30Error](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>findPetsByStatus(request: PetApi.FindPetsByStatusRequest, options?: RequestOptions): ApiPromise&lt;Pet[], PetApi.FindPetsByStatusError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Multiple status values can be provided with comma separated strings.

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.petApi.findPetsByStatus();
  // TODO: Handle 'response' of type Pet[]
} catch (err) {
  // TODO: Handle 'err' of type PetApi.FindPetsByStatusError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.petApi.findPetsByStatus().asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Pet[]
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>status?</code> | <code>[PetStatus](src/models/pet-status.ts)</code> | Status values that need to be considered for filter |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.petApi.findPetsByStatus(request)`

- **OnSuccess**: <code>[Pet](src/models/pet.ts)[]</code>
- **OnError**: throws <code>[PetApi.FindPetsByStatusError](src/resources/pet-api.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.petApi.findPetsByStatus(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Pet[], PetApi.FindPetsByStatusError&gt;</code>, with `result.value` of type <code>[Pet](src/models/pet.ts)[]</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[SwaggerPetstoreOpenApi30Error](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>findPetsByTags(request: PetApi.FindPetsByTagsRequest, options?: RequestOptions): ApiPromise&lt;Pet[], PetApi.FindPetsByTagsError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.petApi.findPetsByTags();
  // TODO: Handle 'response' of type Pet[]
} catch (err) {
  // TODO: Handle 'err' of type PetApi.FindPetsByTagsError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.petApi.findPetsByTags().asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Pet[]
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>tags?</code> | <code>string[]</code> | Tags to filter by |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.petApi.findPetsByTags(request)`

- **OnSuccess**: <code>[Pet](src/models/pet.ts)[]</code>
- **OnError**: throws <code>[PetApi.FindPetsByTagsError](src/resources/pet-api.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.petApi.findPetsByTags(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Pet[], PetApi.FindPetsByTagsError&gt;</code>, with `result.value` of type <code>[Pet](src/models/pet.ts)[]</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[SwaggerPetstoreOpenApi30Error](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getPetById(request: PetApi.GetPetByIdRequest, options?: RequestOptions): ApiPromise&lt;Pet, PetApi.GetPetByIdError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Returns a single pet.

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.petApi.getPetById({ petId: 10 });
  // TODO: Handle 'response' of type Pet
} catch (err) {
  // TODO: Handle 'err' of type PetApi.GetPetByIdError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.petApi.getPetById({ petId: 10 }).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Pet
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>petId</code> | <code>number</code> | ID of pet to return |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.petApi.getPetById(request)`

- **OnSuccess**: <code>[Pet](src/models/pet.ts)</code>
- **OnError**: throws <code>[PetApi.GetPetByIdError](src/resources/pet-api.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.petApi.getPetById(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Pet, PetApi.GetPetByIdError&gt;</code>, with `result.value` of type <code>[Pet](src/models/pet.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[SwaggerPetstoreOpenApi30Error](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>updatePet(request: PetApi.UpdatePetRequest, options?: RequestOptions): ApiPromise&lt;Pet, PetApi.UpdatePetError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Update an existing pet by Id.

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.petApi.updatePet({
    name: "doggie",
    photoUrls: ["some example string"],
    id: 10,
  });
  // TODO: Handle 'response' of type Pet
} catch (err) {
  // TODO: Handle 'err' of type PetApi.UpdatePetError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.petApi.updatePet({
  name: "doggie",
  photoUrls: ["some example string"],
  id: 10,
}).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Pet
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>name</code> | <code>string</code> | - |
| <code>photoUrls</code> | <code>string[]</code> | - |
| <code>id?</code> | <code>number</code> | - |
| <code>category?</code> | <code>[Category](src/models/category.ts)</code> | - |
| <code>tags?</code> | <code>[Tag](src/models/tag.ts)[]</code> | - |
| <code>status?</code> | <code>[PetStatus](src/models/pet-status.ts)</code> | pet status in the store |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.petApi.updatePet(request)`

- **OnSuccess**: <code>[Pet](src/models/pet.ts)</code>
- **OnError**: throws <code>[PetApi.UpdatePetError](src/resources/pet-api.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.petApi.updatePet(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Pet, PetApi.UpdatePetError&gt;</code>, with `result.value` of type <code>[Pet](src/models/pet.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[SwaggerPetstoreOpenApi30Error](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>updatePetWithForm(request: PetApi.UpdatePetWithFormRequest, options?: RequestOptions): ApiPromise&lt;Pet, PetApi.UpdatePetWithFormError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Updates a pet resource based on the form data.

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.petApi.updatePetWithForm({ petId: 10 });
  // TODO: Handle 'response' of type Pet
} catch (err) {
  // TODO: Handle 'err' of type PetApi.UpdatePetWithFormError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.petApi.updatePetWithForm({ petId: 10 }).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Pet
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>petId</code> | <code>number</code> | ID of pet that needs to be updated |
| <code>name?</code> | <code>string</code> | Name of pet that needs to be updated |
| <code>status?</code> | <code>string</code> | Status of pet that needs to be updated |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.petApi.updatePetWithForm(request)`

- **OnSuccess**: <code>[Pet](src/models/pet.ts)</code>
- **OnError**: throws <code>[PetApi.UpdatePetWithFormError](src/resources/pet-api.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.petApi.updatePetWithForm(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Pet, PetApi.UpdatePetWithFormError&gt;</code>, with `result.value` of type <code>[Pet](src/models/pet.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[SwaggerPetstoreOpenApi30Error](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>uploadFile(request: PetApi.UploadFileRequest, options?: RequestOptions): ApiPromise&lt;ApiResponse, PetApi.UploadFileError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Upload image of the pet.

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.petApi.uploadFile({ petId: 10 });
  // TODO: Handle 'response' of type ApiResponse
} catch (err) {
  // TODO: Handle 'err' of type PetApi.UploadFileError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.petApi.uploadFile({ petId: 10 }).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type ApiResponse
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>petId</code> | <code>number</code> | ID of pet to update |
| <code>additionalMetadata?</code> | <code>string</code> | Additional Metadata |
| <code>body?</code> | <code>FileInput</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.petApi.uploadFile(request)`

- **OnSuccess**: <code>[ApiResponse](src/models/api-response.ts)</code>
- **OnError**: throws <code>[PetApi.UploadFileError](src/resources/pet-api.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.petApi.uploadFile(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;ApiResponse, PetApi.UploadFileError&gt;</code>, with `result.value` of type <code>[ApiResponse](src/models/api-response.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[SwaggerPetstoreOpenApi30Error](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

## Store

> Source: [Store](src/resources/store.ts)

<details>
<summary><code>deleteOrder(request: Store.DeleteOrderRequest, options?: RequestOptions): ApiPromise&lt;undefined, Store.DeleteOrderError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

For valid response try integer IDs with value < 1000. Anything above 1000 or non-integers will generate API errors.

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  await client.store.deleteOrder({ orderId: 1 });
} catch (err) {
  // TODO: Handle 'err' of type Store.DeleteOrderError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.store.deleteOrder({ orderId: 1 }).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: The call succeeded and resolves to no body
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>orderId</code> | <code>number</code> | ID of the order that needs to be deleted |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.store.deleteOrder(request)`

- **OnSuccess**: <code>undefined</code>
- **OnError**: throws <code>[Store.DeleteOrderError](src/resources/store.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.store.deleteOrder(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;undefined, Store.DeleteOrderError&gt;</code>, with `result.value` of type <code>undefined</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[SwaggerPetstoreOpenApi30Error](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getInventory(options?: RequestOptions): ApiPromise&lt;Record&lt;string, number&gt;, Store.GetInventoryError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Returns a map of status codes to quantities.

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.store.getInventory();
  // TODO: Handle 'response' of type Record<string, number>
} catch (err) {
  // TODO: Handle 'err' of type Store.GetInventoryError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.store.getInventory().asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Record<string, number>
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.store.getInventory()`

- **OnSuccess**: <code>Record&lt;string, number&gt;</code>
- **OnError**: throws <code>[Store.GetInventoryError](src/resources/store.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.store.getInventory().asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Record&lt;string, number&gt;, Store.GetInventoryError&gt;</code>, with `result.value` of type <code>Record&lt;string, number&gt;</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[SwaggerPetstoreOpenApi30Error](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getOrderById(request: Store.GetOrderByIdRequest, options?: RequestOptions): ApiPromise&lt;Order, Store.GetOrderByIdError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.store.getOrderById({ orderId: 1 });
  // TODO: Handle 'response' of type Order
} catch (err) {
  // TODO: Handle 'err' of type Store.GetOrderByIdError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.store.getOrderById({ orderId: 1 }).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Order
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>orderId</code> | <code>number</code> | ID of order that needs to be fetched |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.store.getOrderById(request)`

- **OnSuccess**: <code>[Order](src/models/order.ts)</code>
- **OnError**: throws <code>[Store.GetOrderByIdError](src/resources/store.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.store.getOrderById(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Order, Store.GetOrderByIdError&gt;</code>, with `result.value` of type <code>[Order](src/models/order.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[SwaggerPetstoreOpenApi30Error](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>placeOrder(request: Store.PlaceOrderRequest, options?: RequestOptions): ApiPromise&lt;Order, Store.PlaceOrderError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Place a new order in the store.

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.store.placeOrder({ id: 10, petId: 198772, quantity: 7 });
  // TODO: Handle 'response' of type Order
} catch (err) {
  // TODO: Handle 'err' of type Store.PlaceOrderError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.store.placeOrder({ id: 10, petId: 198772, quantity: 7 }).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Order
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id?</code> | <code>number</code> | - |
| <code>petId?</code> | <code>number</code> | - |
| <code>quantity?</code> | <code>number</code> | - |
| <code>shipDate?</code> | <code>Date</code> (date-time) | - |
| <code>status?</code> | <code>[OrderStatus](src/models/order-status.ts)</code> | Order Status |
| <code>complete?</code> | <code>boolean</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.store.placeOrder(request)`

- **OnSuccess**: <code>[Order](src/models/order.ts)</code>
- **OnError**: throws <code>[Store.PlaceOrderError](src/resources/store.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.store.placeOrder(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Order, Store.PlaceOrderError&gt;</code>, with `result.value` of type <code>[Order](src/models/order.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[SwaggerPetstoreOpenApi30Error](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

## UserApi

> Source: [UserApi](src/resources/user-api.ts)

<details>
<summary><code>createUser(request: UserApi.CreateUserRequest, options?: RequestOptions): ApiPromise&lt;User, UserApi.CreateUserError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

This can only be done by the logged in user.

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.userApi.createUser({
    id: 10,
    username: "theUser",
    firstName: "John",
    lastName: "James",
    email: "john@email.com",
    password: "12345",
    phone: "12345",
    userStatus: 1,
  });
  // TODO: Handle 'response' of type User
} catch (err) {
  // TODO: Handle 'err' of type UserApi.CreateUserError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.userApi.createUser({
  id: 10,
  username: "theUser",
  firstName: "John",
  lastName: "James",
  email: "john@email.com",
  password: "12345",
  phone: "12345",
  userStatus: 1,
}).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type User
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id?</code> | <code>number</code> | - |
| <code>username?</code> | <code>string</code> | - |
| <code>firstName?</code> | <code>string</code> | - |
| <code>lastName?</code> | <code>string</code> | - |
| <code>email?</code> | <code>string</code> | - |
| <code>password?</code> | <code>string</code> | - |
| <code>phone?</code> | <code>string</code> | - |
| <code>userStatus?</code> | <code>number</code> | User Status |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.userApi.createUser(request)`

- **OnSuccess**: <code>[User](src/models/user.ts)</code>
- **OnError**: throws <code>[UserApi.CreateUserError](src/resources/user-api.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.userApi.createUser(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;User, UserApi.CreateUserError&gt;</code>, with `result.value` of type <code>[User](src/models/user.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[SwaggerPetstoreOpenApi30Error](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>createUsersWithListInput(request: UserApi.CreateUsersWithListInputRequest, options?: RequestOptions): ApiPromise&lt;User, UserApi.CreateUsersWithListInputError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Creates list of users with given input array.

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.userApi.createUsersWithListInput();
  // TODO: Handle 'response' of type User
} catch (err) {
  // TODO: Handle 'err' of type UserApi.CreateUsersWithListInputError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.userApi.createUsersWithListInput().asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type User
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>body?</code> | <code>[User](src/models/user.ts)[]</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.userApi.createUsersWithListInput(request)`

- **OnSuccess**: <code>[User](src/models/user.ts)</code>
- **OnError**: throws <code>[UserApi.CreateUsersWithListInputError](src/resources/user-api.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.userApi.createUsersWithListInput(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;User, UserApi.CreateUsersWithListInputError&gt;</code>, with `result.value` of type <code>[User](src/models/user.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[SwaggerPetstoreOpenApi30Error](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>deleteUser(request: UserApi.DeleteUserRequest, options?: RequestOptions): ApiPromise&lt;undefined, UserApi.DeleteUserError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

This can only be done by the logged in user.

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  await client.userApi.deleteUser({ usersname: "some example string" });
} catch (err) {
  // TODO: Handle 'err' of type UserApi.DeleteUserError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.userApi.deleteUser({ usersname: "some example string" }).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: The call succeeded and resolves to no body
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>usersname</code> | <code>string</code> | The username that needs to be processed |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.userApi.deleteUser(request)`

- **OnSuccess**: <code>undefined</code>
- **OnError**: throws <code>[UserApi.DeleteUserError](src/resources/user-api.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.userApi.deleteUser(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;undefined, UserApi.DeleteUserError&gt;</code>, with `result.value` of type <code>undefined</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[SwaggerPetstoreOpenApi30Error](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getUserByName(request: UserApi.GetUserByNameRequest, options?: RequestOptions): ApiPromise&lt;User, UserApi.GetUserByNameError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Get user detail based on username.

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.userApi.getUserByName({ usersname: "some example string" });
  // TODO: Handle 'response' of type User
} catch (err) {
  // TODO: Handle 'err' of type UserApi.GetUserByNameError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.userApi.getUserByName({ usersname: "some example string" }).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type User
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>usersname</code> | <code>string</code> | The username that needs to be processed |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.userApi.getUserByName(request)`

- **OnSuccess**: <code>[User](src/models/user.ts)</code>
- **OnError**: throws <code>[UserApi.GetUserByNameError](src/resources/user-api.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.userApi.getUserByName(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;User, UserApi.GetUserByNameError&gt;</code>, with `result.value` of type <code>[User](src/models/user.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[SwaggerPetstoreOpenApi30Error](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>loginUser(request: UserApi.LoginUserRequest, options?: RequestOptions): ApiPromise&lt;undefined, UserApi.LoginUserError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Log into the system.

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  await client.userApi.loginUser();
} catch (err) {
  // TODO: Handle 'err' of type UserApi.LoginUserError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.userApi.loginUser().asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: The call succeeded and resolves to no body
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>username?</code> | <code>string</code> | The user name for login |
| <code>password?</code> | <code>string</code> | The password for login in clear text |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.userApi.loginUser(request)`

- **OnSuccess**: <code>undefined</code>
- **OnError**: throws <code>[UserApi.LoginUserError](src/resources/user-api.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.userApi.loginUser(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;undefined, UserApi.LoginUserError&gt;</code>, with `result.value` of type <code>undefined</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[SwaggerPetstoreOpenApi30Error](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>logoutUser(options?: RequestOptions): ApiPromise&lt;undefined, UserApi.LogoutUserError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Log user out of the system.

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  await client.userApi.logoutUser();
} catch (err) {
  // TODO: Handle 'err' of type UserApi.LogoutUserError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.userApi.logoutUser().asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: The call succeeded and resolves to no body
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.userApi.logoutUser()`

- **OnSuccess**: <code>undefined</code>
- **OnError**: throws <code>[UserApi.LogoutUserError](src/resources/user-api.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.userApi.logoutUser().asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;undefined, UserApi.LogoutUserError&gt;</code>, with `result.value` of type <code>undefined</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[SwaggerPetstoreOpenApi30Error](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>updateUser(request: UserApi.UpdateUserRequest, options?: RequestOptions): ApiPromise&lt;undefined, UserApi.UpdateUserError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

This can only be done by the logged in user.

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  await client.userApi.updateUser({
    usersname: "some example string",
    id: 10,
    username: "theUser",
    firstName: "John",
    lastName: "James",
    email: "john@email.com",
    password: "12345",
    phone: "12345",
    userStatus: 1,
  });
} catch (err) {
  // TODO: Handle 'err' of type UserApi.UpdateUserError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.userApi.updateUser({
  usersname: "some example string",
  id: 10,
  username: "theUser",
  firstName: "John",
  lastName: "James",
  email: "john@email.com",
  password: "12345",
  phone: "12345",
  userStatus: 1,
}).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: The call succeeded and resolves to no body
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>usersname</code> | <code>string</code> | The username that needs to be processed |
| <code>id?</code> | <code>number</code> | - |
| <code>username?</code> | <code>string</code> | - |
| <code>firstName?</code> | <code>string</code> | - |
| <code>lastName?</code> | <code>string</code> | - |
| <code>email?</code> | <code>string</code> | - |
| <code>password?</code> | <code>string</code> | - |
| <code>phone?</code> | <code>string</code> | - |
| <code>userStatus?</code> | <code>number</code> | User Status |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.userApi.updateUser(request)`

- **OnSuccess**: <code>undefined</code>
- **OnError**: throws <code>[UserApi.UpdateUserError](src/resources/user-api.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.userApi.updateUser(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;undefined, UserApi.UpdateUserError&gt;</code>, with `result.value` of type <code>undefined</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[SwaggerPetstoreOpenApi30Error](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

