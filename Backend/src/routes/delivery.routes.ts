import { Router } from 'express';
import { createDelivery, getDeliveries, acceptDelivery } from '../controllers/delivery.controller';
import { authenticate, requireRole } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, requireRole(['USER']), createDelivery);
router.get('/', authenticate, getDeliveries);
router.put('/:id/accept', authenticate, requireRole(['DRIVER']), acceptDelivery);

export default router;
