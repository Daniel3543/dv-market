import React from 'react';
import { motion } from 'framer-motion';
import { FiFeather, FiTruck, FiHeart, FiUsers, FiAward, FiGlobe } from 'react-icons/fi';
import GlowButton from '../components/UI/GlowButton';
import NeonText from '../components/UI/NeonText';

const About = () => {
  const features = [
    { icon: <FiFeather />, title: '100% Organic', desc: 'Certified organic produce from local farms' },
    { icon: <FiTruck />, title: 'Lightning Delivery', desc: '30-minute express delivery to your door' },
    { icon: <FiHeart />, title: 'Premium Quality', desc: 'Hand-picked selection by experts' },
    { icon: <FiUsers />, title: 'Community Driven', desc: 'Supporting local farmers' },
    { icon: <FiAward />, title: 'Award Winning', desc: 'Best organic market 2024' },
    { icon: <FiGlobe />, title: 'Eco Friendly', desc: 'Zero-waste packaging' },
  ];

  const stats = [
    { value: '10K+', label: 'Happy Customers' },
    { value: '50+', label: 'Local Farmers' },
    { value: '30min', label: 'Avg Delivery' },
    { value: '100%', label: 'Organic Guarantee' },
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      {/* Hero Section */}
      <section className="relative mb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-3xl blur-3xl"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative text-center"
        >
          <NeonText as="h1" className="text-5xl md:text-7xl font-bold mb-6">
            About DV MARKET
          </NeonText>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We're on a mission to bring the freshest, most delicious organic produce 
            to your table, while supporting local farmers and sustainable agriculture.
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-8">
              <h2 className="text-3xl font-bold mb-4 neon-text">Our Mission</h2>
              <p className="text-gray-300 mb-4">
                To revolutionize the way people buy fresh produce by combining 
                cutting-edge technology with traditional farming wisdom.
              </p>
              <p className="text-gray-400">
                We believe that everyone deserves access to fresh, organic, and 
                sustainably grown fruits and vegetables. That's why we work directly 
                with local farmers to bring you the best quality at fair prices.
              </p>
              <GlowButton to="/catalog" className="mt-6">
                Shop Now
              </GlowButton>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600" 
                alt="Fresh produce" 
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Our Impact
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-primary-400">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Why Choose Us
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 text-2xl">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;