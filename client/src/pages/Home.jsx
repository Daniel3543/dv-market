import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import api from '../services/api';
import ProductCard from '../components/Product/ProductCard';
import Loader from '../components/UI/Loader';

const Home = () => {
  const { data: featuredProducts, isLoading } = useQuery(
    'featuredProducts',
    async () => {
      const { data } = await api.get('/products/featured');
      return data.products;
    }
  );

  const categories = [
    { name: 'Fruits', icon: '🍎', color: 'from-red-400 to-red-600' },
    { name: 'Vegetables', icon: '🥬', color: 'from-green-400 to-green-600' },
    { name: 'Exotic', icon: '🥑', color: 'from-purple-400 to-purple-600' },
    { name: 'Organic', icon: '🌱', color: 'from-emerald-400 to-emerald-600' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-accent-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container-custom relative py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Fresh Fruits & Vegetables
            </h1>
            <p className="text-xl mb-8">
              Farm-fresh produce delivered to your doorstep. Quality you can taste!
            </p>
            <Link
              to="/catalog"
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group cursor-pointer"
              >
                <div className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 text-center transform group-hover:scale-105 transition-all duration-300`}>
                  <div className="text-5xl mb-3">{category.icon}</div>
                  <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts?.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🚚', title: 'Free Delivery', desc: 'On orders over $50' },
              { icon: '🌱', title: 'Organic Quality', desc: '100% fresh produce' },
              { icon: '💯', title: 'Money Back', desc: '30-day guarantee' },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;