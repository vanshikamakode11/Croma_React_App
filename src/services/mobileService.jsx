import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/mobiles';

const mobileService = {
  // Get all mobiles
  getAllMobiles: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching mobiles:', error);
      throw error;
    }
  },

  // Get mobile by ID
  getMobileById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching mobile with id ${id}:`, error);
      throw error;
    }
  },

  // Create new mobile
  createMobile: async (mobileData) => {
    try {
      const response = await axios.post(API_BASE_URL, mobileData);
      return response.data;
    } catch (error) {
      console.error('Error creating mobile:', error);
      throw error;
    }
  },

  // Update mobile
  updateMobile: async (id, mobileData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, mobileData);
      return response.data;
    } catch (error) {
      console.error(`Error updating mobile with id ${id}:`, error);
      throw error;
    }
  },
// Delete mobile
  deleteMobile: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting mobile with id ${id}:`, error);
      throw error;
    }
  }
};
export default mobileService;