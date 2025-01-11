import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function AboutCard({ title, content, delay }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <motion.div
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ backgroundColor: 'rgba(22, 129, 135, 0.05)' }}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-primary">{title}</h3>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-primary"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 9l-7 7-7-7" 
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        <div className="p-6 pt-0">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: isExpanded ? 0 : -20 }}
            transition={{ duration: 0.3 }}
          >
            {content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-600 mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}