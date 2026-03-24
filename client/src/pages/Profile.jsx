import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useQuery } from 'react-query';
import api from '../services/api';
import Loader from '../components/UI/Loader';
import ProductCard from '../components/Product/ProductCard';
import { FiUser, FiHeart, FiPackage, FiLogOut } from 'react-icons/fi';

const Profile = () => {
  const { user, logout, isFavorite } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');

  const { data: orders, isLoading: ordersLoading } = useQuery(
    'orders',
    async () => {
      const { data } = await api.get('/orders');
      return data.orders;
    }
  );

  if (!user) return null;

  const tabs = [
    { id: 'orders', label: 'My Orders', icon: FiPackage },
    { id: 'favorites', label: 'Favorites', icon: FiHeart },
    { id: 'profile', label: 'Profile', icon: FiUser },
  ];

  return (
    <div className="container-custom py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-3xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>

            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
              <button
                onClick={logout}
                className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <FiLogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-xl shadow-lg p-6">
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">My Orders</h2>
                {ordersLoading ? (
                  <Loader />
                ) : orders?.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No orders yet.</p>
                ) : (
                  <div className="space-y-4">
                    {orders?.map((order) => (
                      <div key={order._id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="text-sm text-gray-500">
                              Order #{order._id.slice(-6)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            order.orderStatus === 'delivered'
                              ? 'bg-green-100 text-green-600'
                              : order.orderStatus === 'processing'
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-yellow-100 text-yellow-600'
                          }`}>
                            {order.orderStatus}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div key={item.product._id} className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                              </div>
                              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                        <div className="border-t mt-3 pt-3 text-right">
                          <p className="font-bold text-lg">Total: ${order.totalAmount.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'favorites' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">My Favorites</h2>
                {user.favorites?.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No favorite items yet.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {user.favorites?.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Member Since
                    </label>
                    <input
                      type="text"
                      value={new Date(user.createdAt).toLocaleDateString()}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;