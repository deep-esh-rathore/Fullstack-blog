// routes/auth.js
import express from 'express';
import { register, login, logout,getUser } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();


// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/logout
router.post('/logout', logout);

router.get('/me', getUser);

export default router;