import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    // Здесь можно добавить API для подписки
    setTimeout(() => {
      toast.success('Subscribed successfully!');
      setEmail('');
      setSubscribing(false);
    }, 1000);
  };

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand with Logo */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">DV</span>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                  MARKET
                </span>
                <p className="text-xs text-gray-400">Fresh & Organic</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Premium fruits and vegetables delivered fresh to your doorstep. Quality you can taste!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/catalog" className="text-gray-400 hover:text-primary-400 transition-colors">Catalog</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-400">
                <FiPhone className="text-primary-400 flex-shrink-0" />
                <a href="tel:+37477383631" className="hover:text-primary-400 transition-colors">+374 77 383631</a>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <FiMail className="text-primary-400 flex-shrink-0" />
                <a href="mailto:danielmnacakanan60@gmail.com" className="hover:text-primary-400 transition-colors break-all">
                  danielmnacakanan60@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <FiMapPin className="text-primary-400 flex-shrink-0" />
                <span>Yerevan, Armenia</span>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FiInstagram size={20} />
              </a>
            </div>
            <p className="text-gray-400 text-sm">Subscribe to get special offers</p>
            <form onSubmit={handleSubscribe} className="mt-3 flex">
              <input 
                type="email" 
                placeholder="Your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 text-sm rounded-l-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-primary-500"
              />
              <button 
                type="submit"
                disabled={subscribing}
                className="bg-primary-600 px-4 py-2 rounded-r-lg text-sm hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {subscribing ? '...' : <FiSend size={16} />}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 DV MARKET. All rights reserved. | Designed with ❤️ for fresh food</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;