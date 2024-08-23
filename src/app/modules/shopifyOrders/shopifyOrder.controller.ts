// src/orders/order.controller.ts
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderServices } from './shopifyOrder.service';


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
  const result  =await OrderServices.deleteOrder(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: 'Order deleted successfully',
    data:result
  });
});

const getSalesOverTime = catchAsync(async (req, res) => {
  const { interval } = req.query; // Expecting interval as a query parameter
  const validIntervals = ['daily', 'monthly', 'quarterly', 'yearly'];

  if (!validIntervals.includes(interval as string)) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message:
        'Invalid interval. Valid options are daily, monthly, quarterly, yearly.',
        data:null
    });
  }

  const result = await OrderServices.aggregateSales(interval as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales data fetched successfully',
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getSalesOverTime,
};
