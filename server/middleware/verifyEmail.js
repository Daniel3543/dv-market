const User = require('../models/User');

exports.requireVerifiedEmail = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user.isEmailVerified) {
      return res.status(403).json({
        success: false,
        message: 'Please verify your email address first'
      });
    }
    
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};