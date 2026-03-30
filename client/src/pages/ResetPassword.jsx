import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { FiLock, FiEye, FiEyeOff, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import GlowButton from '../components/UI/GlowButton';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await api.put(`/auth/reset-password/${token}`, { password });
      setSuccess(true);
      setTimeout(() => navigate('/auth'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired reset link');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-dark to-darker">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass-card p-8 text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
            <FiXCircle className="text-red-400 text-4xl" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-red-400">Invalid Reset Link</h2>
          <p className="text-gray-400 mb-6">No reset token provided. Please request a new password reset link.</p>
          <Link to="/forgot-password">
            <GlowButton variant="outline" className="w-full">
              Request New Link
            </GlowButton>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-dark to-darker">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass-card p-8"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary-500/20 flex items-center justify-center">
            <FiLock className="text-primary-400 text-3xl" />
          </div>
          <h1 className="text-3xl font-bold neon-text">Reset Password</h1>
          <p className="text-gray-400 mt-2">Enter your new password below</p>
        </div>

        {success ? (
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
              <FiCheckCircle className="text-green-400 text-4xl" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-green-400">Password Reset!</h2>
            <p className="text-gray-400 mb-6">Your password has been successfully reset.</p>
            <p className="text-sm text-gray-500">Redirecting to login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-400"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500"
                required
              />
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            
            <GlowButton type="submit" disabled={loading} className="w-full mb-4">
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Resetting...
                </div>
              ) : (
                'Reset Password'
              )}
            </GlowButton>
            
            <p className="text-center text-sm text-gray-400">
              Remember your password?{' '}
              <Link to="/auth" className="text-primary-400 hover:text-primary-300">
                Sign In
              </Link>
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ResetPassword;