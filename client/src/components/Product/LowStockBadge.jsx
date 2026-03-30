import React from 'react';
import { motion } from 'framer-motion';

const LowStockBadge = ({ stock }) => {
  if (stock > 10) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute top-3 left-3 z-10"
    >
      <span className="px-2 py-1 text-xs font-semibold bg-orange-500/90 text-white rounded-full backdrop-blur-sm">
        {stock <= 0 ? 'Out of Stock' : `Only ${stock} left!`}
      </span>
    </motion.div>
  );
};

export default LowStockBadge;