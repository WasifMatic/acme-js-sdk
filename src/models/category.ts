import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type Category = {
  id?: number;
  name?: string;
};

export const categorySchema: Schema<Category> = s.object<Category>({
  id: s.optional(s.number()),
  name: s.optional(s.string()),
});
