import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useLanguage } from '../../context/LanguageContext';
import { FiShoppingCart, FiUser, FiHeart, FiMenu, FiX } from 'react-icons/fi';
import LanguageSwitcher from '../UI/LanguageSwitcher';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = getCartCount();

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Анимированное свечение вокруг логотипа */}
              <div className="absolute inset-0 bg-primary-500/30 rounded-xl blur-md group-hover:blur-xl transition-all duration-500"></div>
              <img 
                src="/images/dvlogo.png" 
                alt="DV MARKET" 
                className="relative w-12 h-12 object-contain rounded-xl"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                DV MARKET
              </span>
              <p className="text-xs text-gray-400">{t('common.tagline')}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors">
              {t('common.home')}
            </Link>
            <Link to="/catalog" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors">
              {t('common.catalog')}
            </Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors">
              {t('common.about')}
            </Link>
            <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors">
              {t('common.contact')}
            </Link>
            {user && user.role === 'admin' && (
              <Link to="/admin" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors">
                {t('common.admin')}
              </Link>
            )}
          </nav>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            
            <Link to="/cart" className="relative">
              <FiShoppingCart className="text-2xl text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <FiUser className="text-primary-600" />
                    )}
                  </div>
                </button>
                <div className="absolute right-0 mt-2 w-48 glass-card rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-2">
                    <p className="px-4 py-2 text-sm text-gray-300 border-b border-white/10">
                      {user.name}
                    </p>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-colors">
                      {t('common.profile')}
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10 transition-colors"
                    >
                      {t('common.logout')}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                {t('common.signIn')}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-slide-up">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 py-2">
                {t('common.home')}
              </Link>
              <Link to="/catalog" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 py-2">
                {t('common.catalog')}
              </Link>
              <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 py-2">
                {t('common.about')}
              </Link>
              <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 py-2">
                {t('common.contact')}
              </Link>
              {user && user.role === 'admin' && (
                <Link to="/admin" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 py-2">
                  {t('common.admin')}
                </Link>
              )}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <LanguageSwitcher />
                <Link to="/cart" className="relative flex items-center gap-2">
                  <FiShoppingCart className="text-xl" />
                  {cartCount > 0 && (
                    <span className="bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                  <span>{t('common.cart')}</span>
                </Link>
              </div>
              {!user && (
                <Link
                  to="/auth"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg text-center"
                >
                  {t('common.signIn')}
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;