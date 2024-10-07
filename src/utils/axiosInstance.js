// frontend/src/utils/axiosInstance.js

import axios from 'axios';

/**
 * Axios instance configured with base URL and interceptors.
 */
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Adjust if your backend runs on a different port
  timeout: 10000, // Set a timeout as needed
});

// Add interceptors for authentication
axiosInstance.interceptors.request.use(
  (config) => {
    // Include JWT token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
