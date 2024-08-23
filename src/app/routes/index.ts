import { Router } from 'express';

import { AuthRoutes } from '../modules/Auth/auth.route';

import { UserRoutes } from '../modules/User/user.route';

import { shopifyProductRoutes } from '../modules/shopifyProducts/shopifyProduct.route';

import { shopifyCustomerRoutes } from '../modules/Customers/customers.route';
import { OrderRoutes } from '../modules/Orders/order.route';

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
    route: OrderRoutes,
  },
  {
    path: '/customer',
    route: shopifyCustomerRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
