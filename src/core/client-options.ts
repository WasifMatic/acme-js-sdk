import { ConfigurationError } from "./errors.js";

/** The signature a replacement `fetch` must have, which is the global `fetch`'s own. */
export type FetchLike = typeof fetch;

const DEFAULT_TIMEOUT_MS = 60_000;
const MAX_TIMEOUT_MS = 2_147_483_647;

export type CoreClientOptions = {
  /**
   * Milliseconds a single request may take, auth resolution included.
   *
   * @remarks
   * Resolved once, when the client is built. A value `setTimeout` cannot honour — negative,
   * fractional, `NaN`, `Infinity`, or above `2_147_483_647` — silently falls back to the default.
   * `0` is passed through literally, a zero-length deadline rather than "no timeout".
   *
   * @default 60000
   */
  readonly timeout: number;

  /** Replaces the global `fetch`. The one extension point for logging, proxying or mocking. */
  readonly fetch: FetchLike;
};

/**
 * Resolves the two engine-wide options once, when the client is built.
 *
 * @throws {@link ConfigurationError} when no `fetch` was supplied and the global one is missing.
 */
export function buildCoreClientOptions(options: Partial<CoreClientOptions>): CoreClientOptions {
  const fetchImpl = options.fetch ?? globalThis.fetch;
  if (typeof fetchImpl !== "function") {
    throw new ConfigurationError("No fetch implementation available; pass ClientOptions.fetch.");
  }
  return {
    timeout: isValidTimeout(options.timeout) ? options.timeout : DEFAULT_TIMEOUT_MS,
    fetch: fetchImpl,
  };
}

function isValidTimeout(timeout: number | undefined): timeout is number {
  return timeout !== undefined && Number.isInteger(timeout) && timeout >= 0 && timeout <= MAX_TIMEOUT_MS;
}
