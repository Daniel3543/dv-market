const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    
    console.log('📡 Connecting to MongoDB...');
    
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database Name: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    
    // More detailed error for Atlas connection issues
    if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      console.error('💡 Tip: Check your internet connection and MongoDB Atlas cluster URL');
    } else if (error.message.includes('Authentication failed')) {
      console.error('💡 Tip: Check your MongoDB username and password');
    } else if (error.message.includes('whitelist')) {
      console.error('💡 Tip: Add your IP address to MongoDB Atlas Network Access list');
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;