import express from 'express';
import { getHospitals } from '../controllers/hospitalController.js';

const router = express.Router();

// GET endpoint to search for hospitals by location
router.get('/', getHospitals);

export default router;
