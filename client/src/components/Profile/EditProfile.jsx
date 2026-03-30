import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import GlowButton from '../UI/GlowButton';

const EditProfile = ({ onClose }) => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    avatar: user?.avatar || '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await updateProfile(formData);
    setLoading(false);
    if (success && onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-card p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Avatar URL</label>
            <input
              type="text"
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <GlowButton type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </GlowButton>
            <GlowButton variant="outline" onClick={onClose}>
              Cancel
            </GlowButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;