import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false }) => {
  const baseStyles = 'px-6 py-3 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200',
    secondary: 'bg-white text-blue-600 border border-blue-100 hover:bg-blue-50',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    success: 'bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-200',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
