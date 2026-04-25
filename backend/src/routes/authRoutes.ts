import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware'; // Import protect middleware if needed for other routes

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate a user and return a JWT
 * @access  Public
 */
router.post('/login', loginUser);

// Example of a protected route (optional, for demonstration)
// router.get('/me', protect, (req, res) => {
//   // req.user will be available if the protect middleware passes
//   res.json({ message: 'This is a protected route', user: (req as any).user });
// });

export default router;