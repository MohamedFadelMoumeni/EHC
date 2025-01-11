import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedButtons() {
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: custom * 0.2 + 1.2,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="space-x-6">
      <motion.button 
        className="bg-white text-primary px-8 py-4 rounded-lg font-semibold shadow-lg"
        variants={buttonVariants}
        custom={1}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap={{ scale: 0.95 }}
      >
        Découvrez nos services
      </motion.button>
      <motion.button 
        className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
        variants={buttonVariants}
        custom={2}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap={{ scale: 0.95 }}
      >
        Contactez-nous
      </motion.button>
    </div>
  );
}