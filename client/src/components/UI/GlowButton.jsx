import React from 'react';
import { Link } from 'react-router-dom';

const GlowButton = ({ children, to, onClick, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-dark hover:shadow-lg hover:shadow-primary-500/50',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500/10',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const Component = to ? Link : 'button';
  const propsToPass = to ? { to } : { onClick, type: 'button' };
  
  return (
    <Component
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...propsToPass}
      {...props}
    >
      {children}
    </Component>
  );
};

export default GlowButton;