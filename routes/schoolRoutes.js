import express from 'express';
import { addSchool, listSchools, deleteSchool } from '../controllers/schoolController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/addSchool', authMiddleware, addSchool);
router.get('/listSchools', authMiddleware, listSchools);
router.delete('/deleteSchool/:id', authMiddleware, deleteSchool);

export default router;