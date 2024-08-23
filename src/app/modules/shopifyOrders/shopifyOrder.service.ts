// src/orders/order.service.ts

import { TOrder } from "./shopifyOrder.interface";
import { Order } from "./shopifyOrder.model";


const createOrder = async (payload: TOrder) => {
  const order = new Order(payload);
  return await order.save();
};

const getAllOrders = async () => {
  return await Order.find().populate('customer_id').populate('product_id');
};

const getOrderById = async (id: string) => {
  return await Order.findById(id)
    .populate('customer_id')
    .populate('product_id');
};

const updateOrder = async (id: string, payload: Partial<TOrder>) => {
  return await Order.findByIdAndUpdate(id, payload, { new: true });
};

const deleteOrder = async (id: string) => {
  await Order.findByIdAndDelete(id);
};

export const OrderServices = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
