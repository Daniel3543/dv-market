# DV MARKET - Premium Fruit & Vegetable Store

## 🚀 Features
- Modern React frontend with Tailwind CSS
- Node.js + Express backend  
- MongoDB database
- Stripe payment integration
- JWT authentication
- Shopping cart and wishlist
- Order history
- Responsive design

## 🛠️ Tech Stack
- **Frontend**: React 18, React Router, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js, JWT
- **Database**: MongoDB with Mongoose
- **Payment**: Stripe
- **Deployment**: Render

## 📦 Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Stripe account (optional)

### Setup
\\\ash
# Clone repository
git clone https://github.com/Daniel3543/dv-market.git
cd dv-market

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Set up environment variables
cp .env.example .env  # Configure your variables

# Seed database
cd ../server
npm run seed

# Start development
npm run dev  # Server: http://localhost:5000
# In another terminal
cd client
npm start    # Client: http://localhost:3000
\\\

## 🌐 Live Demo
Visit: [https://dv-market.onrender.com](https://dv-market.onrender.com)

## 📝 Test Credentials
- Email: test@example.com
- Password: admin123

## 🔧 Environment Variables

### Server (.env)
\\\
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dvmarket
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=sk_test_...
NODE_ENV=development
\\\

### Client (.env)
\\\
REACT_APP_API_URL=http://localhost:5000/api
\\\

## 📄 License
MIT © 2024 DV MARKET
