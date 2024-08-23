import { Router } from 'express';

import { AuthRoutes } from '../modules/Auth/auth.route';

import { UserRoutes } from '../modules/User/user.route';

import { shopifyProductRoutes } from '../modules/shopifyProducts/shopifyProduct.route';
import { shopifyOrderRoutes } from '../modules/shopifyOrders/shopifyOrder.route';
import { shopifyCustomerRoutes } from '../modules/shopifyCustomers/shopifyCustomers.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },

  {
    path: '/auth',
    route: AuthRoutes,
  },

  {
    path: '/product',
    route: shopifyProductRoutes,
  },
  {
    path: '/order',
    route: shopifyOrderRoutes,
  },
  {
    path: '/customer',
    route: shopifyCustomerRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
