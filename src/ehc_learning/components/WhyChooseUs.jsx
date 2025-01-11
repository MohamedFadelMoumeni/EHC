import { motion } from 'framer-motion';
import { Award, Settings, Handshake, Star } from 'lucide-react';

const reasons = [
  {
    icon: <Award className="text-4xl" />,
    title: "Une expertise éprouvée en ingénierie pédagogique",
    description: "Avec une équipe d'experts en formation, nous concevons des parcours pédagogiques qui combinent innovation, pertinence et impact."
  },
  {
    icon: <Settings className="text-4xl" />,
    title: "Une offre personnalisée et flexible",
    description: "Que ce soit à travers nos formations standard ou sur-mesure, nous adaptons nos solutions à vos objectifs, vos contraintes et votre secteur d'activité."
  },
  {
    icon: <Handshake className="text-4xl" />,
    title: "Un accompagnement de bout en bout",
    description: "Nous ne nous contentons pas de proposer des formations ; nous accompagnons vos équipes depuis l'identification des besoins jusqu'à l'évaluation des résultats pour garantir le succès de vos projets de formation."
  },
  {
    icon: <Star className="text-4xl" />,
    title: "Un engagement envers l'excellence",
    description: "Nos formations sont conçues pour répondre aux normes les plus élevées en matière de pédagogie et de satisfaction client, avec un focus particulier sur la création de valeur pour les entreprises."
  }
];

export default function LrWhyChooseUs() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary">
          Pourquoi Choisir EHC Learning ?
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow h-full flex flex-col"
            >
              <div className="text-primary mb-4">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                {reason.title}
              </h3>
              <p className="text-gray-600 leading-relaxed flex-grow text-justify">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
