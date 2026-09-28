import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type ApiResponse = {
  code?: number;
  type?: string;
  message?: string;
};

export const apiResponseSchema: Schema<ApiResponse> = s.object<ApiResponse>({
  code: s.optional(s.number()),
  type: s.optional(s.string()),
  message: s.optional(s.string()),
});
