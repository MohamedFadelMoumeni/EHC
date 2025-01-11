import React from 'react';
import { motion } from 'framer-motion';

export default function CallToAction() {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          className="text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Recrutez l'excellence avec EHC Recruiting
        </motion.h2>
        
        <div className="space-x-4">
          <motion.button 
            className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Parlez à un expert
          </motion.button>
          <motion.button 
            className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Voir nos réussites
          </motion.button>
        </div>
      </div>
    </section>
  );
}