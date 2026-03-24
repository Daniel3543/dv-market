import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import CartItem from '../components/Cart/CartItem';
import { FiShoppingCart, FiArrowLeft } from 'react-icons/fi';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (!user) {
      navigate('/auth');
    } else {
      navigate('/checkout');
    }
  };

  if (!cart?.items?.length) {
    return (
      <div className="container-custom py-16 text-center">
        <FiShoppingCart className="text-6xl text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/catalog" className="btn-primary inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            {cart.items.map((item) => (
              <CartItem
                key={item.product._id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>
          
          <Link
            to="/catalog"
            className="inline-flex items-center space-x-2 mt-4 text-primary-600 hover:text-primary-700"
          >
            <FiArrowLeft />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-sm text-gray-500">
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping
                </p>
              )}
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full btn-primary"
            >
              Proceed to Checkout
            </button>
            
            <p className="text-xs text-gray-500 text-center mt-4">
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;