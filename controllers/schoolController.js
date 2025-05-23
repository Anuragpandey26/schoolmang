import School from '../models/School.js';

// Haversine formula to calculate distance between two coordinates
const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in kilometers

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || latitude === undefined || longitude === undefined) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    return res.status(400).json({ success: false, message: 'Latitude and longitude must be numbers' });
  }

  try {
    const school = await School.create({ name, address, latitude, longitude });
    res.status(201).json({ success: true, message: 'School added successfully', school });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ success: false, message: 'Latitude and longitude are required' });
  }

  const userLat = parseFloat(latitude);
  const userLon = parseFloat(longitude);

  if (isNaN(userLat) || isNaN(userLon)) {
    return res.status(400).json({ success: false, message: 'Invalid latitude or longitude' });
  }

  try {
    const schools = await School.findAll();
    const sortedSchools = schools
      .map((school) => ({
        ...school.toJSON(),
        distance: getDistance(userLat, userLon, school.latitude, school.longitude),
      }))
      .sort((a, b) => a.distance - b.distance);

    res.status(200).json({ success: true, schools: sortedSchools });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteSchool = async (req, res) => {
  const { id } = req.params;

  try {
    const school = await School.findByPk(id);
    if (!school) {
      return res.status(404).json({ success: false, message: 'School not found' });
    }

    await school.destroy();
    res.status(200).json({ success: true, message: 'School deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addSchool, listSchools, deleteSchool };