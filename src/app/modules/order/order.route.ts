import express from 'express';


import { orderController } from './order.controller';


const router = express.Router();

router.get('/success-order/:id', orderController.getSingleOrderByOrderNumber);

router.post(
  '/create-order',
  orderController.createOrder,
);
router.get('/', orderController.getAllOrders);
router.get('/successful-orders', orderController.successfulDelivery);
router.patch('/update-delivery/:id', orderController.updateOrder);
// router.put(
//   '/product/:productId',
//   validateRequest(ProductValidation.updateProductValidation),
//   ProductController.updateProduct,
// );
// router.get('/show-orders/', orderController.getSingleOrder);
//for stripe

router.post('/create-checkout-session')
router.get('/get-single-order/:id', orderController.getSingleOrder);
router.get('/get-my-orders/:email', orderController.getMyOrders);
// router.delete('/product/:productId', ProductController.deleteProduct);

export const orderRoute = router;
