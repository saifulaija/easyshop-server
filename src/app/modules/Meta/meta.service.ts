import { Customer } from '../Customers/customers.model';
import { Order } from '../Orders/order.model';
import { Product } from '../Products/product.model';

const getMetaData = async () => {
  const totalCustomers = await Customer.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();

  // Aggregate total sales
  const totalSealsResult = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalSales: { $sum: '$total_price' },
      },
    },
  ]);

  // Extract total sales value, default to 0 if no result
  const totalSeals =
    totalSealsResult.length > 0 ? totalSealsResult[0].totalSales : 0;

  return {
    totalCustomers,
    totalOrders,
    totalProducts,
    totalSeals,
  };
};

export const MetaServices = {
  getMetaData,
};
