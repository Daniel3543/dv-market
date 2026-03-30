import React from 'react';

const NeonText = ({ children, className = '', as: Component = 'span', ...props }) => {
  return (
    <Component
      className={`neon-text ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default NeonText;