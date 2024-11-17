import axios from 'axios';

// Create an Axios instance with a custom timeout
const axiosInstance = axios.create({
  baseURL: 'https://ir-ai-short-vid-gen.vercel.app/api', // Your base URL
  timeout: 60000, // Set a 60-second timeout
});

export default axiosInstance;
