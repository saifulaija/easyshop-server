import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { reviewValidations } from './review.validation';
import { reviewControllers } from './review.controller';

const router = express.Router();

router.post(
  '/create-review',

  validateRequest(reviewValidations.CreateReviewValidationSchema),
  reviewControllers.createReview,
);

router.get(
  '/',

  reviewControllers.getAllReviews,
);
router.delete(
  '/:id',

  reviewControllers.deleteReview,
);


export const reviewRoutes = router;
