import { create } from 'zustand';
import api from '../api/axios';

const useBlogStore = create((set, get) => ({
  posts: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,

  // Get all posts with pagination and random visibility
  getPosts: async (page = 1) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`/posts?page=${page}`);
      
      // Ensure we have posts data and handle the response structure correctly
      const postsData = response.data.posts || response.data || [];
      
      // Randomly modify some posts to simulate missing data
      const modifiedPosts = postsData.map(post => {
        // Randomly decide if this post should have missing data (30% chance)
        if (Math.random() < 0.3) {
          const fieldsToRemove = [];
          // 50% chance to remove title
          if (Math.random() < 0.5) fieldsToRemove.push('title');
          // 50% chance to remove content
          if (Math.random() < 0.5) fieldsToRemove.push('content');
          
          // Create a new post object without the selected fields
          return fieldsToRemove.reduce((obj, field) => {
            const { [field]: removed, ...rest } = obj;
            return rest;
          }, { ...post });
        }
        return post;
      });

      set({
        posts: modifiedPosts,
        currentPage: page,
        totalPages: response.data.totalPages || 1,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
      set({ 
        posts: [],
        isLoading: false,
        currentPage: 1,
        totalPages: 1
      });
    }
  },

  // Get single post
  getPost: async (id) => {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user's posts
  getUserPosts: async (userId) => {
    try {
      const response = await api.get(`/posts/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new post
  createPost: async (postData) => {
    try {
      const response = await api.post('/posts', postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Update posts list after creation
      const currentPosts = get().posts;
      set({
        posts: [response.data, ...currentPosts]
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update post
  updatePost: async (id, postData) => {
    try {
      const response = await api.put(`/posts/${id}`, postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Update posts list after update
      const currentPosts = get().posts;
      set({
        posts: currentPosts.map(post => 
          post._id === id ? response.data : post
        )
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete post
  deletePost: async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      // Update posts list after deletion
      const currentPosts = get().posts;
      set({
        posts: currentPosts.filter(post => post._id !== id)
      });
      return true;
    } catch (error) {
      throw error;
    }
  },
}));

export default useBlogStore;
