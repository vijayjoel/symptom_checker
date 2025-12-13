import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const reportsDir = path.join(__dirname, '../data');
const reportsFile = path.join(reportsDir, 'reports.json');

// Ensure data directory exists
const ensureDataDir = async () => {
  try {
    await fs.mkdir(reportsDir, { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
};

// Read all reports from file
const readReports = async () => {
  try {
    await ensureDataDir();
    const data = await fs.readFile(reportsFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    console.error('Error reading reports:', error);
    return [];
  }
};

// Write reports to file
const writeReports = async (reports) => {
  try {
    await ensureDataDir();
    await fs.writeFile(reportsFile, JSON.stringify(reports, null, 2));
  } catch (error) {
    console.error('Error writing reports:', error);
  }
};

// Save a new report
export const saveReport = async (userId, userInput, riskLevel, suggestions, disclaimer) => {
  try {
    const reports = await readReports();
    
    const newReport = {
      id: Date.now().toString(),
      userId: userId || 'anonymous',
      userInput: userInput, // Changed from symptoms to userInput
      riskLevel: riskLevel,
      suggestions: suggestions,
      disclaimer: disclaimer, // Added disclaimer
      timestamp: new Date().toISOString(),
    };
    
    reports.push(newReport);
    await writeReports(reports);
    
    console.log('Report saved:', newReport.id);
    return newReport;
  } catch (error) {
    console.error('Error saving report:', error);
    throw error;
  }
};

// Get reports for a specific user
export const getUserReports = async (userId) => {
  try {
    const reports = await readReports();
    return reports.filter(report => report.userId === (userId || 'anonymous'));
  } catch (error) {
    console.error('Error getting user reports:', error);
    return [];
  }
};

// Get a specific report by ID
export const getReportById = async (reportId) => {
  try {
    const reports = await readReports();
    return reports.find(report => report.id === reportId);
  } catch (error) {
    console.error('Error getting report:', error);
    return null;
  }
};

// Delete a report
export const deleteReport = async (reportId) => {
  try {
    const reports = await readReports();
    const filteredReports = reports.filter(report => report.id !== reportId);
    await writeReports(filteredReports);
    console.log('Report deleted:', reportId);
    return true;
  } catch (error) {
    console.error('Error deleting report:', error);
    return false;
  }
};
