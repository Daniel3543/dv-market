import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiShoppingBag, FiHome } from 'react-icons/fi';
import GlowButton from '../components/UI/GlowButton';

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear cart from localStorage
    localStorage.removeItem('cart');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-12 text-center max-w-md w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
        >
          <FiCheckCircle className="text-green-400 text-5xl" />
        </motion.div>
        
        <h1 className="text-3xl font-bold mb-4 neon-text">Order Confirmed!</h1>
        <p className="text-gray-400 mb-6">
          Thank you for your purchase! Your order has been received and is being processed.
        </p>
        
        <div className="space-y-3">
          <GlowButton to="/profile" className="w-full">
            <FiShoppingBag className="inline mr-2" />
            View Order Status
          </GlowButton>
          <GlowButton to="/catalog" variant="outline" className="w-full">
            <FiHome className="inline mr-2" />
            Continue Shopping
          </GlowButton>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;