import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { FiShoppingCart, FiUser, FiHeart, FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
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
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">DV</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
              MARKET
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link to="/catalog" className="text-gray-700 hover:text-primary-600 transition-colors">
              Catalog
            </Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors">
              Contact
            </Link>
            {user && (
              <Link to="/profile" className="text-gray-700 hover:text-primary-600 transition-colors">
                Profile
              </Link>
            )}
          </nav>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <FiShoppingCart className="text-2xl text-gray-700 hover:text-primary-600 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <FiUser className="text-primary-600" />
                  </div>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-2">
                    <p className="px-4 py-2 text-sm text-gray-700 border-b">
                      {user.name}
                    </p>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Sign In
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
              <Link to="/" className="text-gray-700 hover:text-primary-600 py-2">
                Home
              </Link>
              <Link to="/catalog" className="text-gray-700 hover:text-primary-600 py-2">
                Catalog
              </Link>
              {user && (
                <Link to="/profile" className="text-gray-700 hover:text-primary-600 py-2">
                  Profile
                </Link>
              )}
              <Link to="/cart" className="text-gray-700 hover:text-primary-600 py-2 flex items-center justify-between">
                Cart
                {cartCount > 0 && (
                  <span className="bg-accent-500 text-white text-xs rounded-full px-2 py-1">
                    {cartCount}
                  </span>
                )}
              </Link>
              {!user && (
                <Link
                  to="/auth"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg text-center"
                >
                  Sign In
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