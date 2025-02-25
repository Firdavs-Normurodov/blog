import { create } from 'zustand';
import api from '../api/axios';
import useAuthStore from './authStore';

const useUserStore = create((set) => ({
    // Update user profile
    updateProfile: async (formData) => {
        try {
            const response = await api.put('/user/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            // Update the auth store with the new user data
            useAuthStore.getState().checkAuth();
            
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete user account
    deleteAccount: async () => {
        try {
            const response = await api.delete('/user/profile');
            
            // Clear auth store
            useAuthStore.getState().logout();
            
            return response.data;
        } catch (error) {
            throw error;
        }
    },
}));

export default useUserStore;
