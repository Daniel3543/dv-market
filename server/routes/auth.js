const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { 
  register, 
  login, 
  getMe, 
  updateProfile,
  addToFavorites, 
  removeFromFavorites,
  getReferralInfo,
  deductBonus,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const passport = require('passport');

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', login);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, getMe);

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, updateProfile);

// @route   POST /api/auth/favorites
// @desc    Add to favorites
// @access  Private
router.post('/favorites', protect, addToFavorites);

// @route   DELETE /api/auth/favorites/:productId
// @desc    Remove from favorites
// @access  Private
router.delete('/favorites/:productId', protect, removeFromFavorites);

// @route   GET /api/auth/referral
// @desc    Get referral info
// @access  Private
router.get('/referral', protect, getReferralInfo);

// @route   PUT /api/auth/deduct-bonus
// @desc    Deduct bonus from user balance
// @access  Private
router.put('/deduct-bonus', protect, deductBonus);

// Email verification routes
router.get('/verify-email/:token', verifyEmail);
router.post('/resend-verification', resendVerification);

// Password reset routes
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

// Google OAuth (only if configured)
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  router.get('/google/callback', 
    passport.authenticate('google', { session: false, failureRedirect: '/auth' }),
    (req, res) => {
      const { token, user } = req.user;
      res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`);
    }
  );
} else {
  console.log('⚠️ Google OAuth routes disabled - missing credentials');
}

module.exports = router;