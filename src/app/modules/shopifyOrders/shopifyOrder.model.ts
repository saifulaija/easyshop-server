// src/orders/order.model.ts
import { Schema, model, Types } from 'mongoose';
import { TOrder } from './shopifyOrder.interface';

const OrderSchema = new Schema<TOrder>(
  {
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: 'ShopifyCustomer',
      required: true,
    },
    product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    total_price: { type: Number, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Order = model<TOrder>('Order', OrderSchema);
