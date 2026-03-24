const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { register, login, getMe, addToFavorites, removeFromFavorites } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], register);

router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/favorites', protect, addToFavorites);
router.delete('/favorites/:productId', protect, removeFromFavorites);

module.exports = router;