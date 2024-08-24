import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { customerServices } from './customers.service';



const createCustomer = catchAsync(async (req, res) => {
  const result = await customerServices.createCustomer(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ShopifyCustomer is created successfully',
    data: result,
  });
});

const getAllCustomers = catchAsync(async (req, res) => {
  const result = await customerServices.getAllCustomers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customers are fetched successfully',
    data: result,
  });
});
const getNewCustomersOverTime = catchAsync(async (req, res) => {
  const interval=req.query.interval as string
  const result = await customerServices.trackNewCustomersOverTime(interval);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New customers added over time fetched successfully',
    data: result,
  });
});
const getRepeatCustomersOverTime = catchAsync(async (req, res) => {
  const interval = req.query.interval as string;
  const result = await customerServices.trackRepeatCustomersOverTime(interval);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New customers added over time fetched successfully',
    data: result,
  });
});


export const customerControllers = {
  createCustomer,
  getAllCustomers,
  getNewCustomersOverTime,
  getRepeatCustomersOverTime,
  // getCustomersByCity,
  // getNewCustomersOverTime,
  // getLTVByCohorts
};
