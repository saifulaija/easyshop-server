import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from '../products/product.model';
import { TShopifyCustomer } from './shopifyCustomers.interface';
import { ShopifyCustomer } from './shopifyCustomers.model';


const createShopifyCustomer = async (payload: TShopifyCustomer) => {
  try {
    const productId = payload.productId;

    // Create the ShopifyCustomer
    const createdShopifyCustomer = await ShopifyCustomer.create(payload);

    // Extract the _id of the created ShopifyCustomer
    const ShopifyCustomerId = createdShopifyCustomer._id;

    // Update the product with the _id of the created ShopifyCustomer
    await Product.updateOne(
      { _id: productId },
      {
        $push: { ShopifyCustomers: { ShopifyCustomerId: ShopifyCustomerId.toString() } },
      },
    );

    return createdShopifyCustomer;
  } catch (error) {
    console.error('Error creating ShopifyCustomer:', error);
    throw error;
  }
};

const getAllShopifyCustomers = async () => {
  const result = await ShopifyCustomer.find();
  return result;
};


const deleteShopifyCustomer = async (id: string) => {
  // Find the ShopifyCustomer
  const shopifyCustomer = await ShopifyCustomer.findById(id);

  if (!ShopifyCustomer) {
    throw new AppError(httpStatus.NOT_FOUND, 'ShopifyCustomer not found');
  }

  // Find the associated product
  const product = await Product.findById(ShopifyCustomer.productId);

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'ShopifyCustomer not found');
  }

  // Find the index of the ShopifyCustomer in the product's ShopifyCustomers array
  const ShopifyCustomerIndex = product?.ShopifyCustomers?.findIndex(
    (item) => item.ShopifyCustomerId.toString() === id,
  );

  if (ShopifyCustomerIndex === -1) {
    throw new AppError(httpStatus.NOT_FOUND, 'ShopifyCustomer not found in product');
  }

  // Remove the ShopifyCustomer from the product's ShopifyCustomers array
  if (product.ShopifyCustomers) {
    product.ShopifyCustomers.splice(ShopifyCustomerIndex as number, 1);
  }

  // Save the product
  await product.save();

  // Delete the ShopifyCustomer document
  const result = await ShopifyCustomer.findByIdAndDelete(id);

  return result;
};

export const ShopifyCustomerServices = {
  createShopifyCustomer,
  getAllShopifyCustomers,
  deleteShopifyCustomer,
};
