import React from 'react';

const Button = ({ onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        bg-gradient-to-r from-teal-500 to-teal-700 
        hover:from-teal-600 hover:to-teal-800 
        text-white 
        font-semibold 
        py-3 
        px-6 
        rounded-lg 
        shadow-lg
        transform 
        hover:scale-105
        hover:shadow-xl 
        transition-all 
        duration-200
        focus:outline-none 
        focus:ring-2 
        focus:ring-teal-500 
        focus:ring-opacity-50
        text-lg
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;