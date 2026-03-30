import React from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiClock, FiCheckCircle, FiTruck, FiXCircle } from 'react-icons/fi';

const OrderHistory = ({ orders, loading }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <FiClock className="text-yellow-400" />;
      case 'processing': return <FiPackage className="text-blue-400" />;
      case 'shipped': return <FiTruck className="text-primary-400" />;
      case 'delivered': return <FiCheckCircle className="text-green-400" />;
      case 'cancelled': return <FiXCircle className="text-red-400" />;
      default: return <FiPackage />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'processing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'shipped': return 'bg-primary-500/20 text-primary-400 border-primary-500/30';
      case 'delivered': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-400">Loading orders...</p>
      </div>
    );
  }

  if (!orders?.length) {
    return (
      <div className="glass-card p-12 text-center">
        <FiPackage className="text-5xl text-gray-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
        <p className="text-gray-400">Start shopping to see your orders here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order, index) => (
        <motion.div
          key={order._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card p-6 hover:border-primary-500/30 transition-all"
        >
          <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-400">Order #{order._id.slice(-8)}</p>
              <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border ${getStatusColor(order.orderStatus)}`}>
              {getStatusIcon(order.orderStatus)}
              <span className="capitalize">{order.orderStatus}</span>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img src={item.product?.images?.[0]} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold">{item.price * item.quantity} AMD</p>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">Total</p>
              <p className="text-xl font-bold text-primary-400">{order.totalAmount} AMD</p>
            </div>
            {order.orderStatus === 'delivered' && (
              <button className="px-4 py-2 rounded-full glass text-sm hover:bg-primary-500/20 transition-colors">
                Write Review
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default OrderHistory;