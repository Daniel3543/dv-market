const express = require('express');
const router = express.Router();
const { getProducts, getProduct, getFeaturedProducts, createProduct } = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProduct);
router.post('/', protect, authorize('admin'), createProduct);

module.exports = router;