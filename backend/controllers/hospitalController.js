import { getHospitalsByLocation } from '../services/hospitalService.js';

export const getHospitals = async (req, res) => {
  try {
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Please provide a location query parameter.',
      });
    }

    const hospitals = await getHospitalsByLocation(location);
    res.json({ success: true, hospitals });

  } catch (error) {
    console.error('Error in getHospitals:', error.message);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};
