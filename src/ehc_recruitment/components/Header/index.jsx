import React from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';
import AnimatedText from './AnimatedText';
import AnimatedButtons from './AnimatedButtons';

export default function Header() {
  return (
    <header className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      <AnimatedBackground />
      
      <motion.div 
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <AnimatedText />
        <AnimatedButtons />
      </motion.div>
    </header>
  );
}