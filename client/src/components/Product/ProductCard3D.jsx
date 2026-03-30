import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ProductCard3D = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useAuth();
  const isFav = isFavorite(product._id);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    await addToCart(product._id);
    setTimeout(() => setIsAdding(false), 500);
  };

  const handleFavorite = async (e) => {
    e.preventDefault();
    if (isFav) {
      await removeFromFavorites(product._id);
    } else {
      await addToFavorites(product._id);
    }
  };

  return (
    <motion.div
      className="relative group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={`/product/${product._id}`}>
        <div className="glass-card p-4 overflow-hidden relative">
          {/* Glow эффект при наведении */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 z-10 flex gap-2">
            {product.isOrganic && (
              <span className="px-2 py-1 text-xs font-semibold bg-green-500/20 text-green-400 rounded-full backdrop-blur-sm border border-green-500/30">
                🌱 Organic
              </span>
            )}
            {product.isFeatured && (
              <span className="px-2 py-1 text-xs font-semibold bg-primary-500/20 text-primary-400 rounded-full backdrop-blur-sm border border-primary-500/30">
                ⭐ Featured
              </span>
            )}
          </div>

          {/* Favorite button */}
          <button
            onClick={handleFavorite}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"
          >
            <FiHeart className={`text-lg ${isFav ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </button>

          {/* Image with 3D effect */}
          <div className="relative overflow-hidden rounded-xl mb-4">
            <motion.img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-48 object-cover"
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotateX: isHovered ? 5 : 0,
              }}
              transition={{ duration: 0.4 }}
            />
            {product.oldPrice && (
              <div className="absolute bottom-2 right-2 bg-red-500/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold">
                -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                {product.category}
              </span>
              <div className="flex items-center gap-1">
                <FiStar className="text-yellow-400 text-sm fill-current" />
                <span className="text-sm text-gray-300">{product.rating}</span>
              </div>
            </div>

            <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary-400 transition-colors">
              {product.name}
            </h3>

            <p className="text-gray-400 text-sm line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-xl font-bold text-primary-400">
                  {product.price} AMD
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-gray-500 line-through ml-2">
                    {product.oldPrice} AMD
                  </span>
                )}
                <span className="text-xs text-gray-500 ml-1">/{product.unit}</span>
              </div>

              <motion.button
                onClick={handleAddToCart}
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary-500/20 transition-colors"
                whileTap={{ scale: 0.9 }}
                animate={isAdding ? { scale: [1, 1.2, 1] } : {}}
              >
                <FiShoppingCart className="text-lg" />
              </motion.button>
            </div>
          </div>

          {/* Glowing border on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{
              boxShadow: isHovered ? '0 0 30px rgba(0, 255, 136, 0.3)' : 'none',
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard3D;