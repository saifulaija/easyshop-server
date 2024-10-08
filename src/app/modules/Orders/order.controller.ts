
// src/orders/order.controller.ts
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderServices } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.createOrder(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllOrders();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders fetched successfully',
    data: result,
  });
});

const getOrderById = catchAsync(async (req, res) => {
  const result = await OrderServices.getOrderById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order fetched successfully',
    data: result,
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.updateOrder(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order updated successfully',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.deleteOrder(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: 'Order deleted successfully',
    data: result,
  });
});


const salesMeasurement = catchAsync(async (req, res) => {
  const interval = req.query.interval as string;
  console.log('Received Interval:==========================', interval); // Debugging

  const result = await OrderServices.salesMeasurement(interval);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales growth rate data fetched successfully',
    data: result,
  });
});


const getSalesGrowthRate = catchAsync(async (req, res) => {
  const interval = req.query.interval as string;

  console.log(
    'Received Interval for Growth Rate:==========================',
    interval,
  ); // Debugging

  const result = await OrderServices.salesGrowthRate(interval);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales growth rate data fetched successfully',
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
salesMeasurement,
getSalesGrowthRate
  // getRepeatCustomersOverTime
};
