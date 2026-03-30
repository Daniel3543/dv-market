import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiXCircle, FiMail, FiRefreshCw } from 'react-icons/fi';
import GlowButton from '../components/UI/GlowButton';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');
  const [resending, setResending] = useState(false);
  const [email, setEmail] = useState('');

  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      verifyEmail();
    } else {
      setStatus('no-token');
    }
  }, [token]);

  const verifyEmail = async () => {
    try {
      const { data } = await api.get(`/auth/verify-email/${token}`);
      if (data.success) {
        localStorage.setItem('token', data.token);
        setStatus('success');
        setMessage('Email verified successfully!');
        setTimeout(() => navigate('/'), 3000);
      }
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Invalid or expired verification link');
    }
  };

  const handleResend = async () => {
    if (!email) {
      setMessage('Please enter your email address');
      return;
    }
    
    setResending(true);
    try {
      const { data } = await api.post('/auth/resend-verification', { email });
      setStatus('resent');
      setMessage('Verification email sent! Please check your inbox.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to resend verification email');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-dark to-darker">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass-card p-8 text-center"
      >
        {status === 'verifying' && (
          <>
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-500/20 flex items-center justify-center animate-pulse">
              <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Verifying Your Email</h2>
            <p className="text-gray-400">Please wait while we verify your email address...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
              <FiCheckCircle className="text-green-400 text-4xl" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-green-400">Email Verified!</h2>
            <p className="text-gray-400 mb-6">{message}</p>
            <p className="text-sm text-gray-500">Redirecting to home page...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
              <FiXCircle className="text-red-400 text-4xl" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-red-400">Verification Failed</h2>
            <p className="text-gray-400 mb-6">{message}</p>
            
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-3">Enter your email to receive a new verification link:</p>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 mb-3"
              />
              <GlowButton
                onClick={handleResend}
                disabled={resending}
                className="w-full"
              >
                {resending ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </div>
                ) : (
                  <>
                    <FiRefreshCw className="inline mr-2" />
                    Resend Verification Email
                  </>
                )}
              </GlowButton>
            </div>
          </>
        )}

        {status === 'no-token' && (
          <>
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-500/20 flex items-center justify-center">
              <FiMail className="text-primary-400 text-4xl" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Verify Your Email</h2>
            <p className="text-gray-400 mb-6">
              Please enter your email address to receive a verification link.
            </p>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 mb-3"
            />
            <GlowButton
              onClick={handleResend}
              disabled={resending}
              className="w-full"
            >
              {resending ? 'Sending...' : 'Send Verification Email'}
            </GlowButton>
          </>
        )}

        <div className="mt-6 pt-6 border-t border-white/10">
          <Link to="/auth" className="text-primary-400 hover:text-primary-300 text-sm">
            Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;