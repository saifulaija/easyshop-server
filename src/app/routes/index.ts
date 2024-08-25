import { Router } from 'express';

import { OrderRoutes } from '../modules/Orders/order.route';
import { CustomerRoutes } from '../modules/Customers/customers.route';
import { ProductRoutes } from '../modules/Products/product.route';
import { MetaRoutes } from '../modules/Meta/meta.route';

const router = Router();

const moduleRoutes = [
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
  {
    path: '/meta',
    route: MetaRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
