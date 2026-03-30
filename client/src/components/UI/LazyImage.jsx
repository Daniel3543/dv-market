import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const LazyImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className="relative overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 animate-pulse" />
      )}
      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </div>
  );
};

export default LazyImage;