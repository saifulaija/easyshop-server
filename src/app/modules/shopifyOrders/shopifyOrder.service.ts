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


const aggregateSales = async (interval: string) => {
  const groupBy = {
    daily: { $dateToString: { format: '%Y-%m-%d', date: '$created_at' } },
    monthly: { $dateToString: { format: '%Y-%m', date: '$created_at' } },
    quarterly: {
      $concat: [
        { $substr: ['$created_at', 0, 4] },
        '-',
        { $toString: { $divide: [{ $month: '$created_at' }, 4] } },
      ],
    },
    yearly: { $dateToString: { format: '%Y', date: '$created_at' } },
  };

  return Order.aggregate([
    {
      $group: {
        _id: groupBy[interval],
        totalSales: { $sum: '$total_price' },
      },
    },
    { $sort: { _id: 1 } },
  ]);
};

export const OrderServices = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  aggregateSales
};
