import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api" 
      : "/api",

  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Cookie’lar bilan ishlash uchun zarur
});

// Request interceptor
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';

    if (!(error.config.url.includes('/user/profile') && error.response?.status === 401)) {
      toast.error(message);
    }

    // Agar 401 bo‘lsa, login sahifasiga yo‘naltirish mumkin
    if (error.response?.status === 401) {
      window.location.href = '/auth/login';
    }

    return Promise.reject(error);
  }
);

export default api;
