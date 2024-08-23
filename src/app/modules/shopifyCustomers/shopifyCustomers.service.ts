

import { Product } from '../shopifyProducts/shopifyProduct.model';
import { TShopifyCustomer } from './shopifyCustomers.interface';
import { ShopifyCustomer } from './shopifyCustomers.model';


const createShopifyCustomer = async (payload: TShopifyCustomer) => {
  try {
    const productId = payload.email;

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




export const ShopifyCustomerServices = {
  createShopifyCustomer,
  getAllShopifyCustomers,

};
