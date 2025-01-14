const FASTAPI_BASE_URL = 'http://localhost:8000'; // Update this with your FastAPI server URL

export const fastApiService = {
  async healthCheck() {
    try {
      const response = await fetch(`${FASTAPI_BASE_URL}/`);
      if (!response.ok) throw new Error('FastAPI server not responding');
      return await response.json();
    } catch (error) {
      console.error('FastAPI Health Check Failed:', error);
      throw error;
    }
  },

  // Add more API methods here as needed
  async fetchGeoData() {
    try {
      const response = await fetch(`${FASTAPI_BASE_URL}/geo-data`);
      if (!response.ok) throw new Error('Failed to fetch geo data');
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch geo data:', error);
      throw error;
    }
  }
};