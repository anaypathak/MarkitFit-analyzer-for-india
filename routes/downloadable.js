import express from 'express';
import download from '../middleware/downloadable.js';
const router = express.Router();

router.get('/download-json', download);

export default router;
