import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const { data } = await api.get('/auth/me');
      setUser(data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      toast.success('Welcome back!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      toast.success('Account created successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully');
  };

  const addToFavorites = async (productId) => {
    try {
      const { data } = await api.post('/auth/favorites', { productId });
      setUser(prev => ({ ...prev, favorites: data.favorites }));
      toast.success('Added to favorites');
      return true;
    } catch (error) {
      toast.error('Failed to add to favorites');
      return false;
    }
  };

  const removeFromFavorites = async (productId) => {
    try {
      const { data } = await api.delete(`/auth/favorites/${productId}`);
      setUser(prev => ({ ...prev, favorites: data.favorites }));
      toast.success('Removed from favorites');
      return true;
    } catch (error) {
      toast.error('Failed to remove from favorites');
      return false;
    }
  };

  const isFavorite = (productId) => {
    return user?.favorites?.some(fav => fav._id === productId);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      addToFavorites,
      removeFromFavorites,
      isFavorite
    }}>
      {children}
    </AuthContext.Provider>
  );
};