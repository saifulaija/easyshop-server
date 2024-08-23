import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ShopifyCustomerServices } from './shopifyCustomers.service';


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


export const ShopifyCustomerControllers = {
  createShopifyCustomer,
  getAllShopifyCustomers,
 
};
