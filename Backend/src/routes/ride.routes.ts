import { Router } from 'express';
import { requestRide, getRides, acceptRide } from '../controllers/ride.controller';
import { authenticate, requireRole } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, requireRole(['USER']), requestRide);
router.get('/', authenticate, getRides);
router.put('/:id/accept', authenticate, requireRole(['DRIVER']), acceptRide);

export default router;
