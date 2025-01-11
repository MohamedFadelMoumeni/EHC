import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureCard({ title, description }) {
  return (
    <motion.div 
      className="flex-shrink-0 w-80 p-6 mx-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 text-justify">{description}</p>
    </motion.div>
  );
}