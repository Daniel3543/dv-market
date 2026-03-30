const nodemailer = require('nodemailer');

// Create transporter (will be configured when email is used)
let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  return transporter;
};

// Send email verification
exports.sendVerificationEmail = async (user, token) => {
  // If email not configured, log and return
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.log('⚠️ Email not configured. Verification email would be sent to:', user.email);
    console.log('Verification token:', token);
    return;
  }

  const verificationUrl = `${process.env.FRONTEND_URL || 'https://dv-market.onrender.com'}/verify-email?token=${token}`;
  
  const mailOptions = {
    from: `"DV MARKET" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: 'Verify Your Email - DV MARKET',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; padding: 40px; border-radius: 20px;">
        <div style="text-align: center;">
          <h1 style="color: #00ff88;">DV MARKET</h1>
          <h2>Welcome to the Future of Fresh Produce!</h2>
          <p>Please verify your email address to start shopping.</p>
          <a href="${verificationUrl}" style="display: inline-block; background: #00ff88; color: #0a0a0f; padding: 12px 30px; border-radius: 40px; text-decoration: none; font-weight: bold;">Verify Email</a>
          <p style="margin-top: 20px; color: #888;">This link expires in 24 hours.</p>
        </div>
      </div>
    `,
  };
  
  try {
    await getTransporter().sendMail(mailOptions);
    console.log(`✅ Verification email sent to ${user.email}`);
  } catch (error) {
    console.error('❌ Email send error:', error.message);
  }
};

// Send password reset email
exports.sendPasswordResetEmail = async (user, token) => {
  // If email not configured, log and return
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.log('⚠️ Email not configured. Password reset email would be sent to:', user.email);
    console.log('Reset token:', token);
    return;
  }

  const resetUrl = `${process.env.FRONTEND_URL || 'https://dv-market.onrender.com'}/reset-password?token=${token}`;
  
  const mailOptions = {
    from: `"DV MARKET" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: 'Reset Your Password - DV MARKET',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; padding: 40px; border-radius: 20px;">
        <div style="text-align: center;">
          <h1 style="color: #ff3366;">Reset Your Password</h1>
          <p>Click the button below to reset your password.</p>
          <a href="${resetUrl}" style="display: inline-block; background: #ff3366; color: white; padding: 12px 30px; border-radius: 40px; text-decoration: none; font-weight: bold;">Reset Password</a>
          <p style="margin-top: 20px; color: #888;">This link expires in 1 hour.</p>
        </div>
      </div>
    `,
  };
  
  try {
    await getTransporter().sendMail(mailOptions);
    console.log(`✅ Password reset email sent to ${user.email}`);
  } catch (error) {
    console.error('❌ Email send error:', error.message);
  }
};