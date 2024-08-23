import { Types } from 'mongoose';

export type TShopifyCustomer = {
  email: string;
  name: string;
  phone?: string;
  created_at: Date;
  default_address: {
    district?: string;
    thana?: string;
    city: string;
    country: string;
    postal_code?: string;
  };
  total_spent: number;
  orders_count: number;
  last_order_id?: Types.ObjectId;
};
