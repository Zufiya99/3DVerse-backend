import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerAdmin); // Register new admin (exam cell staff)
router.post('/login', loginAdmin); // Admin login

export default router;
