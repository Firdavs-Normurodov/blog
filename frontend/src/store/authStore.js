import { create } from 'zustand';
import api from '../api/axios';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  // Check if user is authenticated
  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ user: null, isAuthenticated: false, isLoading: false });
      return;
    }

    set({ isLoading: true });
    try {
      const response = await api.get('/user/profile');
      set({
        user: response.data,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      localStorage.removeItem('token');
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      set({
        user: response.data.user,
        isAuthenticated: true,
      });
      return response.data;
    } catch (error) {
      localStorage.removeItem('token');
      throw error;
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(userData)) {
        if (value !== null) {
          formData.append(key, value);
        }
      }

      // Set the correct content type for FormData
      const response = await api.post('/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      set({
        user: response.data.user,
        isAuthenticated: true,
      });
      return response.data;
    } catch (error) {
      localStorage.removeItem('token');
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      set({
        user: null,
        isAuthenticated: false,
      });
    }
  },
}));

export default useAuthStore;
