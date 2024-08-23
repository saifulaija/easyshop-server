// src/orders/order.route.ts
import express from 'express';
import { OrderControllers } from './order.controller';


const router = express.Router();

router.post('/create-order', OrderControllers.createOrder);
router.get('/sales-measurement', OrderControllers.salesMeasurement);
router.get('/', OrderControllers.getAllOrders);
router.get('/:id', OrderControllers.getOrderById);
router.put('/:id', OrderControllers.updateOrder);
router.delete('/:id', OrderControllers.deleteOrder);


// router.get('/repeat-customers', OrderControllers.getRepeatCustomersOverTime);


export const OrderRoutes = router;
