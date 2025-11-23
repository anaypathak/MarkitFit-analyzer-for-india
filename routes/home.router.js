import express from 'express';
import homeserver from '../middleware/home.router.js';
const router = express.Router();

router.get('/', homeserver);

export default router;
