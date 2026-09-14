import type { Param } from "./param-value.js";
import { encodedParam, flattenValue } from "./param-value.js";
import { percentEncode } from "./params.js";

export function buildHeaders(
  headersByPrecedence: ReadonlyArray<readonly Param[] | undefined>,
  cookies?: readonly Param[],
): Headers {
  const headers = new Headers();
  for (const contributed of headersByPrecedence) {
    for (const header of contributed ?? []) {
      const value = encodedParam(header);
      if (value === undefined) continue;
      const parts = flattenValue(value);
      if (parts.length === 0) headers.delete(header.name);
      else headers.set(header.name, parts.join(","));
    }
  }

  const cookie = mergeCookies(headers.get("cookie"), cookies);
  if (cookie !== undefined) headers.set("cookie", cookie);
  return headers;
}

function mergeCookies(existing: string | null, cookies: readonly Param[] | undefined): string | undefined {
  if (cookies === undefined || cookies.length === 0) return existing ?? undefined;

  const pairs = new Map<string, string>();
  for (const part of (existing ?? "").split(";")) {
    const trimmed = part.trim();
    const separator = trimmed.indexOf("=");
    if (separator <= 0) continue;
    pairs.set(trimmed.slice(0, separator), trimmed.slice(separator + 1));
  }
  for (const source of cookies) {
    const value = encodedParam(source);
    if (value === undefined) continue;
    pairs.set(source.name, flattenValue(value).map(percentEncode).join(","));
  }

  const merged = [...pairs].map(([name, value]) => `${name}=${value}`).join("; ");
  return merged === "" ? undefined : merged;
}
