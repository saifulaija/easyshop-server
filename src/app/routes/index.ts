import { Router } from 'express';

import { AuthRoutes } from '../modules/Auth/auth.route';

import { UserRoutes } from '../modules/User/user.route';




import { OrderRoutes } from '../modules/Orders/order.route';
import { CustomerRoutes } from '../modules/Customers/customers.route';
import { ProductRoutes } from '../modules/Products/product.route';

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
    route: ProductRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
  {
    path: '/customer',
    route: CustomerRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
