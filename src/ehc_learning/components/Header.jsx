import { motion } from 'framer-motion';
import { AnimatedText } from './AnimatedText';

export default function LrHeader() {
  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Animated Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 z-10"
      />
      
      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto text-white">
        <AnimatedText 
          text="Bienvenue chez EHC Learning"
          className="text-6xl font-bold mb-8 leading-tight"
        />
        
        <AnimatedText 
          text="Votre partenaire en ingénierie de formation pour des compétences stratégiques et opérationnelles"
          className="text-2xl mb-12 leading-relaxed font-light"
        />
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.a
                href="#services_learning"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-primary rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
              >
                Découvrir nos solutions
            </motion.a>

          
            <motion.a
              href="#contact_learning"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all w-full sm:w-auto"
            >
              Contactez-nous
          </motion.a>

        </div>
      </div>
    </header>
  );
}