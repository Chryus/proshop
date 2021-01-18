import express from 'express';
const router = express.Router();
import { authUser } from '../controllers/userControllers.js';

router.route('/login').get(authUser);

export default router;
