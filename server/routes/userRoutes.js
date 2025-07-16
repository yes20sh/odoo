import express from 'express';
import { updateUserProfile, getUserProfile } from '../controllers/userController.js';

const router = express.Router();

router.get('/:id', getUserProfile);               // Get user profile
router.patch('/:id/profile', updateUserProfile);  // Update user profile

export default router;
