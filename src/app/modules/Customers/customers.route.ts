import express from 'express';
import { customerControllers } from './customers.controller';


const router = express.Router();

router.post(
  '/create-customer',

  customerControllers.createCustomer,
);
router.get(
  '/',

  customerControllers.getAllCustomers
);


// router.get(
//   '/new-customers',
//   ShopifyCustomerControllers.getNewCustomersOverTime,
// );
// router.get('/customers-by-city', ShopifyCustomerControllers.getCustomersByCity);
// router.get('/ltv-by-cohorts', ShopifyCustomerControllers.getLTVByCohorts);

export const shopifyCustomerRoutes = router;
