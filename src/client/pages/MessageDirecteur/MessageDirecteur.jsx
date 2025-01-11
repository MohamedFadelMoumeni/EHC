import { motion } from 'framer-motion';
import './MessageDirecteur.css';
import {  dir } from "../../../assets";

function MessageDirecteur() {
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const directorVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 } },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.3, ease: 'easeOut' },
    }),
  };

  return (
    <div className="message-directeur">
      <div className="content-wrapper">
        <motion.div
          className="text-section"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          {/* Ajoutez le titre ici */}
           <motion.h2
            className="director-title"
            initial="hidden"
            animate="visible"
            variants={messageVariants}
            custom={0}
          >
            Message de directeur
          </motion.h2>
          
          {[
           "EXPERTS HUMAN CAPITAL est un HUB d'experts marocains et étrangers réunis par la passion du développement du capital humain, de la digitalisation, et de la performance des organisations.",
            "Nous mettons notre expertise et notre ardeur au service de la réussite des projets de nos chers clients, quelques soit leurs secteurs d'activités.",
            "Nous offrons des solutions sur mesure qui garantissent des résultats concrets.",
            "Nos équipes œuvrent quotidiennement au sein de nos cinq business unit, afin que chaque collaboration avec EHC Groupe, soit un vecteur de succès et de croissance durable pour votre organisation.",
            "Taha DRHORHI - Directeur Général - EHC Groupe"
            
          ].map((text, i) => (
            <motion.p
              key={i}
              className="message"
              custom={i}
              initial="hidden"
              animate="visible"
              variants={messageVariants}
            >
              {text}
            </motion.p>
          ))}
        </motion.div>

        <motion.div
          className="director-section"
          initial="hidden"
          animate="visible"
          variants={directorVariants}
        >
          <div className="image-container">
            <img 
              src=  {dir} 
              alt="Taha DRHORHI - Directeur Général" 
              className="director-image"
            />
          </div>
         
        </motion.div>
      </div>
    </div>
  );
}

export default MessageDirecteur;

