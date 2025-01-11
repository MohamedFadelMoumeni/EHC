import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ContactForm from './forms/ContactForm';
import QuoteForm from './forms/QuoteForm';

export default function RcContact() {
  const [activeForm, setActiveForm] = useState('contact');

  return (
    <section id="contact_recrutement" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Discutons de vos projets</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8 space-x-4">
            <motion.button
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                activeForm === 'contact' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveForm('contact')}
            >
              Contact
            </motion.button>
            <motion.button
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                activeForm === 'quote' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveForm('quote')}
            >
              Demande de devis
            </motion.button>
          </div>

          <motion.div
            key={activeForm}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeForm === 'contact' ? <ContactForm /> : <QuoteForm />}
          </motion.div>
        </div>
      </div>
    </section>
  );
}