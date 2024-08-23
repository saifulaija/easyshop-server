// Assuming you're using a model named Order

import { Order } from '../modules/Orders/order.model';

// Utility function to aggregate sales data
export const aggregateSales = async (interval: string) => {
  // Example aggregation based on the interval (e.g., daily, weekly, monthly)
  const matchStage = {}; // Define any matching criteria if needed

  const groupStage = {
    _id: null as any,
    totalSales: { $sum: '$amount' }, // Assuming 'amount' is the field storing the sales value
  };

  switch (interval) {
    case 'daily':
      groupStage._id = {
        day: { $dayOfMonth: '$createdAt' },
        month: { $month: '$createdAt' },
        year: { $year: '$createdAt' },
      };
      break;
    case 'weekly':
      groupStage._id = {
        week: { $week: '$createdAt' },
        year: { $year: '$createdAt' },
      };
      break;
    case 'monthly':
      groupStage._id = {
        month: { $month: '$createdAt' },
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
    { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }, // Adjust sorting based on the interval
  ]);

  return salesData;
};
