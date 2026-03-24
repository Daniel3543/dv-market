import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/cart');
      setCart(data.cart);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchCart();
    }
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const { data } = await api.post('/cart', { productId, quantity });
      setCart(data.cart);
      toast.success('Added to cart');
      return true;
    } catch (error) {
      toast.error('Failed to add to cart');
      return false;
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const { data } = await api.put(`/cart/${productId}`, { quantity });
      setCart(data.cart);
      return true;
    } catch (error) {
      toast.error('Failed to update cart');
      return false;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const { data } = await api.delete(`/cart/${productId}`);
      setCart(data.cart);
      toast.success('Removed from cart');
      return true;
    } catch (error) {
      toast.error('Failed to remove from cart');
      return false;
    }
  };

  const clearCart = () => {
    setCart({ items: [] });
  };

  const getCartTotal = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      getCartTotal,
      getCartCount,
      fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};