import type { Entry } from "./validation/schema.js";
import type { RequestDeadline } from "./deadline.js";
import type { BinaryContent, BinaryErrorContent } from "./binary.js";
import { readBinary, readBinaryError } from "./binary.js";
import { CoreError, ConnectionError, SdkError } from "./errors.js";
import { SchemaError, decodeEntry } from "./validation/schema-error.js";

export type JsonResponseDecoder<T> = {
  readonly kind: "json";
  readonly schema: Entry<T>;
};

export type TextResponseDecoder<T> = {
  readonly kind: "text";
  readonly schema: Entry<T>;
};

export type EmptyResponseDecoder = {
  readonly kind: "empty";
};

export type BinaryResponseDecoder = {
  readonly kind: "binary";
  readonly contentType: string;
};

export type BinaryErrorResponseDecoder = {
  readonly kind: "binaryError";
};

export type ResponseDecoder<T> =
  | JsonResponseDecoder<T>
  | TextResponseDecoder<T>
  | ([T] extends [undefined] ? EmptyResponseDecoder : never)
  | ([T] extends [BinaryContent] ? BinaryResponseDecoder : never)
  | ([T] extends [BinaryErrorContent] ? BinaryErrorResponseDecoder : never);

export type AnyResponseDecoder =
  | JsonResponseDecoder<unknown>
  | TextResponseDecoder<unknown>
  | EmptyResponseDecoder
  | BinaryResponseDecoder
  | BinaryErrorResponseDecoder;

export function decodeResponse<T>(
  decoder: Exclude<ResponseDecoder<T>, BinaryResponseDecoder>,
  response: Response,
): Promise<T>;
export function decodeResponse<T>(
  decoder: ResponseDecoder<T>,
  response: Response,
  deadline: RequestDeadline,
): Promise<T>;
export function decodeResponse(
  decoder: Exclude<AnyResponseDecoder, BinaryResponseDecoder>,
  response: Response,
): Promise<unknown>;
export function decodeResponse(
  decoder: AnyResponseDecoder,
  response: Response,
  deadline: RequestDeadline,
): Promise<unknown>;
export async function decodeResponse(
  decoder: AnyResponseDecoder,
  response: Response,
  deadline?: RequestDeadline,
): Promise<unknown> {
  switch (decoder.kind) {
    case "json":
      return decodeJson(decoder, response);
    case "text":
      return decodeText(decoder, response);
    case "empty":
      return decodeEmpty(response);
    case "binary":
      return decodeBinary(decoder, response, deadline);
    case "binaryError":
      return readBinaryError(response);
    default: {
      await response.body?.cancel().catch(() => {});
      return unknownDecoderKind(decoder);
    }
  }
}

async function decodeJson<T>(decoder: JsonResponseDecoder<T>, response: Response): Promise<T> {
  let text: string;
  try {
    text = await response.text();
  } catch (err) {
    if (err instanceof CoreError) throw err;
    throw new ConnectionError({ message: "Response body could not be read.", cause: err });
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch (err) {
    throw new SchemaError({
      message: "Response body could not be parsed.",
      rawBody: text,
      cause: err,
    });
  }
  return decodeEntry(decoder.schema, parsed);
}

async function decodeText<T>(decoder: TextResponseDecoder<T>, response: Response): Promise<T> {
  let text: string;
  try {
    text = await response.text();
  } catch (err) {
    if (err instanceof CoreError) throw err;
    throw new ConnectionError({ message: "Response body could not be read.", cause: err });
  }
  return decodeEntry(decoder.schema, text);
}

async function decodeEmpty(response: Response): Promise<undefined> {
  let bytes: ArrayBuffer;
  try {
    bytes = await response.arrayBuffer();
  } catch (err) {
    if (err instanceof CoreError) throw err;
    throw new ConnectionError({ message: "Response body could not be read.", cause: err });
  }
  if (bytes.byteLength > 0)
    throw new SchemaError({
      message: "Expected an empty response body.",
      rawBody: bytes,
    });
  return undefined;
}

async function decodeBinary(
  decoder: BinaryResponseDecoder,
  response: Response,
  deadline: RequestDeadline | undefined,
): Promise<BinaryContent> {
  if (deadline === undefined) {
    await response.body?.cancel().catch(() => {});
    throw new SdkError({ message: "A binary response decoder requires a request deadline." });
  }
  return readBinary(decoder, response, deadline);
}

function unknownDecoderKind(decoder: never): never {
  const kind = (decoder as { kind?: unknown }).kind;
  throw new SdkError({ message: `Unsupported response decoder kind: ${String(kind)}` });
}
