import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** pet status in the store */
export const PetStatus = {
  Available: "available",
  Pending: "pending",
  Sold: "sold",
} as const;
export type PetStatus = (typeof PetStatus)[keyof typeof PetStatus] | (string & {});

export const petStatusSchema: EnumSchema<PetStatus> = s.enumOf<PetStatus>(PetStatus);
