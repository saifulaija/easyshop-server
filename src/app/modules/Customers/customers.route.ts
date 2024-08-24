import express from 'express';
import { customerControllers } from './customers.controller';

const router = express.Router();

router.post(
  '/create-customer',

  customerControllers.createCustomer,
);
router.get(
  '/',

  customerControllers.getAllCustomers,
);

router.get(
  '/new-customers-over-time',
  customerControllers.getNewCustomersOverTime,
);
router.get('/repeat-customers-over-time', customerControllers.getRepeatCustomersOverTime);
router.get(
  '/geographical-distribution',
 customerControllers.getGeographicalDistributionOfCustomers,
);

router.get(
  '/lifetime-value-cohorts',
  customerControllers.getCustomerLifetimeValueByCohorts,
);


export const CustomerRoutes = router;
