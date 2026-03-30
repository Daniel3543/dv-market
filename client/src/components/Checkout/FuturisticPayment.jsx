import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCreditCard, FiLock, FiCheck, FiX } from 'react-icons/fi';

const FuturisticPayment = ({ onSubmit, loading }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [focused, setFocused] = useState(null);
  const [success, setSuccess] = useState(false);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    await onSubmit({
      cardNumber: cardNumber.replace(/\s/g, ''),
      cardName,
      expiry,
      cvv,
    });
  };

  return (
    <div className="relative">
      {/* 3D Card Preview */}
      <motion.div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-80 h-48 rounded-2xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 backdrop-blur-xl border border-white/20 shadow-2xl"
        animate={{
          rotateX: focused ? 10 : 0,
          rotateY: focused === 'number' ? 5 : focused === 'cvv' ? -5 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
        <div className="relative p-6 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="w-12 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded"></div>
            <FiCreditCard className="text-white/60 text-2xl" />
          </div>
          <div>
            <p className="font-mono text-lg tracking-wider">{cardNumber || '**** **** **** ****'}</p>
            <div className="flex justify-between mt-2">
              <p className="text-sm uppercase">{cardName || 'CARDHOLDER NAME'}</p>
              <p className="text-sm">{expiry || 'MM/YY'}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="mt-20 space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            onFocus={() => setFocused('number')}
            onBlur={() => setFocused(null)}
            maxLength={19}
            placeholder="1234 5678 9012 3456"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500 transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Cardholder Name</label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value.toUpperCase())}
            placeholder="JOHN DOE"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Expiry Date</label>
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="MM/YY"
              maxLength={5}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">CVV</label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
              onFocus={() => setFocused('cvv')}
              onBlur={() => setFocused(null)}
              placeholder="123"
              maxLength={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500"
              required
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          <FiLock size={14} />
          <span>Your payment info is encrypted and secure</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-glow py-4 mt-4 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2"
              >
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </motion.div>
            ) : success ? (
              <motion.div
                key="success"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center justify-center gap-2"
              >
                <FiCheck className="text-xl" />
                Payment Successful!
              </motion.div>
            ) : (
              <motion.div key="default">
                Pay Now
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </form>
    </div>
  );
};

export default FuturisticPayment;