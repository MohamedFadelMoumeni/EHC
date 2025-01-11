import React from 'react';
import { motion } from 'framer-motion';

export default function ServiceCard({ icon: Icon, title, description }) {
  return (
    <motion.div 
    id="service-card"
      className="flex-shrink-0 w-80 p-6 mx-4 bg-white rounded-lg shadow-lg"
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col items-start">
        <Icon className="w-12 h-12 text-primary mb-4" />
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 text-left">{description}</p>
      </div>
    </motion.div>
  );
}