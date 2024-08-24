// src/products/product.service.ts

import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProduct = async (payload: TProduct) => {
  const product = new Product(payload);
  return await product.save();
};

const getAllProducts = async () => {
  return await Product.find();
};

const getProductById = async (id: string) => {
  return await Product.findById(id);
};

const updateProduct = async (id: string, payload: Partial<TProduct>) => {
  return await Product.findByIdAndUpdate(id, payload, { new: true });
};

const deleteProduct = async (id: string) => {
  await Product.findByIdAndDelete(id);
};

export const ProductServices = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
