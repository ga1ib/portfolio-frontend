import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import Message from '../models/Message';
import { protect } from '../middleware/auth';

const router = Router();

// POST /api/messages — store a contact message (public)
router.post(
  '/',
  [
    body('name').notEmpty().trim().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('message').isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
  ],
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ success: false, errors: errors.array() });
        return;
      }
      const saved = await Message.create(req.body);
      res.status(201).json({ success: true, data: saved });
    } catch (err) {
      next(err);
    }
  }
);

// GET /api/messages — fetch all messages (admin only)
router.get(
  '/',
  protect,
  async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const messages = await Message.find().sort({ createdAt: -1 });
      res.json({ success: true, data: messages });
    } catch (err) {
      next(err);
    }
  }
);

export default router;