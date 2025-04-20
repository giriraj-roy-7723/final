import axios from 'axios';

const API_BASE_URL = 'https://final-puce-three.vercel.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Function to set JWT token in headers for future requests
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Check for token on app load
const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login if unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      setAuthToken(null);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export { api };
