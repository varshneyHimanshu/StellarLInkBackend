import express from 'express';
import { getAdData } from '../controllers/AdController.js'
const router = express.Router();

router.get('/:id', getAdData);

export default router;