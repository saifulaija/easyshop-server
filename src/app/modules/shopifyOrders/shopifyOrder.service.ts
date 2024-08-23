// src/orders/order.service.ts

import { aggregateSales } from "../../utils/aggregatesales";
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


const calculateSalesGrowth = async (interval: string) => {
  const salesData = await aggregateSales(interval);

  let previousSales: number | null = null;
  return salesData.map(({ _id, totalSales }) => {
    const growthRate =
      previousSales !== null
        ? ((totalSales - previousSales) / previousSales) * 100
        : 0;
    previousSales = totalSales;
    return { _id, totalSales, growthRate };
  });
};


const aggregateRepeatCustomers = async (interval: string) => {
  const groupBy = {
    daily: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
    monthly: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
    quarterly: {
      $concat: [
        { $substr: ['$createdAt', 0, 4] },
        '-',
        { $toString: { $divide: [{ $month: '$createdAt' }, 4] } },
      ],
    },
    yearly: { $dateToString: { format: '%Y', date: '$createdAt' } },
  };

  return Order.aggregate([
    {
      $group: {
        _id: '$customer_id',
        orders: { $sum: 1 },
        firstOrderDate: { $first: '$createdAt' },
      },
    },
    {
      $match: { orders: { $gt: 1 } },
    },
    {
      $group: {
        _id: groupBy[interval],
        repeatCustomers: { $sum: 1 },
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
  calculateSalesGrowth,
  aggregateRepeatCustomers
};
