// src/products/product.route.ts
import express from 'express';
import { MetaController } from './meta.controller';



const router = express.Router();


router.get('/', MetaController.getMetaData);


export const MetaRoutes = router;
