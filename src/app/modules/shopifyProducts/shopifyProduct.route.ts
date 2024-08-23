// src/products/product.route.ts
import express from 'express';
import { ProductControllers } from './shopifyProduct.controller';


const router = express.Router();

router.post('/create', ProductControllers.createProduct);
router.get('/', ProductControllers.getAllProducts);
router.get('/:id', ProductControllers.getProductById);
router.put('/:id', ProductControllers.updateProduct);
router.delete('/:id', ProductControllers.deleteProduct);

export const productRoutes = router;
