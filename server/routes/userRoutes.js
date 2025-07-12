import express from 'express';
import {
  getAllPublicUsers,
  getUserProfile,
  updateUserProfile
} from '../controllers/userController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllPublicUsers);                    // GET /api/users
router.get('/:id', getUserProfile);                   // GET /api/users/:id
router.put('/update/me', requireAuth, updateUserProfile); // PUT /api/users/update/me

export default router;
