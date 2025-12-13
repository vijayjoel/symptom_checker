import express from 'express';
import { getSuggestions, getUserReportHistory, getReport, deleteUserReport } from '../controllers/suggestionsController.js';

const router = express.Router();

// POST endpoint to get suggestions based on symptoms and save report
router.post('/', getSuggestions);

// GET user's report history - MUST BE BEFORE /:reportId
router.get('/history', getUserReportHistory);

// GET a specific report by ID
router.get('/:reportId', getReport);

// DELETE a report
router.delete('/:reportId', deleteUserReport);

export default router;
