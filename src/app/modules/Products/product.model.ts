// src/products/product.model.ts
import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';

const ProductSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    totalSeals:{type:Number,default:0},
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    images: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Product = model<TProduct>('Product', ProductSchema);
