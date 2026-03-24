const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Load environment variables
dotenv.config();

// Check if MONGODB_URI exists
if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env file');
  console.error('Please create .env file with MONGODB_URI=mongodb://localhost:27017/dvmarket');
  process.exit(1);
}

console.log('📡 Connecting to MongoDB...');
console.log('🔗 Connection string:', process.env.MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')); // Hide credentials

const products = [
  {
    name: 'Organic Red Apples',
    category: 'fruits',
    price: 4.99,
    oldPrice: 6.99,
    description: 'Fresh, crisp organic apples from local farms. Sweet and juicy, perfect for snacking or baking. Rich in fiber and vitamin C.',
    images: ['https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500'],
    unit: 'kg',
    stock: 100,
    rating: 4.8,
    isOrganic: true,
    isFeatured: true
  },
  {
    name: 'Fresh Bananas',
    category: 'fruits',
    price: 2.99,
    oldPrice: 3.99,
    description: 'Sweet and ripe bananas, rich in potassium and perfect for smoothies, baking, or as a healthy snack.',
    images: ['https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=500'],
    unit: 'kg',
    stock: 150,
    rating: 4.7,
    isOrganic: false,
    isFeatured: true
  },
  {
    name: 'Organic Avocados',
    category: 'fruits',
    price: 3.99,
    description: 'Creamy, nutrient-rich avocados perfect for guacamole, toast, or salads. Packed with healthy fats.',
    images: ['https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500'],
    unit: 'piece',
    stock: 80,
    rating: 4.9,
    isOrganic: true,
    isFeatured: true
  },
  {
    name: 'Fresh Broccoli',
    category: 'vegetables',
    price: 2.49,
    description: 'Fresh green broccoli, rich in vitamins and fiber. Great for steaming, roasting, or adding to stir-fries.',
    images: ['https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=500'],
    unit: 'kg',
    stock: 120,
    rating: 4.6,
    isOrganic: false,
    isFeatured: false
  },
  {
    name: 'Organic Carrots',
    category: 'vegetables',
    price: 1.99,
    oldPrice: 2.99,
    description: 'Sweet and crunchy organic carrots, perfect for salads, cooking, or as a healthy snack. High in beta-carotene.',
    images: ['https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500'],
    unit: 'kg',
    stock: 200,
    rating: 4.8,
    isOrganic: true,
    isFeatured: true
  },
  {
    name: 'Fresh Strawberries',
    category: 'fruits',
    price: 5.99,
    description: 'Sweet and juicy strawberries, picked at peak ripeness. Perfect for desserts, smoothies, or eating fresh.',
    images: ['https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500'],
    unit: 'kg',
    stock: 60,
    rating: 4.9,
    isOrganic: false,
    isFeatured: false
  },
  {
    name: 'Organic Spinach',
    category: 'vegetables',
    price: 3.49,
    description: 'Fresh organic spinach leaves, perfect for salads, smoothies, and cooking. Rich in iron and vitamins.',
    images: ['https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500'],
    unit: 'kg',
    stock: 90,
    rating: 4.7,
    isOrganic: true,
    isFeatured: false
  },
  {
    name: 'Red Bell Peppers',
    category: 'vegetables',
    price: 3.99,
    description: 'Sweet and crunchy red bell peppers, rich in vitamin C. Perfect for salads, stir-fries, or stuffing.',
    images: ['https://images.unsplash.com/photo-1563565375-f3fdfdbefa3c?w=500'],
    unit: 'kg',
    stock: 110,
    rating: 4.6,
    isOrganic: false,
    isFeatured: false
  },
  {
    name: 'Fresh Blueberries',
    category: 'fruits',
    price: 6.99,
    description: 'Sweet and tangy blueberries, packed with antioxidants. Great for breakfast, baking, or snacking.',
    images: ['https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=500'],
    unit: 'kg',
    stock: 45,
    rating: 4.9,
    isOrganic: true,
    isFeatured: true
  },
  {
    name: 'Organic Tomatoes',
    category: 'vegetables',
    price: 4.49,
    description: 'Juicy organic tomatoes, perfect for salads, sauces, and sandwiches. Vine-ripened for maximum flavor.',
    images: ['https://images.unsplash.com/photo-1546094096-0df4bcaaa2a5?w=500'],
    unit: 'kg',
    stock: 85,
    rating: 4.7,
    isOrganic: true,
    isFeatured: false
  },
  {
    name: 'Fresh Lemons',
    category: 'fruits',
    price: 3.99,
    description: 'Fresh and tangy lemons, perfect for cooking, baking, and refreshing drinks. Rich in vitamin C.',
    images: ['https://images.unsplash.com/photo-1587397846896-45e2c12f3e2a?w=500'],
    unit: 'kg',
    stock: 130,
    rating: 4.8,
    isOrganic: false,
    isFeatured: false
  },
  {
    name: 'Organic Kale',
    category: 'vegetables',
    price: 3.99,
    description: 'Fresh organic kale, a superfood packed with nutrients. Great for salads, smoothies, and chips.',
    images: ['https://images.unsplash.com/photo-1524179091875-bf99a9a6af9f?w=500'],
    unit: 'kg',
    stock: 70,
    rating: 4.7,
    isOrganic: true,
    isFeatured: false
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Product.deleteMany();
    await User.deleteMany();
    console.log('✅ Existing data cleared\n');

    // Create admin user
    console.log('👤 Creating admin user...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@dvmarket.com',
      password: hashedPassword,
      role: 'admin'
    });
    console.log('✅ Admin user created:', admin.email);

    // Create regular user
    const testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
      role: 'user'
    });
    console.log('✅ Test user created:', testUser.email);
    console.log('');

    // Insert products
    console.log('📦 Inserting products...');
    const insertedProducts = await Product.insertMany(products);
    console.log(`✅ Inserted ${insertedProducts.length} products\n`);

    // Display summary
    console.log('='.repeat(50));
    console.log('🎉 DATABASE SEEDED SUCCESSFULLY! 🎉');
    console.log('='.repeat(50));
    console.log('\n📊 Summary:');
    console.log(`   - Users: 2 (1 admin, 1 regular)`);
    console.log(`   - Products: ${insertedProducts.length}`);
    console.log('\n🔐 Test Credentials:');
    console.log('   Admin:');
    console.log('     Email: admin@dvmarket.com');
    console.log('     Password: admin123');
    console.log('   Regular User:');
    console.log('     Email: test@example.com');
    console.log('     Password: admin123');
    console.log('\n📦 Sample Products:');
    insertedProducts.slice(0, 5).forEach(p => {
      console.log(`   - ${p.name} ($${p.price}/${p.unit})`);
    });
    console.log(`   ... and ${insertedProducts.length - 5} more products`);
    console.log('\n✨ Ready to start the server! Run: npm run dev');
    
    // Close connection
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding database:');
    console.error('   ', error.message);
    
    if (error.name === 'MongoServerError' && error.code === 8000) {
      console.error('\n💡 Tip: Check your MongoDB connection string in .env file');
    } else if (error.name === 'MongooseServerSelectionError') {
      console.error('\n💡 Tip: Make sure MongoDB is running');
      console.error('   - For local MongoDB: run "mongod" in another terminal');
      console.error('   - For MongoDB Atlas: check your internet connection and credentials');
    }
    
    process.exit(1);
  }
};

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n\n⚠️  Seed process interrupted');
  mongoose.connection.close();
  process.exit(0);
});

// Run seed
seedDatabase();