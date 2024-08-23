// src/products/product.model.ts
import { Schema, model, Types } from 'mongoose';
import { TProduct } from './shopifyProduct.interface';


const ProductSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  images: { type: String,required:true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const Product = model<TProduct>('Product', ProductSchema);
