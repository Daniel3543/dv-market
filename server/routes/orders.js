const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrder, updatePaymentStatus } = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createOrder);
router.get('/', protect, getOrders);
router.get('/:id', protect, getOrder);
router.put('/:id/payment', protect, updatePaymentStatus);

module.exports = router;