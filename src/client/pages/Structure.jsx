import { motion } from 'framer-motion';
import {
  Users,
  Lightbulb,
  Monitor,
  Calendar,
  Settings,
  Rocket,
  CheckCircle,
  Star,
  Handshake,
  Brain,
} from 'lucide-react';
import {structure_company} from "../../assets";

function Structure() {
  const services = [
    { icon: <Users />, title: "Recrutement", description: "Identification et sélection des meilleurs talents" },
    { icon: <Lightbulb />, title: "Conseil", description: "Solutions stratégiques et opérationnelles" },
    { icon: <Monitor />, title: "Formation", description: "Programmes de formation sur mesure" },
    { icon: <Calendar />, title: "Événements", description: "Organisation d'événements professionnels" },
    { icon: <Settings />, title: "Ingénierie", description: "Solutions techniques innovantes" }
  ];

  const values = [
    { icon: <Rocket />, title: "Innovation", description: "Toujours à l'avant-garde, nous développons des solutions créatives et adaptées pour anticiper et relever vos défis." },
    { icon: <CheckCircle />, title: "Agilité", description: "Nous nous adaptons rapidement à vos besoins en constante évolution pour garantir des résultats efficaces et durables." },
    { icon: <Star />, title: "Excellence", description: "Nous visons l'excellence dans toutes nos prestations, en offrant des services de haute qualité." },
    { icon: <Handshake />, title: "Engagement", description: "Nous nous investissons pleinement pour construire des partenariats solides et atteindre vos objectifs stratégiques." },
    { icon: <Brain />, title: "Expertise", description: "Forts d'une expérience reconnue, nous mettons à votre disposition un savoir-faire pointu et actualisé." }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="green-gradient-bg text-white py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 text-center"
        >
          <h1 className="text-white text-5xl font-bold mb-6">Le Groupe EHC</h1>
          <p className="text-white text-xl mb-8">Votre partenaire stratégique pour l'excellence et l'innovation</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-[#168187] px-8 py-3 rounded-full font-semibold"
          >
            Découvrir nos services
          </motion.button>
        </motion.div>
      </header>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#168187]">Nos Domaines d'Expertise</h2>
          
          {/* Première rangée - 3 services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {services.slice(0, 3).map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg card-hover flex flex-col h-full"
              >
                <div className="text-[#168187] text-3xl mb-4 h-16 flex items-center">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2 h-16 flex items-center">{service.title}</h3>
                <p className="text-gray-600 flex-grow">{service.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Deuxième rangée - 2 services centrés */}
          <div className="flex justify-center gap-8 flex-wrap">
            {services.slice(3).map((service, index) => (
              <motion.div
                key={index + 3}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 3) * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg card-hover flex flex-col h-full w-full md:w-96"
              >
                <div className="text-[#168187] text-3xl mb-4 h-16 flex items-center">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2 h-16 flex items-center">{service.title}</h3>
                <p className="text-gray-600 flex-grow">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#168187]">Nos Valeurs Fondamentales</h2>
          
          {/* Première rangée - 3 valeurs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {values.slice(0, 3).map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white border-2 border-[#168187] p-8 rounded-lg shadow-lg flex flex-col h-full"
              >
                <div className="text-4xl mb-4 text-[#168187] h-16 flex items-center">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-[#168187] h-16 flex items-center">{value.title}</h3>
                <p className="text-gray-600 flex-grow">{value.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Deuxième rangée - 2 valeurs centrées */}
          <div className="flex justify-center gap-8 flex-wrap">
            {values.slice(3).map((value, index) => (
              <motion.div
                key={index + 3}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 3) * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white border-2 border-[#168187] p-8 rounded-lg shadow-lg flex flex-col h-full w-full md:w-96"
              >
                <div className="text-4xl mb-4 text-[#168187] h-16 flex items-center">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-[#168187] h-16 flex items-center">{value.title}</h3>
                <p className="text-gray-600 flex-grow">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#168187]">Notre Organisation</h2>
          <div>
            <img src={structure_company} alt="structure" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="gradient-bg text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg mb-4">Le Groupe EHC, votre partenaire de confiance qui s'engage sur les résultats.</p>
          <p>&copy; {new Date().getFullYear()} Groupe EHC. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export default Structure;