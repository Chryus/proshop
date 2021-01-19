import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { authUser, getUserProfile } from '../controllers/userControllers.js';

router.route('/login').get(authUser);
router.route('/profile').get(protect, getUserProfile);

export default router;
