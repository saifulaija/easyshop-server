import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from '../Products/product.model';
import { TCustomer } from './customers.interface';
import { Customer } from './customers.model';
import { PipelineStage } from 'mongoose';

const createCustomer = async (payload: TCustomer) => {
  const isExistUser = await Customer.findOne({ email: payload.email });
  if (isExistUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email already registered');
  }
  const result = await Customer.create(payload);
  return result;
};
const getAllCustomers = async () => {
  const result = await Customer.find();
  return result;
};

// const aggregateNewCustomers = async (interval: string) => {
//   const groupBy = {
//     daily: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
//     monthly: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
//     quarterly: {
//       $concat: [
//         { $substr: ['$createdAt', 0, 4] },
//         '-',
//         { $toString: { $divide: [{ $month: '$createdAt' }, 4] } },
//       ],
//     },
//     yearly: { $dateToString: { format: '%Y', date: '$createdAt' } },
//   };

//   return ShopifyCustomer.aggregate([
//     {
//       $group: {
//         _id: groupBy[interval],
//         newCustomers: { $sum: 1 },
//       },
//     },
//     { $sort: { _id: 1 } },
//   ]);
// };

// const aggregateCustomersByCity = async () => {
//   return ShopifyCustomer.aggregate([
//     {
//       $group: {
//         _id: '$default_address.city',
//         customerCount: { $sum: 1 },
//       },
//     },
//     { $sort: { customerCount: -1 } },
//   ]);
// };
// const aggregateLTVByCohorts = async () => {
//   return ShopifyCustomer.aggregate([
//     {
//       $lookup: {
//         from: 'shopifyOrders',
//         localField: '_id',
//         foreignField: 'customer_id',
//         as: 'orders',
//       },
//     },
//     {
//       $unwind: '$orders',
//     },
//     {
//       $group: {
//         _id: { $dateToString: { format: '%Y-%m', date: '$orders.createdAt' } },
//         cohortValue: { $sum: '$orders.total_price' },
//         customerCount: { $sum: 1 },
//       },
//     },
//     {
//       $project: {
//         _id: 1,
//         LTV: { $divide: ['$cohortValue', '$customerCount'] },
//       },
//     },
//     { $sort: { _id: 1 } },
//   ]);
// };


 const trackNewCustomersOverTime = async (interval: string) => {
   const groupStage: PipelineStage = {
     $group: {
       _id: null,
       newCustomers: { $sum: 1 },
     },
   };

   switch (interval) {
     case 'daily':
       groupStage.$group._id = {
         day: { $dayOfMonth: '$createdAt' },
         month: { $month: '$createdAt' },
         year: { $year: '$createdAt' },
       };
       break;
     case 'monthly':
       groupStage.$group._id = {
         month: { $month: '$createdAt' },
         year: { $year: '$createdAt' },
       };
       break;
     case 'quarterly':
       groupStage.$group._id = {
         quarter: { $ceil: { $divide: [{ $month: '$createdAt' }, 3] } },
         year: { $year: '$createdAt' },
       };
       break;
     case 'yearly':
       groupStage.$group._id = { year: { $year: '$createdAt' } };
       break;
     default:
       throw new Error('Invalid interval');
   }

   const newCustomersData = await Customer.aggregate([
     { $group: groupStage.$group },
     {
       $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1, '_id.quarter': 1 },
     }, // Adjust sorting based on the interval
   ]);

   return newCustomersData;
 };

export const customerServices = {
  createCustomer,
  getAllCustomers,
  trackNewCustomersOverTime,
  // aggregateNewCustomers,
  // aggregateCustomersByCity,
  // aggregateLTVByCohorts,
};
