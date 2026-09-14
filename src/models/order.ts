import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { orderStatusSchema, type OrderStatus } from "./order-status.js";

export type Order = {
  id?: number;
  petId?: number;
  quantity?: number;
  shipDate?: Date;
  /** Order Status */
  status?: OrderStatus;
  complete?: boolean;
};

export const orderSchema: Schema<Order> = s.object<Order>({
  id: s.optional(s.number()),
  petId: s.optional(s.number()),
  quantity: s.optional(s.number()),
  shipDate: s.optional(s.dateTime()),
  status: s.optional(s.lazy(() => orderStatusSchema)),
  complete: s.optional(s.boolean()),
});
