import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type User = {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  /** User Status */
  userStatus?: number;
};

export const userSchema: Schema<User> = s.object<User>({
  id: s.optional(s.number()),
  username: s.optional(s.string()),
  firstName: s.optional(s.string()),
  lastName: s.optional(s.string()),
  email: s.optional(s.string()),
  password: s.optional(s.string()),
  phone: s.optional(s.string()),
  userStatus: s.optional(s.number()),
});
