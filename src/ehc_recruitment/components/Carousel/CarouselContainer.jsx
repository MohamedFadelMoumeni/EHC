import React from 'react';
import { motion } from 'framer-motion';

export default function CarouselContainer({ children, title }) {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>
        <div className="relative">
          {children}
        </div>
      </div>
    </section>
  );
}