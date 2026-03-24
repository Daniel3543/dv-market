import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { product, quantity } = item;

  const handleIncrease = () => {
    onUpdateQuantity(product._id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(product._id, quantity - 1);
    }
  };

  return (
    <div className="flex items-center py-4 border-b last:border-b-0">
      <Link to={`/product/${product._id}`} className="flex-shrink-0 w-24 h-24">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </Link>

      <div className="flex-grow ml-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-lg hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm">${product.price} / {product.unit}</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDecrease}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            disabled={quantity <= 1}
          >
            <FiMinus className="text-gray-600" />
          </button>
          <span className="w-8 text-center font-semibold">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FiPlus className="text-gray-600" />
          </button>
        </div>

        <div className="text-right">
          <p className="font-bold text-primary-600">
            ${(product.price * quantity).toFixed(2)}
          </p>
          <button
            onClick={() => onRemove(product._id)}
            className="text-red-500 hover:text-red-600 transition-colors mt-1"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;