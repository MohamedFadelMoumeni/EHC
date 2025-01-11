import React from 'react';

const LoginButton = ({ children, ...props }) => {
  return (
    <button
      className="w-full bg-[#168187] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#136b6d] focus:outline-none focus:ring-2 focus:ring-[#168187] focus:ring-opacity-50 transition duration-150 ease-in-out shadow-sm"
      {...props}
    >
      {children}
    </button>
  );
};

export default LoginButton;
