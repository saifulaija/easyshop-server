
// types/shopifyCustomers.ts
import {  Types } from 'mongoose';
export type TOrder = {
  orderID: Types.ObjectId;
};
export interface TCustomerAddress {
  district?: string;
  thana?: string;
  city: string;
  country: string;
  postal_code?: string;
}

export type TCustomer = {
  email: string;
  name: string;
  phone?: string;
  default_address: TCustomerAddress;
  total_spent: number;
  orders_count: number;
  orders?:TOrder[]
  last_order_id?: Types.ObjectId;
}
