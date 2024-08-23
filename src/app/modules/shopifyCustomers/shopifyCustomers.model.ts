import { Schema, model, Types } from 'mongoose';
import { TShopifyCustomer } from './shopifyCustomers.interface';


const ShopifyCustomerSchema = new Schema<TShopifyCustomer>({
  email: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: false },
  created_at: { type: Date, default: Date.now },
  default_address: {
    district: { type: String, required: false },
    thana: { type: String, required: false },
    city: { type: String, required: true },
    country: { type: String, required: true },
    postal_code: { type: String, required: false },
  },
  total_spent: { type: Number, default: 0 },
  orders_count: { type: Number, default: 0 },
  last_order_id: { type: Types.ObjectId, ref: 'ShopifyOrder', required: false },
});
export const ShopifyCustomer = model<TShopifyCustomer>(
  'ShopifyCustomer',
  ShopifyCustomerSchema,
);
