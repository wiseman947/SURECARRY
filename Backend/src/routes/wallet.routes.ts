import { Router } from 'express';
import { getWallet, fundWallet } from '../controllers/wallet.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticate, getWallet);
router.post('/fund', authenticate, fundWallet);

export default router;
