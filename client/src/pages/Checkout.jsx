import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '../services/api';
import toast from 'react-hot-toast';

const stripePromise = loadStripe('pk_test_your_stripe_publishable_key');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: 'US',
  });

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      // Create order
      const { data } = await api.post('/orders', {
        items: cart.items.map(item => ({
          product: item.product._id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price
        })),
        totalAmount: total,
        shippingAddress: formData,
      });

      // Confirm payment
      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        await api.put(`/orders/${data.order._id}/payment`, {
          paymentStatus: 'completed',
          paymentIntentId: paymentIntent.id
        });
        
        toast.success('Order placed successfully!');
        clearCart();
        navigate('/profile');
      }
    } catch (error) {
      toast.error('Failed to process order');
    } finally {
      setLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
        padding: '10px 12px',
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Shipping Address
        </label>
        <input
          type="text"
          name="street"
          placeholder="Street Address"
          value={formData.street}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mb-3"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleInputChange}
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Payment Information
        </label>
        <div className="border border-gray-300 rounded-lg p-3 transition-all focus-within:ring-2 focus-within:ring-primary-500">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-primary-600">${total.toFixed(2)}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
        </button>
      </div>
    </form>
  );
};

const Checkout = () => {
  const { cart } = useCart();

  if (!cart?.items?.length) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600">Please add items to your cart before checking out.</p>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Complete Your Order</h2>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {cart.items.map((item) => (
              <div key={item.product._id} className="flex justify-between items-center py-2 border-b">
                <div className="flex items-center space-x-3">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 object-cover rounded" />
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;