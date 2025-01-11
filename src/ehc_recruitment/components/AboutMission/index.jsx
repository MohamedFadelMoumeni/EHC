import React from 'react';
import { motion } from 'framer-motion';
import AboutCard from './AboutCard';
import { aboutContent } from './content';

export default function AboutMission() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          À propos de EHC Recruiting
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AboutCard 
            title="Notre Histoire"
            content={aboutContent.histoire}
            delay={0.3}
          />
          <AboutCard 
            title="Notre Mission"
            content={aboutContent.mission}
            delay={0.6}
          />
        </div>
      </div>
    </section>
  );
}