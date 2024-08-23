// src/orders/order.interface.ts

import { Types } from "mongoose";


export type TOrder = {
  customer_id: Types.ObjectId;
  product_id: Types.ObjectId;
  quantity: number;
  total_price: number;
  status: string;
};
