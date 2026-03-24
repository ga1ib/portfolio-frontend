import { Router } from 'express';
import { body } from 'express-validator';
import { getProjects, createProject, deleteProject } from '../controllers/projectController';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/', getProjects);

router.post(
  '/',
  protect,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('techStack').isArray({ min: 1 }).withMessage('At least one tech stack item required'),
  ],
  createProject
);

router.delete('/:id', protect, deleteProject);

export default router;
