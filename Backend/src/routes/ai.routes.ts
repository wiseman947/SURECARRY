import { Router } from 'express';
import { calculatePricing, fetchOptimalRoute } from '../controllers/ai.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/pricing', authenticate, calculatePricing);
router.post('/route', authenticate, fetchOptimalRoute);

export default router;
