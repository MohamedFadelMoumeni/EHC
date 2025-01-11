import React from 'react';
import { motion } from 'framer-motion';

export default function RcAboutMission() {
  return (
    <section id="apropos_recrutement" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Main Title */}
        <motion.h1 
          className="text-5xl font-bold text-center mb-16 text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          À propos de EHC Recruiting
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Histoire Column */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-primary">Notre Histoire</h2>
            <p className="text-lg text-gray-700 leading-relaxed text-justify">
              EHC Recruiting est une Business Unit dédiée à l'art et à la science du recrutement. 
              Nous mettons à votre disposition une expertise éprouvée et des solutions sur-mesure 
              pour identifier, attirer et intégrer les meilleurs talents, du top management au 
              middle management. Avec une approche personnalisée et une plateforme digitale 
              innovante, nous simplifions et optimisons vos processus de recrutement pour 
              répondre à vos besoins spécifiques.
            </p>
          </motion.div>

          {/* Mission Column */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-primary">Notre Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed text-justify">
              Chez EHC Recruiting, notre mission est d'accompagner les organisations dans leur 
              quête des meilleurs talents, en alignant notre expertise sur leurs exigences 
              stratégiques. Nous combinons des techniques de chasse de tête rigoureuses, des 
              outils technologiques modernes et un accompagnement intégral pour garantir un 
              recrutement réussi, tout en respectant les spécificités et les valeurs de 
              chaque client.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}