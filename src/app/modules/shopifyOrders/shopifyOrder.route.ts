// src/orders/order.route.ts
import express from 'express';
import { OrderControllers } from './shopifyOrder.controller';


const router = express.Router();

router.post('/create', OrderControllers.createOrder);
router.get('/', OrderControllers.getAllOrders);
router.get('/:id', OrderControllers.getOrderById);
router.put('/:id', OrderControllers.updateOrder);
router.delete('/:id', OrderControllers.deleteOrder);

router.get('/sales-growth-rate', OrderControllers.getSalesGrowthRate);
router.get('/repeat-customers', OrderControllers.getRepeatCustomersOverTime);

export const shopifyOrderRoutes = router;
