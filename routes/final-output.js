import express from 'express';
import getresult from '../middleware/final-output.js';
const router = express.Router();

router.post('/analyze-product', getresult);

export default router;
