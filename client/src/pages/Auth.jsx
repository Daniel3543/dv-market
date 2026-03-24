import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';

<div className="mt-6">
  <div className="relative">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-300"></div>
    </div>
    <div className="relative flex justify-center text-sm">
      <span className="px-2 bg-white text-gray-500">Or continue with</span>
    </div>
  </div>

  <div className="mt-6 grid grid-cols-2 gap-3">
    <button
      type="button"
      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
      Google
    </button>
    <button
      type="button"
      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
      GitHub
    </button>
  </div>
</div>

// Добавьте состояние
const [confirmPassword, setConfirmPassword] = useState('');

// В форму добавьте поле:
{!isLogin && (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Confirm Password
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiLock className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        placeholder="Confirm password"
      />
    </div>
    {confirmPassword && formData.password !== confirmPassword && (
      <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
    )}
  </div>
)}

// В валидации добавьте проверку:
if (!isLogin && formData.password !== confirmPassword) {
  setPasswordError('Passwords do not match');
  isValid = false;
}

const [showPassword, setShowPassword] = useState(false);

// В поле пароля добавьте:
<div className="relative">
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <FiLock className="h-5 w-5 text-gray-400" />
  </div>
  <input
    type={showPassword ? "text" : "password"}
    // ... остальные атрибуты
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute inset-y-0 right-0 pr-3 flex items-center"
  >
    {showPassword ? 
      <FiEyeOff className="h-5 w-5 text-gray-400" /> : 
      <FiEye className="h-5 w-5 text-gray-400" />
    }
  </button>
</div>

// Добавьте эти состояния
const [passwordError, setPasswordError] = useState('');
const [emailError, setEmailError] = useState('');
const [nameError, setNameError] = useState('');

// Функция валидации
const validateForm = () => {
  let isValid = true;
  
  if (!isLogin) {
    if (formData.name.length < 2) {
      setNameError('Name must be at least 2 characters');
      isValid = false;
    } else {
      setNameError('');
    }
    
    if (formData.password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    setEmailError('Please enter a valid email');
    isValid = false;
  } else {
    setEmailError('');
  }
  
  return isValid;
};

// В handleSubmit перед отправкой:
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }
  
  // ... остальной код
};

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let result;
    if (isLogin) {
      result = await login(formData.email, formData.password);
    } else {
      result = await register(formData.name, formData.email, formData.password);
    }

    setLoading(false);

    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-accent-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-2xl p-8"
      >
        <div>
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">DV</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={!isLogin}
                    value={formData.name}
                    onChange={handleChange}
                    className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-end">
              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  Forgot your password?
                </a>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                isLogin ? 'Sign In' : 'Sign Up'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Secure authentication</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;