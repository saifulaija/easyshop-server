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

export const CustomerRoutes = router;
