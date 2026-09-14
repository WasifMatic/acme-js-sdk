import type { AuthParams, AuthScheme } from "../api-request.js";
import type {
  OAuth2RefreshableTokenStrategy,
  OAuth2TokenStrategy,
  OAuthToken,
  OAuthTokenRefreshable,
} from "./oauth2-strategies.js";
import { header, noneAuth } from "./schemes.js";

const EXPIRY_BUFFER_MS = 30_000;

export function oauth2Scheme<TCredentials>(
  credentials: TCredentials | undefined,
  strategy: OAuth2TokenStrategy<TCredentials>,
): AuthScheme {
  if (credentials === undefined) return noneAuth;
  return cachedTokenScheme((signal) => strategy.getToken(credentials, signal));
}

export function oauth2RefreshableScheme<TCredentials>(
  credentials: TCredentials | undefined,
  strategy: OAuth2RefreshableTokenStrategy<TCredentials>,
): AuthScheme {
  if (credentials === undefined) return noneAuth;
  return cachedTokenScheme<OAuthTokenRefreshable>(async (signal, previous) => {
    const refreshToken = previous?.refreshToken;
    if (refreshToken === undefined) return strategy.getToken(credentials, signal);

    const refreshed = await strategy.tryRefreshToken(credentials, refreshToken, signal);
    if (refreshed === null) return strategy.getToken(credentials, signal);
    return refreshed.refreshToken === undefined ? { ...refreshed, refreshToken } : refreshed;
  });
}

function cachedTokenScheme<TToken extends OAuthToken>(
  acquire: (signal: AbortSignal, previous: TToken | undefined) => Promise<TToken>,
): AuthScheme {
  let cached: { token: TToken; expiresAt: number } | undefined;
  let inflight: Promise<TToken> | undefined;

  async function load(signal: AbortSignal): Promise<TToken> {
    try {
      const token = await acquire(signal, cached?.token);
      cached = { token, expiresAt: expiryOf(token) };
      return token;
    } finally {
      inflight = undefined;
    }
  }

  return {
    async resolve(signal) {
      if (cached !== undefined && Date.now() < cached.expiresAt) return bearer(cached.token);
      inflight ??= load(signal);
      return bearer(await inflight);
    },
    hasCredentials: () => true,
    invalidate: () => {
      cached = undefined;
    },
  };
}

function bearer(token: OAuthToken): AuthParams {
  return header("Authorization", `Bearer ${token.accessToken}`);
}

function expiryOf(token: OAuthToken): number {
  if (token.expiresIn === undefined || token.expiresIn <= 0) return Number.POSITIVE_INFINITY;
  return Date.now() + token.expiresIn * 1000 - EXPIRY_BUFFER_MS;
}
