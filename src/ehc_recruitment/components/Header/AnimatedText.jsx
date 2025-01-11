import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedText() {
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.05
      }
    })
  };

  const title = "Bienvenue chez EHC Recruiting";

  return (
    <div className="text-center relative z-10">
      <motion.h1 
        className="text-6xl font-bold mb-6 leading-tight"
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="overflow-hidden">
          {title.split('').map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>
      </motion.h1>
      
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.button
    className="text-2xl font-semibold bg-[#168187] text-white py-3 px-6 rounded-lg mb-8 max-w-md mx-auto"
    animate={{
      textShadow: [
        "0 0 0px rgba(255,255,255,0)",
        "0 0 10px rgba(255,255,255,0.5)",
        "0 0 0px rgba(255,255,255,0)"
      ]
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse"
    }}
  >
    Votre partenaire stratégique pour un recrutement d'excellence
  </motion.button>

      </motion.div>
    </div>
  );
}