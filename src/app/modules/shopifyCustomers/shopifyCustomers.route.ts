import express from 'express';
import { ShopifyCustomerControllers } from './shopifyCustomers.controller';

const router = express.Router();

router.post(
  '/create-review',


ShopifyCustomerControllers.createShopifyCustomer,
);



export const shopifyCustomerRoutes = router;
