import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import {
  authUser,
  registerUser,
  getUsers,
  getUserProfile,
  updateUserProfile
} from '../controllers/userControllers.js';

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/').get(getUsers);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
