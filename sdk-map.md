<!-- Generated file — do not edit; regenerated with the SDK. -->

# SDK map — Swagger Petstore - OpenAPI 3.0 (TypeScript)

> A generated table of contents for this SDK. Consult this map and its sub-pages to learn signatures, request-field placement, error types and server wiring **by lookup**. Model shapes and enum values are *not* duplicated here — the map names the file declaring each type and the schema value exported beside it; read the shape there. The compiler is the backstop: a wrong name fails to build.

|  |  |
| --- | --- |
| SDK display name | Swagger Petstore - OpenAPI 3.0 |
| Package | `automated-package-publishing` |
| Package version | `1.0.26` |
| API spec version | `1.0.26` |
| Import specifier | `automated-package-publishing` — the package root is the **only** entry. Deep imports (`automated-package-publishing/models/...`) do not resolve; the `exports` map exposes `.` and `./package.json` and nothing else |
| Module format | dual ESM + CommonJS, as folder dialects (`dist/esm`, `dist/commonjs`), each with its own `package.json` marker. No `.mjs`, `.cjs`, `.d.mts` or `.d.cts` files exist |
| Node floor | `>=20` (`engines.node`) |
| TypeScript floor | a resolver that reads `exports` (4.7+), plus whatever the pinned `zod` requires — `zod@4` needs 5.5 or later. The public `.d.ts` chain reaches `zod/v4-mini`, so this is a real constraint rather than a build-tool version |
| Runtime dependency | `zod` (`^3.25.0 \|\| ^4.0.0`), imported as `zod/v4-mini`. The only runtime dependency |
| Generator | APIMatic |

Staleness check: the API spec version above changes when the SDK is regenerated from a new spec. If a lookup here fails to compile, trust the compiler and re-read the source file named in the row.

All `Source` paths on this map and its sub-pages are relative to the **SDK root** — the directory holding this file and `package.json` — never to the page that carries them: a page two directories deep writes exactly what a page at the root would. The package ships its `src/` tree, so the same paths resolve inside `node_modules/automated-package-publishing/` too. An import specifier ending `.js` inside that source is the NodeNext spelling of the sibling `.ts` file.

---

## Getting a client

```ts
import { SwaggerPetstoreOpenApi30Client } from "automated-package-publishing";

const client = new SwaggerPetstoreOpenApi30Client({
  petstoreAuth: "YOUR_API_KEY",
  apiKey: "YOUR_API_KEY",
});
```

The only constructor is `new SwaggerPetstoreOpenApi30Client(options: ClientOptions = {})`, so `new SwaggerPetstoreOpenApi30Client()` is the minimum. Resources are memoized lazy getters on the client — `client.petApi`, `client.store`, `client.userApi` — and their classes are exported only for their merged namespaces and for `instanceof`; their constructors take engine internals that are not exported, so reach a resource only through its getter.

All `ClientOptions` fields (source: `src/client-options.ts`; every field is `readonly`):

| Field | Type | Default |
| --- | --- | --- |
| `serverOptions` | the server's base-URL and template-variable overrides | `{}` — the resolver merges the declared defaults in |
| `timeout` | `number` (ms) | `60_000` |
| `fetch` | `FetchLike \| undefined` | the global `fetch`, resolved by the transport |
| `petstoreAuth` | `TokenProvider \| undefined` | unset |
| `apiKey` | `TokenProvider \| undefined` | unset |

The 2 auth fields are all optional, and an unset one is not an error — the operation that wanted it simply sends no credential. What each one puts on the wire, and which operations require it, are under Servers & auth.

Two engine behaviours the table cannot show. A non-finite or non-positive `timeout` is **not** "no timeout" — the transport (`src/core/raw-client.ts`) falls back to its own ceiling and clamps anything above it. And when no `fetch` is reachable the **constructor** throws `ConfigurationError`, not the first call.

**`ClientOptions.fetch` is the one extension point** — there are no hooks, no middleware and no interceptors, so a proxy, a custom agent, extra headers, retries or request logging all go here. A replacement **must forward `init.signal`** to whatever actually performs the request; spreading `...init` does it. Drop it and both the per-call signal and `timeout` go inert — the call neither aborts nor times out.

**Cancellation.** The `signal` on `RequestOptions` is the whole per-request surface. Aborting rejects with the signal's **own `reason`** — whatever you passed to `abort()`, or the platform `DOMException` a bare `abort()` supplies — unwrapped, so it is **not** an `SwaggerPetstoreOpenApi30Error` and a `catch` that tests the family must rethrow it. An already-aborted signal rejects immediately. The client-level `timeout` is the SDK's own and does stay in the family, as `err.kind === "timeout"`. There is no per-request timeout.

The entire per-request surface is the optional second argument of every operation:

| Type | Members | Source |
| --- | --- | --- |
| `RequestOptions` | `signal?: AbortSignal` | `src/core/api-request.ts` |

**Not on this SDK.** These are absent by design, not undocumented. This table ships with `src/core/` and is versioned with it.

| You might reach for | Reality |
| --- | --- |
| `maxRetries`, backoff, `Retry-After` handling | no retries. A failed call rejects once |
| a logger, `logLevel`, request/response logging | none. `src/core/` contains no `console` call |
| hooks, middleware, interceptors, `onRequest`/`onResponse` | none. `fetch` is the one extension point |
| pagination, `for await`, auto-paging helpers | no operation is paginated and nothing is async-iterable |
| SSE, `text/event-stream` | no event streams. Every decoder reads the body to completion, bar a binary success, which hands its stream over unread |
| multipart <em>responses</em>, XML bodies | none. A multipart reply is not decoded and an XML body is not sent — an operation declaring either is still emitted, with no body to supply or read |
| per-request `headers`, `timeout`, `baseUrl`, idempotency key | none. `RequestOptions` is `{ signal }` |
| the raw `fetch` `Response` | deliberately unreachable. `status` and `headers` are on `asApiResult()` and on a thrown `ResponseError` |

---

## Error-handling model (read once — applies to every operation)

Operations are **throw-based**, and every **operational** failure belongs to **one family**: `SwaggerPetstoreOpenApi30Error`, a union over six leaves, so one `instanceof SwaggerPetstoreOpenApi30Error` sees all of them. It is not the whole escape set — four throwables sit outside it, enumerated below. Every leaf names the call it raised — `err.method` and `err.uri` — and `message` opens with that name. `instanceof` is reliable **within one dialect**: a process that loads both — `import` in one file, `require` in another — gets two independent copies of every error class, and `instanceof` across that boundary is `false`. Narrow on `err.kind` there, or on `err.name`, which is stable across copies.

Core types (public members with their declared types; all are `readonly`):

| Type | Public members | Source |
| --- | --- | --- |
| `SwaggerPetstoreOpenApi30Error` (declared as `CoreError`) | `kind: ErrorKind` · `method: HttpMethod` · `uri: string` · `message` · `cause` — the union every failure below belongs to | `src/core/errors.ts` |
| `ResponseError` | the rung the server answered on, `ApiError \| DecodeError`; adds `status: number` · `headers: Headers` | `src/core/errors.ts` |
| `ApiError` | `kind: "api"` · `payload` — the open arm, whose `kind` is `string`. **Not generic**: a typed operation's subclass redeclares `payload` with its own literal arms | `src/core/api-error.ts` |
| `TimeoutError` | `kind: "timeout"` · `timeout: number` | `src/core/errors.ts` |
| `DecodeError`, `EncodeError`, `ConnectionError`, `AuthError` | their `kind`, and nothing beyond the two rows above | `src/core/errors.ts` |
| `Declared<K, B>` | `kind: K` · `body: B` | `src/core/api-error.ts` |
| `ErrorPayload<P>` | `P` or `{ kind: "undeclared"; rawBody: ArrayBuffer }` | `src/core/api-error.ts` |
| `Undeclared` | `kind: "undeclared"` · `rawBody: ArrayBuffer` — the always-present arm, carrying the untouched bytes of a status the spec does not describe | `src/core/api-error.ts` |
| `ApiResult<T, E>` | on success `{ ok: true; status; headers; value: T }`, on failure `{ ok: false; status; headers; message: string; method: HttpMethod; uri: string; payload: ErrorPayload<P> }` — the failure branch carries the error's own members, never the error object | `src/core/api-promise.ts` |

`SwaggerPetstoreOpenApi30Error` and `ResponseError` are each a **type and a value**: the type is the union, the value is the abstract class every leaf extends, so `instanceof` and `err.kind` select the same set. Neither can be constructed or extended. `uri` is the absolute URL the call dialled, with the server variables expanded and the path parameters filled; the engine reads it **before** any query is applied, so no query parameter reaches it. One failure names an unresolved URI: a path parameter rejected by its schema arrives as an `EncodeError` whose `uri` still shows the unfilled `{braces}` — an `undefined` one included, since a path parameter is always required, so its schema rejects it first.

`ErrorKind` is closed, so a `switch` over `err.kind` is exhaustive:

| `err.kind` | What happened | Adds |
| --- | --- | --- |
| `"api"` | the API answered with an error status | `status` · `headers` · `payload` |
| `"decode"` | the answer could not be turned into the declared value — the body was not JSON, failed its schema, arrived where none is declared, or died mid-read after the response line; `cause` carries the underlying failure | `status` · `headers` |
| `"encode"` | a request value did not match its declared type, so **nothing was sent**. `cause` is the `SchemaError` that rejected it | — |
| `"connection"` | `fetch` rejected before a response line arrived | — |
| `"timeout"` | `ClientOptions.timeout` elapsed. `timeout` is the budget that ran out | `timeout` |
| `"auth"` | a credential could not be **obtained**, per the paragraph below | — |

**Four throwables sit outside the family**, so `instanceof SwaggerPetstoreOpenApi30Error` is `false` on each and a `catch` that tests it has to rethrow what is left. `ConfigurationError` comes out of the **`SwaggerPetstoreOpenApi30Client` constructor**, synchronously and before any `ApiPromise` exists: no reachable `fetch`. `SchemaError` is what a codec throws when called directly — `apiResponseSchema.decode(json)` — so it names no call; through an operation the same failure arrives one level down, on `DecodeError.cause` or `EncodeError.cause`, and a `serverOptions` override whose value is not a string raises it from the constructor too. Bugs stay outside the family and reach you raw — an unparseable `baseUrl` and a non-file value where a `FileInput` was declared are both `TypeError`. And a caller abort arrives as the signal's own `reason`, unwrapped. The first two are exported from the package root; the other two are not ours to export.

**`AuthError` is about obtaining a credential, never about being refused one** — every configured branch of an alternatives requirement failing. A 401 *from the API* is an `ApiError` like any other status. A 401 does have one auth consequence: it invalidates whatever that operation's scheme had cached, so the **next** call re-acquires. The current request is not retried — see Servers & auth. An alternatives requirement **falls through**: a configured scheme that throws is not the end of it, the next configured one is tried, and only when all of them have failed does it throw. When exactly one was configured, its failure surfaces as it would from that scheme alone. Otherwise it is an `AuthError` whose `cause` is an `AggregateError` holding what each branch threw, in the order tried. Cancellation is the exception: an abort or a timeout escapes immediately rather than being collected.

```ts
try {
  const response = await client.petApi.addPet({ name: "doggie", photoUrls: ["some example string"], id: 10 });
} catch (err) {
  if (err instanceof SwaggerPetstoreOpenApi30Error) {
    switch (err.kind) {
      case "api":
        // TODO: the API answered with an error status — read err.status and err.payload
        break;
      case "decode":
        // TODO: the answer did not fit the spec — read err.status and err.cause
        break;
      case "encode":
        // TODO: nothing was sent — err.cause is the SchemaError that rejected the value
        break;
      case "connection":
      case "timeout":
      case "auth":
        // TODO: no response was produced — err.kind says which
        break;
    }
  } else {
    throw err;
  }
}
```

**Narrowing the payload.** A typed subclass declares its arms as literals, so `switch (err.payload.kind)` narrows `payload.body` to exactly one model. The `kind` is named after the arm's **body**, *not* its status code: a body that references a model takes that model's name in lower camel, any other body `error{Status}`, and a second arm that would land on the same name takes a numeric suffix. On the base `ApiError` — what an operation with no declared error bodies rejects with — `payload.kind` is `string`, so comparing it to `"undeclared"` narrows **nothing**: use `"rawBody" in err.payload`. Which arms an operation declares, with the status each covers, is the **Error arms** bullet on its page below.

**Matcher precedence** for a subclass with several arms, in three passes: an exact numeric status is looked up across the whole table **first**, then the first covering `[lo, hi]` range, and last a `"default"` arm where the spec declared one. A body that does not fit the arm it matched is a `DecodeError` — except on `"default"`, which describes no status in particular and so **degrades to the `"undeclared"` arm** rather than throwing.

**The non-throwing form exists on every operation.** `.asApiResult()` returns `ApiResult<T, E>` and does **not** reject for an HTTP error status — every other failure still rejects, `DecodeError` included, so the `catch` stays. It must be called on the value the operation returned: `ApiPromise` overrides `Symbol.species`, so `.then()`, `.catch()` and `.finally()` hand back a plain `Promise` and the method is gone.

```ts
try {
  const result = await client.petApi.addPet({
    name: "doggie",
    photoUrls: ["some example string"],
    id: 10,
  }).asApiResult();
  // TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
  if (result.ok) {
    // TODO: Use 'result.value' — what this operation resolves to
  } else {
    // TODO: Use 'result.message', 'result.method' and 'result.uri', and narrow 'result.payload'
  }
} catch (err) {
  if (err instanceof SwaggerPetstoreOpenApi30Error) {
    // TODO: no error status was produced — err.kind says which failure this is
  } else {
    throw err;
  }
}
```

`result.payload` is the same `ErrorPayload<P>` a thrown `ApiError` carries on `err.payload`, and `result.message`, `result.method` and `result.uri` are that error's own members — so the **Error arms** bullet on an operation's page enumerates the payload either way, and the `catch` above it is for the rest of the family. `result.method` and `result.uri` are named on this map alone.

Of **19 operations**, **19** declare typed error bodies and **0** reject with the base `ApiError`, whose payload is always the `"undeclared"` arm.

---

## Operations — by resource (3 groups, 19 operations)

Each page below carries one block per operation, with bullets in the fixed order **Server**, **Signature**, **Wire**, **Auth**, **Request body**, **SDK-sent**, **Returns**, **Error**, **Error arms**, then a **Fields** table mapping every request field to the channel it travels on, and a **Type sources** table naming the declaring file and schema value of every type the operation mentions. With `api-reference.md` documenting operations only, that table is the route from an operation to the file declaring what it takes.

**Each block states what is specific to its operation. Everything in the table below holds for EVERY operation unless that operation says otherwise, so a block silent on one of these points is telling you the default here applies — take it and move on rather than opening the source to confirm it.**

| Applies to every operation | Stated where | A block departs from it only by |
| --- | --- | --- |
| **Call shape `op(request, options?)`** — one flat request object first, the per-call options second. There is no positional overload, and no per-call base URL, header, timeout, retry or auth override | here, Getting a client | never — it always holds |
| **The request object is flat and channel-blind.** A field named `body` *is* the whole request body; every other field is fanned out to path, query, header or form by the SDK. Nothing in the object is nested by channel | here | never — the **Fields** table `Channel` column always resolves it |
| **Throw-based, returning `ApiPromise<T, E>`.** `await` it for `T`; call `.asApiResult()` on the returned value for the non-throwing `ApiResult<T, E>`. No operation is result-only | here, Error-handling model | never |
| **`E` is the base `ApiError`** and the payload is always the `"undeclared"` arm | Error-handling model | the spec declared error bodies — the **Error** bullet names a subclass and an **Error arms** bullet gives each arm's tag, status and body |
| **The request body and its media type are stated on every block**, by a **Request body** bullet that is never omitted. `none` means no body **and no `Content-Type` header**, and a named media type means the body is **required** — the request type's field is not optional | here | the spec declared the body optional — the bullet adds **Optional**, the field is `field?:`, and omitting it sends no body and no `Content-Type` header at all |
| **Resolves once, to one whole value** — except a binary body, which resolves to a stream the caller reads. No pagination, no SSE, no async iterables and no partial results | here, Not on this SDK | never at this SDK version |
| **Six identity headers ride every request** — `User-Agent`, `X-APIMatic-Lang`, `X-APIMatic-Package-Version`, `X-APIMatic-Gen-Version`, `X-APIMatic-OS` and `X-APIMatic-Runtime`. They identify the generated SDK, so **no option configures them** | here | the operation declared a header of the same name — the operation's layer is folded after the client's, so its value wins |
| **A fresh `Idempotency-Key` rides every non-GET call that does not declare that header itself**, minted per call in the operation's own header layer. It makes a *replayed* request safe, not a repeated one — a value that changes per call deduplicates nothing, so it is no substitute for a key the API documents. **No option sets it**, and once minted it is always sent — a runtime with no `crypto` global mints it from `Math.random` mixed with the clock and a per-process counter | here | the operation is a GET, or declared that header itself — then its own value stands and nothing is minted |
| **Server group `default`** | here, Servers & auth | the operation is on another group — its block carries a **Server** bullet |
| **Every operation states its auth requirement**, by an **Auth** bullet that is never omitted — one scheme, a composition over schemes, or `none` for a public operation | here, Servers & auth | never — the bullet is always present |
| **Every value is schema-encoded before the request is built** — a wrong type or format rejects and nothing is sent. **An omitted field that has a default is still sent, with that default**, filled by the SDK rather than by the server | here | the field has a default — it appears in the **Fields** table `Default` column |
| **Field names are TypeScript camelCase and the wire name is the same** | here | some field differs — the **Fields** table gains a `Wire` column, where an em dash means "same as the field name" |
| **Arrays repeat their key and objects bracket-expand** | the serialization block below | never — this SDK declares no per-field serialization style, so every array takes this one |

**Wire serialization, once, for every channel** (source: `src/core/param-value.ts`, `src/core/url.ts`, `src/core/headers.ts`, `src/core/params.ts`). This block ships with `src/core/` and is versioned with it:

- **`path`** takes no style. An array is comma-joined with each element percent-encoded **separately**; an object becomes one percent-encoded JSON document inside the segment. A field whose encoded value is `undefined` throws `TypeError` naming the unfilled placeholder — a guard no operation reaches, since a path parameter is always required and its schema rejects `undefined` first, as an `EncodeError`; `null` collapses the segment.
- **`header`** takes no style. An array is comma-joined un-encoded (OpenAPI `simple`). `undefined` says nothing, while `null` and an empty array are tombstones that remove the header. Later layers win by **lowercased** name, in the order body content type, then client defaults, then operation.
- **`query`** and **`form`** repeat an array's key and bracket-expand an object at any depth (`filter[status]=open`, `ranges[amount][min]=10`). An array of *objects* bracket-expands per element with **no index**, so element boundaries collapse.
- Nullish **fields** are dropped from every channel except `path`, where `null` collapses the segment. A nullish array **element** is dropped, so an all-nullish array emits no key at all.
- `form` bodies use RFC 1866 encoding (space becomes `+`); `query` uses `%20`. On the wire both key and value go through `encodeURIComponent`, plus a further escape of `!`, `'`, `(`, `)` and `*`.

**A file is not a model.** Bytes a caller sends are typed `FileInput` and are framed by the transport rather than checked by a schema; bytes a caller receives arrive as `BinaryContent` on a success and `BinaryErrorContent` on a declared failure. That is a different thing from a `Uint8Array` **field**, which is a value inside a JSON document or a URL and travels as base64 text.

| Type | Shape | Source |
| --- | --- | --- |
| `FileInput` | `BinaryData` or `FileData` — what every binary request body and every multipart file part takes, singly or as an array | `src/core/binary.ts` |
| `BinaryData` | `Blob`, `Uint8Array`, `ArrayBuffer`, a `ReadableStream` of bytes, or any async iterable of them — which is what a Node `Readable` satisfies. Bare bytes, carrying no name and no media type | `src/core/binary.ts` |
| `FileData` | `data` · `fileName?` · `contentType?` — what turns bytes into a file | `src/core/binary.ts` |
| `BinaryContent` | `stream` · `contentType` · `fileName?` — read the stream once or release it with `stream.cancel()` | `src/core/binary.ts` |
| `BinaryErrorContent` | `bytes` · `contentType?` · `fileName?` — already buffered, so there is nothing to release | `src/core/binary.ts` |

**A media type a value carries beats the one the SDK declares.** Every request the SDK sends declares `application/octet-stream`; a `FileData.contentType`, or a non-empty `Blob.type`, overrides it. A file name is the caller's or absent — never fabricated — and where one is given a whole-body upload sends it as `Content-Disposition`. On a download both come off the reply's own headers, and a server-chosen file name is untrusted input: sanitise it before writing to disk.

**A `multipart/form-data` body is framed part by part, in field order.** An array value fans out into one part per item under the shared field name, and an empty array or an absent value sends no part at all. While every file part is buffered the platform `FormData` frames the request and declares a `Content-Length`; as soon as one streams, the SDK frames the whole envelope itself and sends it chunked, which browsers other than Chromium refuse.

**The verb and route are on the pages below**, where a map for a language whose method names are derived from the route can leave them to the source. A TypeScript method name carries none of it, and a `path` field row is unreadable without the route template it fills.

**Endpoint prose is not on this map.** Where the *semantics* of an operation decide what you must pass — a field whose value changes server-side behaviour, an ordering or exclusivity rule between fields — read `api-reference.md`, whose entries are keyed by the same signature these pages print. Blocks here give you the contract: names, channels, types, defaults, errors.

| Resource (`client.X`) | Ops | Page |
| --- | --- | --- |
| `petApi` | 8 | [map/operations/pet-api.md](map/operations/pet-api.md) |
| `store` | 4 | [map/operations/store.md](map/operations/store.md) |
| `userApi` | 7 | [map/operations/user-api.md](map/operations/user-api.md) |

---

## Models — where they live, how to build them

**Shapes live only in the source.** Every module under `src/models/` declares exactly one model type and the schema value beside it, and both are re-exported from the package root. Take the pair from an operation's **Type sources** table, or build the directory from the kind below. **Do not derive the path from the type name** — the transform is not reversible in general, and the table is the authority. Never grep for a type.

| Group | Count | Directory |
| --- | --- | --- |
| Objects (plain `type`, no class) | 6 | `src/models/` |
| Enums (open; const companion plus schema) | 2 | `src/models/` |
| Typed error classes (`ApiError` subclass, one per typed operation) | 19 | `src/resources/`, in the declaring module's namespace |

Conventions: every model is a plain `type`, not a class — build one with an object literal; there is no constructor and no builder. `f: T` is required, `f?: T` is optional (omit the key), and `f: T | null` is a **required, nullable** field where `null` is a value distinct from an omitted key. Optional properties are declared `f?: T`, not `f?: T | undefined`, so under `exactOptionalPropertyTypes` you must **omit or spread** an absent field rather than assign `undefined` to it. A schema value is directly usable both ways: `Schema<T, W = Encoded<T>>` is `{ decode(v: unknown): T; encode(v: unknown): W }`, and `Encoded<T>` is the wire projection — a `Date` becomes `string | number`, a `Uint8Array` becomes a base64 `string`, recursing through arrays and objects. `EnumSchema<T>` adds `readonly values: readonly T[]`, so an enum's known set is testable at run time. Enums are **not** TypeScript `enum`s and are open: a `const` companion plus a union that includes `(string & {})` or `(number & {})`, so **any** value of the base type is assignable and the schema validates the base type only, never membership — read the member names and the values they send off the companion, and use `.values` to test membership yourself. A discriminated union is narrowed with an exhaustive `switch` on its tag, with no fallback arm and no type guard to import; one without a discriminant is narrowed on the shape of its arms, which its declaration spells out. A property default is filled by the SDK on **encode as well as decode**, so omitting one still sends it — read it off the `defaulted(…)` entry in the schema, or off the property's `@default`. A property's wire name is its `_keysMap` entry in the schema and may differ from the TypeScript name — read it there rather than deriving it. A named spec schema whose resolved form is a bare container, or which is used only as a form-encoded body, gets no model file and no exported name: the first is written inline at each use site, the second is flattened onto the operation's request type, one field per property, so read that field list from the request type.

Every name comes from the package root — there is no default export, and no deep imports:

```ts
import { type ApiResponse, apiResponseSchema } from "automated-package-publishing";
```

---

## Servers & auth

**Authentication is per operation.** Every operation declares the requirement it enforces and the SDK sends exactly that: **9 of the 19 operations** require a credential and **10** are public. Each block on a page above carries an **Auth** bullet naming its requirement, `none` included. There is no client-global switch and no per-call override.

| Scheme (as an **Auth** bullet names it) | Configured with | What the SDK sends |
| --- | --- | --- |
| `petstoreAuth` | `petstoreAuth` | header `Authorization: <key>` |
| `apiKey` | `apiKey` | header `api_key: <key>` |

A scheme **contributes** headers, query parameters and cookies rather than mutating the request, so a credential is encoded by exactly the code that encodes an operation's own parameters. The auth layer goes on **last**, which means a scheme's `Authorization` wins over one the operation declared.

**Composition is emitted, not configured.** Where the spec puts two schemes in one requirement the SDK sends **both**; where it lists alternatives the SDK sends the **first configured** one, in the order the **Auth** bullet prints them. The combinators that express this (`allAuth`, `anyAuth`, `noneAuth`) live in the generated resource modules and are **not exported**.

**A credential may be a function.** Every field typed `TokenProvider` is re-read on **every** request with no caching, so a key can rotate without rebuilding the client. An empty string counts as absent, and a function is treated as present without being invoked.

**An unconfigured scheme does not throw.** The request goes out without that credential and the server decides. So a 401 on a call you believed was authenticated is usually an unset credential field rather than an SDK failure — check the operation's **Auth** bullet against what the client was given.

**A 401 invalidates, it does not retry.** On a **401** — 401 only, not 403 — the SDK clears whatever that operation's scheme had cached, so the *next* call re-acquires. The current request still rejects with the operation's `ApiError`. There is no retry loop on this SDK, and the credential fields are on `ClientOptions`.

**serverOptions.** 2 logical servers; each operation is bound to one at generation time, and a block carries a **Server** bullet only when its group is not `default`. Override `serverOptions.default` and `serverOptions.authServer`.

**Base URLs and overrides.** One row per group, and every cell is overridden at `serverOptions.<group>.<name>`, where `<name>` is `baseUrl` for the whole template or the variable name for one substitution. An override merges with the built-in defaults **key by key**.

| Group | Base URL template | Template variables (default) |
| --- | --- | --- |
| `default` | `https://petstore3.swagger.io/api/v3` | — |
| `authServer` | `https://petstore3.swagger.io/oauth` | — |

A `baseUrl` override replaces the template verbatim; variable values are percent-encoded into it, and templates are expanded per request rather than once at construction.

---

## Runtime & packaging

The facts that change what you type, and the floors that decide whether the package loads at all. This section is the home for all of them.

|  |  |
| --- | --- |
| One entry, two dialects | `import` resolves `dist/esm`, `require` resolves `dist/commonjs`, both through the single `.` export. In a TypeScript CommonJS file the typed spelling is `import sdk = require("automated-package-publishing")`; a plain `require` destructure works at run time but yields no types. `instanceof` is reliable **within** one dialect — if your app loads both, the two copies declare separate error classes |
| Consumer compiler settings | Under `exactOptionalPropertyTypes`, **omit or spread** an absent optional rather than assigning `undefined` to it. Under `verbatimModuleSyntax`, names that carry no runtime value (the options types, every model type) must be imported with `import type` |
| Required globals, and only these | Always: `fetch` (or a replacement passed as the `fetch` option), `AbortController`, `Headers`, `URL`, `setTimeout` and `clearTimeout`, `JSON`, `BigInt`. `crypto.randomUUID` or `crypto.getRandomValues` mints the `Idempotency-Key` a non-GET call carries — **read and never required**, since a runtime offering neither fills the bytes from `Math.random` mixed with the clock and a per-process counter, so the header is always sent. Three more are **read and never required** — `process`, `navigator` and `EdgeRuntime`, which name the host in `X-APIMatic-OS` and `X-APIMatic-Runtime`. A runtime offering none of them sends neither header and works unchanged. |
| Values that cross the boundary | `Date` for `date-time`, `string` for `date`, `ArrayBuffer` for an undeclared error body, `Headers` on a result and on a thrown `ResponseError`. The engine also carries a `bigint` int64 path and a base64 `bytes()` codec, reached only where a model uses them |
| Browser distribution | The package ships `dist/esm` and `dist/commonjs` and nothing else — **no bundle, no UMD file, no CDN artifact**. Use it through a bundler, which resolves `zod/v4-mini`, deduplicates it against your own copy and tree-shakes the rest |
| Other runtimes | Deno, Bun, Cloudflare Workers and Vercel Edge are all likely to work — the SDK needs only the globals above and imports no Node built-in — but **none of them is tested for this package**, so nothing here claims support for them |

The browser floor comes from the emitted output rather than the sources: `tshy` builds at `target: ES2022`, so native `#private` fields and methods survive into `dist/`.

| Browser | Minimum | Set by |
| --- | --- | --- |
| Chrome / Edge | **85** | `String.prototype.replaceAll`, logical assignment (`??=`) |
| Firefox | **90** | private class fields and methods |
| Safari / iOS Safari | **15** | private class **methods** |

That table is the **module-load** floor: below it the SDK fails while the module is evaluating, not at the first call. Two things degrade quietly above it. `{ cause }` on the `Error` constructor needs Chrome 93, Firefox 91 or Safari 15, so below that `err.cause` is `undefined`. More consequentially, **cancellation needs `AbortController.abort(reason)` and `AbortSignal.reason`**, which arrived in Chrome 98, Firefox 97 and Safari 15.4 — between the module-load floor and those versions the engine still aborts the request, but nothing carries the reason out, so neither your own abort value nor the SDK's `TimeoutError` reaches you.

