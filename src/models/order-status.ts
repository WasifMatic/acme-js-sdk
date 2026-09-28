import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Order Status */
export const OrderStatus = {
  Placed: "placed",
  Approved: "approved",
  Delivered: "delivered",
} as const;
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus] | (string & {});

export const orderStatusSchema: EnumSchema<OrderStatus> = s.enumOf<OrderStatus>(OrderStatus);
