import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useQuery } from 'react-query';
import api from '../services/api';
import ProductCard3D from '../components/Product/ProductCard3D';
import GlowButton from '../components/UI/GlowButton';
import NeonText from '../components/UI/NeonText';
import Skeleton from '../components/UI/Skeleton';
import { FiArrowRight, FiTrendingUp, FiTruck, FiShield, FiStar } from 'react-icons/fi';

const Home = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const heroRef = useRef(null);

  const { data: featuredProducts, isLoading } = useQuery(
    'featuredProducts',
    async () => {
      const { data } = await api.get('/products/featured');
      return data.products;
    }
  );

  const categories = [
    { name: 'Fruits', icon: '🍎', glow: '#ff6b35', color: 'from-orange-500 to-red-500' },
    { name: 'Vegetables', icon: '🥬', glow: '#00ff88', color: 'from-green-500 to-emerald-500' },
    { name: 'Exotic', icon: '🥑', glow: '#ff3366', color: 'from-pink-500 to-purple-500' },
    { name: 'Organic', icon: '🌱', glow: '#00ccff', color: 'from-cyan-500 to-blue-500' },
  ];

  const benefits = [
    { icon: <FiTruck className="text-3xl" />, title: 'Lightning Delivery', desc: '30 min express delivery', glow: '#00ff88' },
    { icon: <FiShield className="text-3xl" />, title: '100% Organic', desc: 'Certified fresh produce', glow: '#ff3366' },
    { icon: <FiTrendingUp className="text-3xl" />, title: 'Bonus System', desc: 'Get 10% cashback', glow: '#ff6b35' },
    { icon: <FiStar className="text-3xl" />, title: 'Premium Quality', desc: 'Selected by experts', glow: '#00ccff' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section с 3D эффектом */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Анимированный фон */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full blur-3xl"></div>
        </div>

        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 text-center px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <NeonText className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              FUTURE FARM
            </NeonText>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience the future of fresh produce — where technology meets nature.
              Organic fruits & vegetables delivered with quantum speed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlowButton to="/catalog" size="lg">
                Explore Collection <FiArrowRight className="inline ml-2" />
              </GlowButton>
              <GlowButton to="/auth" variant="outline" size="lg">
                Join the Future
              </GlowButton>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll индикатор */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/50 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Explore <span className="neon-text">Categories</span>
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card p-8 text-center cursor-pointer group"
                style={{ '--glow': cat.glow }}
              >
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-semibold">{cat.name}</h3>
                <div className={`w-12 h-0.5 bg-gradient-to-r ${cat.color} mx-auto mt-3 group-hover:w-24 transition-all`}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-white/5">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Featured <span className="neon-text">Harvest</span>
            </h2>
            <p className="text-gray-400 mt-2">Hand-picked premium selections</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              [...Array(4)].map((_, i) => <Skeleton key={i} className="h-80 rounded-2xl" />)
            ) : (
              featuredProducts?.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard3D product={product} />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center text-primary-400">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10"></div>
          <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass p-12 rounded-3xl max-w-3xl mx-auto"
          >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to <span className="neon-text">Join the Future?</span>
          </h2>
          <p className="text-gray-300 mb-8">
            Get 2.5 AMD bonus on your first order + exclusive offers
          </p>
          <GlowButton to="/auth" size="lg">
            Start Shopping
          </GlowButton>
        </motion.div>
      </div>
    </section>
    </div>
  );
};

export default Home;