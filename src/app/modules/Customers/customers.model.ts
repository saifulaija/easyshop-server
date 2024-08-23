// models/shopifyCustomers.ts
import { Schema, model, Types } from 'mongoose';
import { TCustomer, TCustomerAddress, TOrder } from './customers.interface';

const orderSchema = new Schema<TOrder>({
  orderID: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
  },
});

const CustomerSchema = new Schema<TCustomer>(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: false },

    default_address: {
      district: { type: String, required: false },
      thana: { type: String, required: false },
      city: { type: String, required: true },
      country: { type: String, required: true },
      postal_code: { type: String, required: false },
    },
    total_spent: { type: Number, default: 0 },
    orders: { type: [orderSchema], default: [] },
    orders_count: { type: Number, default: 0 },
    last_order_id: {
      type: Types.ObjectId,
      ref: 'ShopifyOrder',
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Customer = model('Customer', CustomerSchema);
