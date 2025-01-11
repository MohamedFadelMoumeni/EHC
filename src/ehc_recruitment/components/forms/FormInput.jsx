import React from 'react';
import { motion } from 'framer-motion';

export default function FormInput({ label, type, name, required, ...props }) {
  return (
    <motion.div 
      className="space-y-1"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-shadow"
        {...props}
      />
    </motion.div>
  );
}