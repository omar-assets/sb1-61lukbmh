import axios from 'axios';
import { requestInterceptor, responseInterceptor, errorInterceptor } from './interceptors';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor
api.interceptors.request.use(requestInterceptor);

// Add response interceptors
api.interceptors.response.use(responseInterceptor, errorInterceptor);

export default api;