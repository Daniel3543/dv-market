import React from 'react';
import { motion } from 'framer-motion';
import { FiCopy, FiCheck, FiUsers, FiDollarSign, FiTrendingUp, FiShare2 } from 'react-icons/fi';
import GlassCard from '../UI/GlassCard';
import GlowButton from '../UI/GlowButton';

const ReferralCard = ({ referralData, onCopy, copied }) => {
  const { referralCode, referralCount, balance, referredUsers = [] } = referralData || {};

  const shareReferral = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join DV MARKET',
        text: `Use my referral code ${referralCode} and get 50 AMD bonus!`,
        url: window.location.origin,
      });
    } else {
      onCopy();
    }
  };

  return (
    <div className="space-y-6">
      {/* Referral Code Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10"></div>
        <div className="relative z-10">
          <h3 className="text-xl font-semibold mb-2">Your Referral Code</h3>
          <p className="text-gray-400 text-sm mb-6">Share this code with friends and earn bonuses!</p>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="px-8 py-4 bg-black/50 rounded-2xl border border-primary-500/30 shadow-lg shadow-primary-500/20">
              <span className="text-3xl font-mono font-bold tracking-wider neon-text">
                {referralCode || 'LOADING'}
              </span>
            </div>
            
            <button
              onClick={onCopy}
              className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary-500/20 transition-all group"
            >
              {copied ? (
                <FiCheck className="text-green-400 text-xl" />
              ) : (
                <FiCopy className="text-xl group-hover:text-primary-400" />
              )}
            </button>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={shareReferral}
              className="px-6 py-2 rounded-full glass flex items-center gap-2 hover:bg-white/10"
            >
              <FiShare2 />
              Share
            </button>
            <GlowButton variant="outline" className="px-6 py-2">
              Copy Link
            </GlowButton>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 text-center"
        >
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary-500/20 flex items-center justify-center">
            <FiUsers className="text-primary-400 text-xl" />
          </div>
          <p className="text-2xl font-bold">{referralCount || 0}</p>
          <p className="text-sm text-gray-400">Friends Invited</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 text-center"
        >
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-secondary-500/20 flex items-center justify-center">
            <FiDollarSign className="text-secondary-400 text-xl" />
          </div>
          <p className="text-2xl font-bold">{balance || 0} AMD</p>
          <p className="text-sm text-gray-400">Bonus Earned</p>
        </motion.div>
      </div>

      {/* Referral Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <FiTrendingUp className="text-primary-400" />
          <h3 className="font-semibold">Referral Activity</h3>
        </div>
        
        <div className="space-y-3">
          {referredUsers.length > 0 ? (
            referredUsers.map((user, idx) => (
              <div key={idx} className="flex justify-between items-center py-2 border-b border-white/10">
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
                <span className="text-green-400 text-sm">+50 AMD</span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">
              No referrals yet. Share your code to start earning!
            </p>
          )}
        </div>

        <div className="mt-6 p-4 bg-primary-500/10 rounded-xl border border-primary-500/20">
          <p className="text-sm text-center">
            🎉 <span className="text-primary-400">Referral Bonus:</span> Get 100 AMD for each friend who joins using your code!
            Your friend also gets 50 AMD bonus on registration.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ReferralCard;