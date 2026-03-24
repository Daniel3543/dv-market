import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">DV</span>
              </div>
              <span className="text-2xl font-bold">MARKET</span>
            </div>
            <p className="text-gray-400">
              Fresh fruits and vegetables delivered to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Catalog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-400">
                <FiPhone />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <FiMail />
                <span>info@dvmarket.com</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FiFacebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FiTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FiInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 DV MARKET. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;