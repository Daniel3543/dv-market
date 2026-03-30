import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useQuery } from 'react-query';
import api from '../services/api';
import GlassCard from '../components/UI/GlassCard';
import GlowButton from '../components/UI/GlowButton';
import NeonText from '../components/UI/NeonText';
import ReferralCard from '../components/Profile/ReferralCard';
import OrderHistory from '../components/Profile/OrderHistory';
import EditProfile from '../components/Profile/EditProfile';
import { 
  FiUser, FiPackage, FiGift, FiSettings, FiLogOut, FiStar, FiTrendingUp, 
  FiDollarSign, FiUsers, FiCopy, FiCheck, FiEdit2, FiCamera 
} from 'react-icons/fi';

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    avatar: user?.avatar || '',
  });

  const { data: orders, isLoading: ordersLoading } = useQuery(
    'orders',
    async () => {
      const { data } = await api.get('/orders');
      return data.orders;
    }
  );

  const { data: referralData, refetch: refetchReferral } = useQuery(
    'referral',
    async () => {
      const { data } = await api.get('/auth/referral');
      return data;
    }
  );

  const copyReferralCode = () => {
    if (referralData?.referralCode) {
      navigator.clipboard.writeText(referralData.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleUpdateProfile = async () => {
    const success = await updateProfile(editForm);
    if (success) {
      setIsEditing(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiUser },
    { id: 'orders', label: 'Orders', icon: FiPackage },
    { id: 'referral', label: 'Referrals', icon: FiGift },
    { id: 'settings', label: 'Settings', icon: FiSettings },
  ];

  const stats = [
    { label: 'Total Orders', value: orders?.length || 0, icon: FiPackage, color: '#00ff88' },
    { label: 'Referrals', value: referralData?.referralCount || 0, icon: FiUsers, color: '#ff3366' },
    { label: 'Bonus Balance', value: `${referralData?.balance || 0} AMD`, icon: FiDollarSign, color: '#ff6b35' },
    { label: 'Member Since', value: new Date(user?.createdAt).toLocaleDateString(), icon: FiStar, color: '#00ccff' },
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-full blur-3xl"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 p-0.5">
                <div className="w-full h-full rounded-full bg-dark flex items-center justify-center overflow-hidden">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl font-bold text-white">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
              <button 
                onClick={() => setIsEditing(true)}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiCamera size={14} />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <h1 className="text-3xl font-bold">{user?.name}</h1>
                {user?.role === 'admin' && (
                  <span className="px-3 py-1 text-xs font-semibold bg-primary-500/20 text-primary-400 rounded-full border border-primary-500/30">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-gray-400 mt-1">{user?.email}</p>
              <div className="flex items-center gap-4 mt-3 justify-center md:justify-start">
                <div className="flex items-center gap-1 text-primary-400">
                  <FiTrendingUp />
                  <span className="text-sm">{referralData?.referralCount || 0} referrals</span>
                </div>
                <div className="flex items-center gap-1 text-secondary-400">
                  <FiDollarSign />
                  <span className="text-sm">{referralData?.balance || 0} AMD bonus</span>
                </div>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="px-6 py-2 rounded-full glass flex items-center gap-2 hover:bg-red-500/20 transition-colors group"
            >
              <FiLogOut className="group-hover:text-red-400" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-4 text-center"
            >
              <stat.icon className="mx-auto text-2xl mb-2" style={{ color: stat.color }} />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-full flex items-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                    : 'glass hover:bg-white/10'
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Profile Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-primary-400 hover:text-primary-300 flex items-center gap-2"
                >
                  <FiEdit2 />
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Avatar URL</label>
                    <input
                      type="text"
                      value={editForm.avatar}
                      onChange={(e) => setEditForm({ ...editForm, avatar: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500"
                    />
                  </div>
                  <GlowButton onClick={handleUpdateProfile} className="w-full">
                    Save Changes
                  </GlowButton>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-gray-400">Name</span>
                    <span>{user?.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-gray-400">Email</span>
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-gray-400">Member Since</span>
                    <span>{new Date(user?.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-400">Role</span>
                    <span className="capitalize">{user?.role}</span>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <OrderHistory orders={orders} loading={ordersLoading} />
            </motion.div>
          )}

          {activeTab === 'referral' && (
            <motion.div
              key="referral"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ReferralCard referralData={referralData} onCopy={copyReferralCode} copied={copied} />
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card p-8"
            >
              <h2 className="text-xl font-bold mb-6">Security Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Change Password</label>
                  <input
                    type="password"
                    placeholder="Current Password"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 mb-3"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 mb-3"
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500"
                  />
                  <GlowButton className="mt-4 w-full">Update Password</GlowButton>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <h3 className="text-lg font-semibold mb-3">Notifications</h3>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-primary-500" />
                    <span>Email me about new offers</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer mt-2">
                    <input type="checkbox" className="w-4 h-4 accent-primary-500" />
                    <span>Order status updates</span>
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Profile;