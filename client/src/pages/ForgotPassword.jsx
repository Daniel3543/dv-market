import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { FiMail, FiSend } from 'react-icons/fi';
import GlowButton from '../components/UI/GlowButton';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await api.post('/auth/forgot-password', { email });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-dark to-darker">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass-card p-8"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary-500/20 flex items-center justify-center">
            <FiMail className="text-primary-400 text-3xl" />
          </div>
          <h1 className="text-3xl font-bold neon-text">Reset Password</h1>
          <p className="text-gray-400 mt-2">
            Enter your email and we'll send you a link to reset your password
          </p>
        </div>

        {sent ? (
          <div className="text-center">
            <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20 mb-6">
              <p className="text-green-400">
                Password reset link sent to <strong>{email}</strong>
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Check your inbox and spam folder
              </p>
            </div>
            <Link to="/auth">
              <GlowButton variant="outline" className="w-full">
                Back to Login
              </GlowButton>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
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
                  Sending...
                </div>
              ) : (
                <>
                  <FiSend className="inline mr-2" />
                  Send Reset Link
                </>
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

export default ForgotPassword;