import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function EvHero() {
  return (
    <div className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
      <motion.div 
        className="absolute inset-0 bg-cover bg-center"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')" }}
      />
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl text-white">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Bienvenue chez EHC Services & Events
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Votre solution tout-en-un pour des services et des événements sur mesure
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <a href="#contact_events">
              <button className="btn-primary flex items-center gap-2">
                Envoyer un message
                <ArrowRight size={20} />
              </button>
            </a>

          </motion.div>
        </div>
      </div>
    </div>
  )
}
