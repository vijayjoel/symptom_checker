import { getGroqSuggestions } from '../services/llmService.js';
import { formatResponse } from '../utils/formatResponse.js';
import { saveReport, getUserReports, getReportById, deleteReport } from '../services/reportService.js';

export const getSuggestions = async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    const { symptoms, freeText, userId } = req.body;

    // Validate input
    if (!symptoms && !freeText) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Please provide either symptoms or freeText',
      });
    }

    // Combine symptoms and free text
    const userInput = [symptoms, freeText].filter(Boolean).join(' ');
    console.log('User input:', userInput);

    // Get suggestions from LLM
    const llmResponse = await getGroqSuggestions(userInput);

    // Extract risk level, suggestions, and disclaimer from LLM response
    const riskLevel = llmResponse.riskLevel || 'Medium';
    const suggestions = llmResponse.suggestions || formatResponse(JSON.stringify(llmResponse));
    const disclaimer = llmResponse.disclaimer || 'Please consult a healthcare professional.';

    // Save the report
    await saveReport(userId, userInput, riskLevel, suggestions, disclaimer);

    res.json({
      success: true,
      riskLevel: riskLevel,
      suggestions: suggestions,
      disclaimer: disclaimer,
      userInput: userInput,
    });
  } catch (error) {
    console.error('Error in getSuggestions:', error.message);
    console.error('Full error:', error);
    res.status(500).json({
      error: 'Error processing symptoms',
      message: error.message,
    });
  }
};

// Get user's report history
export const getUserReportHistory = async (req, res) => {
  try {
    const userId = req.query.userId || 'anonymous';
    console.log('Fetching reports for user:', userId);

    const reports = await getUserReports(userId);

    res.json({
      success: true,
      reports: reports,
    });
  } catch (error) {
    console.error('Error fetching reports:', error.message);
    res.status(500).json({
      error: 'Error fetching reports',
      message: error.message,
    });
  }
};

// Get a specific report
export const getReport = async (req, res) => {
  try {
    const reportId = req.params.reportId;
    console.log('Fetching report:', reportId);

    const report = await getReportById(reportId);

    if (!report) {
      return res.status(404).json({
        error: 'Report not found',
      });
    }

    res.json({
      success: true,
      report: report,
    });
  } catch (error) {
    console.error('Error fetching report:', error.message);
    res.status(500).json({
      error: 'Error fetching report',
      message: error.message,
    });
  }
};

// Delete a report
export const deleteUserReport = async (req, res) => {
  try {
    const reportId = req.params.reportId;
    console.log('Deleting report:', reportId);

    const success = await deleteReport(reportId);

    if (!success) {
      return res.status(500).json({
        error: 'Failed to delete report',
      });
    }

    res.json({
      success: true,
      message: 'Report deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting report:', error.message);
    res.status(500).json({
      error: 'Error deleting report',
      message: error.message,
    });
  }
};
