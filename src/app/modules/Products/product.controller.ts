// src/products/product.controller.ts
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductServices } from './product.service';
const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProduct(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProducts();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products fetched successfully',
    data: result,
  });
});

const getProductById = catchAsync(async (req, res) => {
  const result = await ProductServices.getProductById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product fetched successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.updateProduct(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const result=await ProductServices.deleteProduct(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: 'Product deleted successfully',
    data:result
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
