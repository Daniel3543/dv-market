const nodemailer = require('nodemailer');

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Send email verification
exports.sendVerificationEmail = async (user, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  
  const mailOptions = {
    from: `"DV MARKET" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: 'Verify Your Email - DV MARKET',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2a 100%); padding: 40px; border-radius: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #00ff88, #ff3366); border-radius: 20px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
            <span style="font-size: 40px; font-weight: bold; color: white;">DV</span>
          </div>
          <h1 style="color: #00ff88; margin-bottom: 10px;">Welcome to DV MARKET!</h1>
          <p style="color: #cccccc;">Please verify your email address to start shopping</p>
        </div>
        
        <div style="background: rgba(255,255,255,0.05); border-radius: 15px; padding: 30px; text-align: center;">
          <p style="color: #ffffff; margin-bottom: 25px;">Click the button below to verify your email:</p>
          <a href="${verificationUrl}" style="display: inline-block; background: linear-gradient(135deg, #00ff88, #00cc6a); color: #0a0a0f; padding: 12px 30px; border-radius: 40px; text-decoration: none; font-weight: bold; transition: transform 0.3s;">Verify Email</a>
          <p style="color: #888888; font-size: 12px; margin-top: 25px;">This link expires in 24 hours.</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; color: #666666; font-size: 12px;">
          <p>If you didn't create an account, you can safely ignore this email.</p>
          <p>© 2024 DV MARKET - Future Farm</p>
        </div>
      </div>
    `,
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${user.email}`);
  } catch (error) {
    console.error('Email send error:', error);
  }
};

// Send password reset email
exports.sendPasswordResetEmail = async (user, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  
  const mailOptions = {
    from: `"DV MARKET" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: 'Reset Your Password - DV MARKET',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2a 100%); padding: 40px; border-radius: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #00ff88, #ff3366); border-radius: 20px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
            <span style="font-size: 40px; font-weight: bold; color: white;">DV</span>
          </div>
          <h1 style="color: #ff3366; margin-bottom: 10px;">Reset Password</h1>
          <p style="color: #cccccc;">Click the button below to reset your password</p>
        </div>
        
        <div style="background: rgba(255,255,255,0.05); border-radius: 15px; padding: 30px; text-align: center;">
          <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #ff3366, #ff6b35); color: white; padding: 12px 30px; border-radius: 40px; text-decoration: none; font-weight: bold;">Reset Password</a>
          <p style="color: #888888; font-size: 12px; margin-top: 25px;">This link expires in 1 hour.</p>
        </div>
      </div>
    `,
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${user.email}`);
  } catch (error) {
    console.error('Email send error:', error);
  }
};