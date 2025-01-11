import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function QuoteForm() {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    serviceType: '',
    approximateBudget: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("http://localhost:8081/api/requestquotes", data);
      toast.success('Votre demande a été envoyée avec succès!');
      setData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        serviceType: '',
        approximateBudget: '',
        message: '',
      });
    } catch (error) {
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const formContainerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.form
      variants={formContainerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
      onSubmit={handleSubmit}
    >
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
        <input
          type="text"
          name="firstName"
          value={data.firstName}
          onChange={handleChange}
          placeholder="Prénom *"
          className="col-span-2 sm:col-span-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          required
        />
        <input
          type="text"
          name="lastName"
          value={data.lastName}
          onChange={handleChange}
          placeholder="Nom *"
          className="col-span-2 sm:col-span-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          required
        />
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Email *"
          className="col-span-2 sm:col-span-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          required
        />
        <input
          type="tel"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          placeholder="Téléphone *"
          className="col-span-2 sm:col-span-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          required
        />
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
        <select
          name="serviceType"
          value={data.serviceType}
          onChange={handleChange}
          className="col-span-2 sm:col-span-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          required
        >
          <option value="" disabled>Type de prestation *</option>
          <option value="Management des organisations">Conception de modules spécifiques</option>
          <option value="Digitalisation Performance">Mise en place d'ERP intégrés</option>
          <option value="Performance globale">Gestion de projets clés en main </option>
          <option value="Performance globale">Support et maintenance </option>
          <option value="Performance globale">Audit et conseil </option>
          <option value="Performance globale">Autre </option>
        </select>
        <select
          name="approximateBudget"
          value={data.approximateBudget}
          onChange={handleChange}
          className="col-span-2 sm:col-span-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          required
        >
          <option value="" disabled>Budget approximatif *</option>
          <option value="Less than $500">Moins de 500€</option>
          <option value="$500 - $1000">500€ - 1000€</option>
          <option value="More than $1000">Plus de 1000€</option>
        </select>
      </motion.div>

      <motion.textarea
        variants={itemVariants}
        name="message"
        value={data.message}
        onChange={handleChange}
        placeholder="Message *"
        rows="4"
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
        required
      />

      <motion.button
        variants={itemVariants}
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition flex items-center justify-center gap-2 disabled:opacity-50"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? (
          <>Envoi en cours...</>
        ) : (
          <>
            Demander un devis
            <ArrowRight className="animate-pulse" />
          </>
        )}
      </motion.button>
    </motion.form>
  );
}