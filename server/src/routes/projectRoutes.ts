import { Router } from 'express';
import { body } from 'express-validator';
import { 
  getProjects, 
  createProject, 
  updateProject, 
  deleteProject 
} from '../controllers/projectController';
import { protect } from '../middleware/auth';

const router = Router();

// Validation rules for project
const validateProject = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('techStack').isArray({ min: 1 }).withMessage('At least one tech stack item required'),
];

// Routes
router.get('/', getProjects);

router.post(
  '/',
  protect,
  validateProject,
  createProject
);

router.put(
  '/:id',
  protect,
  validateProject,
  updateProject
);

router.delete(
  '/:id',
  protect,
  deleteProject
);

export default router;