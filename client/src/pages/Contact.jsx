import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from 'react-icons/fi';
import GlowButton from '../components/UI/GlowButton';
import NeonText from '../components/UI/NeonText';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setLoading(false);
  };

  const contactInfo = [
    { icon: <FiMapPin />, title: 'Address', value: 'Yerevan, Armenia', color: '#00ff88' },
    { icon: <FiPhone />, title: 'Phone', value: '+374 77 383631', color: '#ff3366', link: 'tel:+37477383631' },
    { icon: <FiMail />, title: 'Email', value: 'danielmnacakanan60@gmail.com', color: '#ff6b35', link: 'mailto:danielmnacakanan60@gmail.com' },
    { icon: <FiClock />, title: 'Working Hours', value: 'Mon-Sat: 9:00 - 21:00', color: '#00ccff' },
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      {/* Hero Section */}
      <section className="relative mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <NeonText as="h1" className="text-5xl md:text-7xl font-bold mb-6">
            Contact Us
          </NeonText>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>
      </section>

      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500 resize-none"
                  placeholder="Your message..."
                />
              </div>
              <GlowButton type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </div>
                ) : (
                  <>
                    <FiSend className="inline mr-2" />
                    Send Message
                  </>
                )}
              </GlowButton>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 text-xl">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{info.title}</h3>
                      {info.link ? (
                        <a href={info.link} className="text-gray-400 hover:text-primary-400 transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-400">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="glass-card p-4 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3049.5!2d44.515!3d40.182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDEwJzU1LjIiTiA0NMKwMzAnNTQuMCJF!5e0!3m2!1sen!2sam!4v1700000000000!5m2!1sen!2sam"
                width="100%"
                height="250"
                style={{ border: 0, borderRadius: '16px' }}
                allowFullScreen=""
                loading="lazy"
                title="Location Map"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;