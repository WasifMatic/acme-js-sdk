import type { HttpMethod } from "./api-request.js";
import { TimeoutError } from "./errors.js";

export type RequestDeadline = {
  readonly signal: AbortSignal;
  transfer(): () => void;
  settle(): void;
};

export function startDeadline(
  timeoutMs: number,
  callerSignal: AbortSignal | undefined,
  method: HttpMethod,
  uri: () => string,
): RequestDeadline {
  const controller = new AbortController();
  const onCallerAbort = (): void => controller.abort(callerSignal?.reason);
  callerSignal?.addEventListener("abort", onCallerAbort, { once: true });
  if (callerSignal?.aborted) onCallerAbort();

  const timer = setTimeout(
    () =>
      controller.abort(
        new TimeoutError(`${method} ${uri()} failed: Request timed out after ${timeoutMs}ms.`, {
          method,
          uri: uri(),
          timeout: timeoutMs,
        }),
      ),
    timeoutMs,
  );

  let stopped = false;
  let transferred = false;

  const stop = (): void => {
    if (stopped) return;
    stopped = true;
    clearTimeout(timer);
    callerSignal?.removeEventListener("abort", onCallerAbort);
  };

  return {
    signal: controller.signal,
    transfer: (): (() => void) => {
      transferred = true;
      return stop;
    },
    settle: (): void => {
      if (transferred) return;
      stop();
    },
  };
}
