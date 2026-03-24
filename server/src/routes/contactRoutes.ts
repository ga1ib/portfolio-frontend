import { Router } from 'express';
import { body } from 'express-validator';
import { sendMessage } from '../controllers/contactController';

const router = Router();

router.post(
  '/',
  [
    body('name').notEmpty().trim().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('message').isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
  ],
  sendMessage
);

export default router;
