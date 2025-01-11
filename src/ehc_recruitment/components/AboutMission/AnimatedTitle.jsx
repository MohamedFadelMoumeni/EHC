import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedTitle({ children }) {
  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: -50
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.h1 
      className="text-5xl font-bold text-center mb-16 text-primary"
      variants={titleVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.h1>
  );
}