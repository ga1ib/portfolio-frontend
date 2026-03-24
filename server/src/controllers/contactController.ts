import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import Message from '../models/Message';

export const sendMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
      return;
    }

    const message = await Message.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Message received! I will get back to you soon.',
      data: message,
    });
  } catch (err) {
    next(err);
  }
};
