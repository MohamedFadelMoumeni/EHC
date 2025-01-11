import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <motion.div 
      className="absolute inset-0 bg-primary/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <motion.img 
        src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-1.2.1&auto=format&fit=crop&q=80"
        alt="Background" 
        className="w-full h-full object-cover mix-blend-overlay"
        initial={{ scale: 1.2, filter: "blur(8px)" }}
        animate={{ 
          scale: 1,
          filter: "blur(0px)",
        }}
        transition={{ 
          duration: 2,
          ease: "easeOut"
        }}
      />
      
      {/* Animated gradient overlays */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-primary/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-primary/90" />
      </motion.div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 50 - 25, 0],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Animated lines */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-px bg-white/20"
            style={{
              width: '100%',
              top: `${15 + i * 15}%`,
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.5, 0],
              x: ['-100%', '0%', '100%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: i * 1.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}