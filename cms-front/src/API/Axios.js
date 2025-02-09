import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Replace with your API base URL
  timeout: 10000, // Optional: Set a timeout
});

// Example: Fetch data
export const fetchData = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error for handling in components
  }
};

// Example: Post data
export const postData = async (endpoint, data) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error; // Re-throw the error for handling in components
  }
};

// Add more functions (PUT, DELETE, etc.) as needed
export const deleteData = async (endpoint) => {
  try {
    const response = await axiosInstance.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};

export default axiosInstance;
