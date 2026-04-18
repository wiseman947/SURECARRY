import { Router } from 'express';
import { sendMessage, getActiveChats, getChatMessages, adminReply } from '../controllers/chat.controller';

const router = Router();

router.post('/message', sendMessage);
router.get('/active', getActiveChats);
router.get('/:id/messages', getChatMessages);
router.post('/:id/admin-reply', adminReply);

export default router;
