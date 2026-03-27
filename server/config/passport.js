const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = function(passport) {
  // Проверяем, есть ли ключи Google
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        
        if (!user) {
          user = await User.findOne({ email: profile.emails[0].value });
          
          if (!user) {
            user = await User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
              avatar: profile.photos[0]?.value,
              password: Math.random().toString(36)
            });
          } else {
            user.googleId = profile.id;
            await user.save();
          }
        }
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '30d'
        });
        
        return done(null, { user, token });
      } catch (err) {
        return done(err, null);
      }
    }));
  } else {
    console.log('⚠️ Google OAuth not configured. Skipping...');
  }
};