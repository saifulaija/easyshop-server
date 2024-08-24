// src/products/product.interface.ts


export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  totalSeals?:number;
  images: string;
  created_at: Date;
  updated_at?: Date;
};
