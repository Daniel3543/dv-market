import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import api from '../services/api';
import toast from 'react-hot-toast';
import FuturisticPayment from '../components/Checkout/FuturisticPayment';
import { FiGift, FiDollarSign, FiShoppingBag, FiTruck } from 'react-icons/fi';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const { cart, getCartTotal, clearCart, fetchCart } = useCart();
  const { user, getReferralInfo, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [useBonus, setUseBonus] = useState(false);
  const [userBonus, setUserBonus] = useState(0);
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: 'AM',
  });

  useEffect(() => {
    if (user) {
      fetchUserBonus();
    }
  }, [user]);

  const fetchUserBonus = async () => {
    try {
      const data = await getReferralInfo();
      if (data) {
        setUserBonus(data.balance || 0);
      }
    } catch (error) {
      console.error('Error fetching bonus:', error);
    }
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 5000 ? 0 : 500;
  let bonusDiscount = 0;
  let finalTotal = subtotal + shipping;

  if (useBonus && userBonus > 0) {
    bonusDiscount = Math.min(userBonus, finalTotal);
    finalTotal = finalTotal - bonusDiscount;
  }

  if (!cart?.items?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FiShoppingBag className="text-6xl text-gray-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-400 mb-6">Please add items to your cart before checking out.</p>
          <button
            onClick={() => navigate('/catalog')}
            className="btn-glow"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (paymentData) => {
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
        totalAmount: finalTotal,
        subtotal: subtotal,
        shipping: shipping,
        bonusUsed: bonusDiscount,
        shippingAddress: formData,
        paymentMethod: 'card',
      });

      // Process payment with Stripe
      if (!useBonus || finalTotal > 0) {
        const stripe = await stripePromise;
        const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: paymentData,
            billing_details: {
              name: user?.name,
              email: user?.email,
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
        }
      } else {
        // If fully paid with bonus, just mark as completed
        await api.put(`/orders/${data.order._id}/payment`, {
          paymentStatus: 'completed',
          paymentMethod: 'bonus'
        });
      }
      
      // Deduct bonus if used
      if (bonusDiscount > 0) {
        await api.put('/auth/deduct-bonus', { amount: bonusDiscount });
      }
      
      toast.success('Order placed successfully!');
      clearCart();
      navigate('/profile');
    } catch (error) {
      toast.error('Failed to process order');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-dark to-darker">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-8">
          <span className="neon-text">Checkout</span>
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="glass-card p-6 order-2 lg:order-1">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FiShoppingBag className="text-primary-400" />
              Order Summary
            </h2>
            
            <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
              {cart.items.map((item) => (
                <div key={item.product._id} className="flex justify-between items-center py-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold">{item.product.price * item.quantity} AMD</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-white/10 pt-4 space-y-2">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>{subtotal} AMD</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `${shipping} AMD`}</span>
              </div>
              {bonusDiscount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Bonus Discount</span>
                  <span>-{bonusDiscount} AMD</span>
                </div>
              )}
              <div className="border-t border-white/10 pt-3 mt-2">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary-400">{finalTotal} AMD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="order-1 lg:order-2">
            {/* Shipping Address */}
            <div className="glass-card p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FiTruck className="text-primary-400" />
                Shipping Address
              </h2>
              <div className="space-y-3">
                <input
                  type="text"
                  name="street"
                  placeholder="Street Address"
                  value={formData.street}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500"
                  />
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500"
                  />
                </div>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500"
                >
                  <option value="AM">Armenia (AM)</option>
                  <option value="US">United States</option>
                  <option value="RU">Russia</option>
                  <option value="EU">Europe</option>
                </select>
              </div>
            </div>

            {/* Bonus Payment Option */}
            {userBonus > 0 && (
              <div className="glass-card p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center">
                      <FiGift className="text-primary-400 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Use Bonus Points</h3>
                      <p className="text-sm text-gray-400">
                        You have <span className="text-primary-400 font-bold">{userBonus} AMD</span> available
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useBonus}
                      onChange={(e) => setUseBonus(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                {useBonus && (
                  <div className="mt-4 p-4 bg-primary-500/10 rounded-xl border border-primary-500/20">
                    <p className="text-sm text-center">
                      💰 You will save <span className="text-primary-400 font-bold">{Math.min(userBonus, subtotal + shipping)} AMD</span> using your bonus!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Payment Form */}
            {(!useBonus || finalTotal > 0) && (
              <div className="glass-card p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FiDollarSign className="text-primary-400" />
                  Payment Method
                </h2>
                <FuturisticPayment onSubmit={handlePayment} loading={loading} />
              </div>
            )}
            
            {useBonus && finalTotal === 0 && (
              <button
                onClick={() => handlePayment(null)}
                disabled={loading}
                className="w-full btn-glow py-4 mt-4"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  'Complete Order with Bonus'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;