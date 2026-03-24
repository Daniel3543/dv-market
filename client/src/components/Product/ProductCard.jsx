import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useAuth();
  const isFav = isFavorite(product._id);

  const handleFavorite = async (e) => {
    e.preventDefault();
    if (isFav) {
      await removeFromFavorites(product._id);
    } else {
      await addToFavorites(product._id);
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    await addToCart(product._id);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <Link to={`/product/${product._id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          {product.isOrganic && (
            <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
              Organic
            </span>
          )}
          {product.oldPrice && (
            <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
              -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
            </span>
          )}
          <button
            onClick={handleFavorite}
            className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all"
          >
            <FiHeart className={`text-xl ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider">
              {product.category}
            </span>
            <div className="flex items-center">
              <FiStar className="text-yellow-400 fill-current text-sm" />
              <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
            </div>
          </div>

          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-primary-600">
                ${product.price}
              </span>
              {product.oldPrice && (
                <span className="text-sm text-gray-400 line-through ml-2">
                  ${product.oldPrice}
                </span>
              )}
              <span className="text-xs text-gray-500 ml-1">/{product.unit}</span>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transform hover:scale-110 transition-all duration-300"
            >
              <FiShoppingCart size={18} />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;