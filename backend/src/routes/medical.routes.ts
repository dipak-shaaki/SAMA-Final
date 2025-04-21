import express from 'express';
import { getMedicalRecords, updateMedicalRecords } from '../controllers/medical.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();

// Get user's medical records
router.get('/records', authenticateToken, getMedicalRecords);

// Update user's medical records
router.put('/records', authenticateToken, updateMedicalRecords);

export default router; 