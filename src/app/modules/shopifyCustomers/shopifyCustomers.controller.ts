import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ShopifyCustomerServices } from './ShopifyCustomer.service';

const createShopifyCustomer = catchAsync(async (req, res) => {
  const result = await ShopifyCustomerServices.createShopifyCustomer(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ShopifyCustomer is created successfully',
    data: result,
  });
});
const getAllShopifyCustomers = catchAsync(async (req, res) => {
  const result = await ShopifyCustomerServices.getAllShopifyCustomers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ShopifyCustomers are fatched successfully',
    data: result,
  });
});
const deleteShopifyCustomer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ShopifyCustomerServices.deleteShopifyCustomer(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ShopifyCustomer deleted successfully',
    data: result,
  });
});

export const ShopifyCustomerControllers = {
  createShopifyCustomer,
  getAllShopifyCustomers,
  deleteShopifyCustomer,
};
