import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { getUserProfile, updateUserProfile } from '../controllers/user.controller';

const router = express.Router();

// Protected routes
router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, updateUserProfile);

export default router; 