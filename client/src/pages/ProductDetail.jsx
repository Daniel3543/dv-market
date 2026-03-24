import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import Loader from '../components/UI/Loader';
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

  if (isLoading) return <Loader />;
  if (!data) return <div>Product not found</div>;

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
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden mb-4"
          >
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
            {product.isOrganic && (
              <span className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Organic
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
            <span className="ml-2 text-gray-600">({product.rating})</span>
          </div>

          <div className="mb-4">
            {product.oldPrice ? (
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-primary-600">${product.price}</span>
                <span className="text-lg text-gray-400 line-through">${product.oldPrice}</span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
                  Save ${(product.oldPrice - product.price).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-primary-600">${product.price}</span>
            )}
            <span className="text-gray-500 ml-2">per {product.unit}</span>
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
            <span className="text-gray-500">{product.stock} {product.unit} available</span>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <FiShoppingCart />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={handleFavorite}
              className={`px-6 py-3 rounded-lg border-2 font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                isFav
                  ? 'bg-red-50 border-red-500 text-red-500'
                  : 'border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-500'
              }`}
            >
              <FiHeart className={isFav ? 'fill-current' : ''} />
              <span>{isFav ? 'Saved' : 'Save'}</span>
            </button>
          </div>

          {/* Shipping Info */}
          <div className="border-t pt-6 space-y-3">
            <div className="flex items-center space-x-3 text-gray-600">
              <FiTruck className="text-primary-500" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <FiRefreshCw className="text-primary-500" />
              <span>30-day money-back guarantee</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;