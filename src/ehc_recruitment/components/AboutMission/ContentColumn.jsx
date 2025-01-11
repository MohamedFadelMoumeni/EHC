import React from 'react';
import { motion } from 'framer-motion';

export default function ContentColumn({ title, content, direction }) {
  const columnVariants = {
    hidden: { 
      opacity: 0,
      x: direction === 'left' ? -100 : 100,
      scale: 0.9
    },
    visible: { 
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="p-8 bg-white rounded-lg shadow-lg transform-gpu"
      variants={columnVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.h2 
        className="text-3xl font-bold text-primary mb-6"
        variants={contentVariants}
      >
        {title}
      </motion.h2>
      <motion.div 
        className="text-lg text-gray-700 leading-relaxed space-y-4"
        variants={contentVariants}
      >
        {content.split('\n\n').map((paragraph, index) => (
          <motion.p 
            key={index}
            variants={contentVariants}
          >
            {paragraph}
          </motion.p>
        ))}
      </motion.div>
      <motion.div 
        className="mt-6 border-t-4 border-primary w-full"
        variants={{
          hidden: { scaleX: 0 },
          visible: { 
            scaleX: 1,
            transition: {
              duration: 0.6,
              delay: 0.3
            }
          }
        }}
      />
    </motion.div>
  );
}