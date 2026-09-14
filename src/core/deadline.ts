import { AbortError, TimeoutError } from "./errors.js";

export type RequestDeadline = {
  readonly signal: AbortSignal;
  transfer(): () => void;
  settle(): void;
};

export function startDeadline(timeoutMs: number, callerSignal: AbortSignal | undefined): RequestDeadline {
  const controller = new AbortController();
  const onCallerAbort = (): void =>
    controller.abort(
      new AbortError({ message: "Request was aborted by the caller.", cause: callerSignal?.reason }),
    );
  callerSignal?.addEventListener("abort", onCallerAbort, { once: true });
  if (callerSignal?.aborted) onCallerAbort();

  const timer = setTimeout(
    () => controller.abort(new TimeoutError({ message: `Request timed out after ${timeoutMs}ms.` })),
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
