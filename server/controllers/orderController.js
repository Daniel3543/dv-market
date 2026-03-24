const Order = require('../models/Order');
const Cart = require('../models/Cart');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @desc    Create order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress, paymentMethod } = req.body;
    
    // Create order
    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
      shippingAddress,
      paymentStatus: 'pending'
    });
    
    // Clear user's cart
    await Cart.findOneAndUpdate(
      { user: req.user.id },
      { items: [], updatedAt: Date.now() }
    );
    
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100),
      currency: 'usd',
      metadata: { orderId: order._id.toString() }
    });
    
    res.status(201).json({
      success: true,
      order,
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.product')
      .sort('-createdAt');
    
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if order belongs to user
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update payment status
// @route   PUT /api/orders/:id/payment
// @access  Private
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus, paymentIntentId } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus, paymentIntentId },
      { new: true }
    );
    
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};