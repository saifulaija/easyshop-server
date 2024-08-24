// src/orders/order.service.ts

import { Customer } from '../Customers/customers.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';
const createOrder = async (payload: TOrder) => {
  // Create a new order
  const order = new Order(payload);
  const resultOrder = await order.save();

  if (resultOrder) {
    // Find the customer document
    const customer = await Customer.findById(payload.customer_id);

    if (customer) {
      // Update customer details
      customer.last_order_id = resultOrder._id;
      customer.total_spent += payload.total_price;

      // Ensure orders array is initialized
      if (!customer.orders) {
        customer.orders = [];
      }

      // Push the new order into the orders array
      customer.orders.push({ orderID: resultOrder._id });

      // Update orders_count
      customer.orders_count = customer.orders.length;

      // Save the updated customer document
      await customer.save();
    } else {
      throw new Error('Customer not found');
    }
  }

  return resultOrder;
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

const salesMeasurement = async (interval: string) => {
  const matchStage = {}; // Define any matching criteria if needed

  const groupStage: any = {
    _id: null,
    totalSales: { $sum: '$total_price' }, // Assuming 'total_price' is the field storing the sales value
  };

  switch (interval) {
    case 'daily':
      groupStage._id = {
        day: { $dayOfMonth: '$createdAt' },
        month: { $month: '$createdAt' },
        year: { $year: '$createdAt' },
      };
      break;
    case 'monthly':
      groupStage._id = {
        month: { $month: '$createdAt' },
        year: { $year: '$createdAt' },
      };
      break;
    case 'quarterly':
      groupStage._id = {
        quarter: {
          $ceil: { $divide: [{ $month: '$createdAt' }, 3] },
        },
        year: { $year: '$createdAt' },
      };
      break;
    case 'yearly':
      groupStage._id = { year: { $year: '$createdAt' } };
      break;
    default:
      throw new Error('Invalid interval');
  }

  const salesData = await Order.aggregate([
    { $match: matchStage },
    { $group: groupStage },
    {
      $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1, '_id.quarter': 1 },
    }, // Adjust sorting based on the interval
  ]);

  return salesData;
};





export const salesGrowthRate = async (interval: string) => {
  const matchStage = {}; // Define any matching criteria if needed

  const groupStage: any = {
    _id: null,
    totalSales: { $sum: '$total_price' },
  };

  switch (interval) {
    case 'daily':
      groupStage._id = {
        day: { $dayOfMonth: '$createdAt' },
        month: { $month: '$createdAt' },
        year: { $year: '$createdAt' },
      };
      break;
    case 'monthly':
      groupStage._id = {
        month: { $month: '$createdAt' },
        year: { $year: '$createdAt' },
      };
      break;
    case 'quarterly':
      groupStage._id = {
        quarter: {
          $ceil: { $divide: [{ $month: '$createdAt' }, 3] },
        },
        year: { $year: '$createdAt' },
      };
      break;
    case 'yearly':
      groupStage._id = { year: { $year: '$createdAt' } };
      break;
    default:
      throw new Error('Invalid interval');
  }

  // Fetch the sales data for the last two periods
  const salesData = await Order.aggregate([
    { $match: matchStage },
    { $group: groupStage },
    { $sort: { '_id.year': -1, '_id.month': -1, '_id.day': -1, '_id.quarter': -1 } }, // Adjust sorting based on the interval
    { $limit: 2 }, // Get the last two periods
  ]);

  if (salesData.length < 2) {
    throw new Error('Not enough data to calculate growth rate');
  }

  const [currentPeriod, previousPeriod] = salesData;

  const growthRate = Math.round((currentPeriod.totalSales - previousPeriod.totalSales) / previousPeriod.totalSales) * 100;

  return {
    interval,
    currentPeriod: currentPeriod._id,
    previousPeriod: previousPeriod._id,
    growthRate,
  };
};


export const OrderServices = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  salesGrowthRate,

  salesMeasurement,
};
