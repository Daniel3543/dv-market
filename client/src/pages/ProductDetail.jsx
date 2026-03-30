import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import Skeleton from '../components/UI/Skeleton';
import GlowButton from '../components/UI/GlowButton';
import { FiHeart, FiShoppingCart, FiStar, FiTruck, FiRefreshCw } from 'react-icons/fi';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user, addToFavorites, removeFromFavorites, isFavorite } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const { data, isLoading } = useQuery(['product', id], async () => {
    const { data } = await api.get(`/products/${id}`);
    return data.product;
  });

  if (isLoading) return <Skeleton className="h-96 rounded-2xl" />;
  if (!data) return <div className="text-center py-20 text-gray-400">Product not found</div>;

  const product = data;
  const isFav = isFavorite(product._id);

  const handleAddToCart = async () => {
    await addToCart(product._id, quantity);
    navigate('/cart');
  };

  const handleFavorite = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    if (isFav) {
      await removeFromFavorites(product._id);
    } else {
      await addToFavorites(product._id);
    }
  };

  return (
    <div className="container-custom py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative glass-card overflow-hidden mb-4"
          >
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
            {product.isOrganic && (
              <span className="absolute top-4 left-4 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                🌱 Organic
              </span>
            )}
          </motion.div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index ? 'border-primary-500' : 'border-transparent'
                }`}
              >
                <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-24 object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className={i < Math.floor(product.rating) ? 'fill-current' : ''} />
              ))}
            </div>
            <span className="ml-2 text-gray-400">({product.rating})</span>
          </div>

          <div className="mb-4">
            {product.oldPrice ? (
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-primary-400">{product.price} AMD</span>
                <span className="text-lg text-gray-500 line-through">{product.oldPrice} AMD</span>
                <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-sm font-semibold">
                  Save {product.oldPrice - product.price} AMD
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-primary-400">{product.price} AMD</span>
            )}
            <span className="text-gray-500 ml-2">per {product.unit}</span>
          </div>

          <p className="text-gray-300 mb-6">{product.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-gray-400">Quantity:</span>
            <div className="flex items-center glass border border-white/10 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-white/10 transition-colors"
              >
                -
              </button>
              <span className="px-4 py-2 border-x border-white/10">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 hover:bg-white/10 transition-colors"
              >
                +
              </button>
            </div>
            <span className="text-gray-500">{product.stock} {product.unit} available</span>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mb-8">
            <GlowButton onClick={handleAddToCart} className="flex-1">
              <FiShoppingCart className="inline mr-2" />
              Add to Cart
            </GlowButton>
            <button
              onClick={handleFavorite}
              className={`px-6 py-3 rounded-full border-2 font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                isFav
                  ? 'bg-red-500/20 border-red-500 text-red-400'
                  : 'glass border-white/20 text-gray-300 hover:border-primary-500 hover:text-primary-400'
              }`}
            >
              <FiHeart className={isFav ? 'fill-red-500' : ''} />
              <span>{isFav ? 'Saved' : 'Save'}</span>
            </button>
          </div>

          {/* Shipping Info */}
          <div className="border-t border-white/10 pt-6 space-y-3">
            <div className="flex items-center space-x-3 text-gray-400">
              <FiTruck className="text-primary-400" />
              <span>Free shipping on orders over 5000 AMD</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-400">
              <FiRefreshCw className="text-primary-400" />
              <span>30-day money-back guarantee</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;