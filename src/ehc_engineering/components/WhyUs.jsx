import { Star, Settings, Users, Rocket, Lightbulb } from 'lucide-react';

const reasons = [
  {
    icon: <Star className="text-3xl text-primary" />,
    title: "Expertise technique avancée",
    description: "Une équipe hautement qualifiée à votre service"
  },
  {
    icon: <Settings className="text-3xl text-primary" />,
    title: "Solutions sur mesure",
    description: "Des solutions adaptées à vos besoins spécifiques"
  },
  {
    icon: <Users className="text-3xl text-primary" />,
    title: "Gestion de projets agile",
    description: "Une approche flexible et efficace"
  },
  {
    icon: <Rocket className="text-3xl text-primary" />,
    title: "Accompagnement complet",
    description: "Un support continu tout au long du projet"
  },
  {
    icon: <Lightbulb className="text-3xl text-primary" />,
    title: "Engagement innovation",
    description: "Toujours à la pointe de la technologie"
  }
];

export default function EgWhyUs() {
  const firstRow = reasons.slice(0, 3);
  const secondRow = reasons.slice(3);

  return (
    <section id="why-us" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-primary mb-12">
          Pourquoi nous choisir ?
        </h2>

        {/* Première rangée - 3 cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {firstRow.map((reason, index) => (
            <div 
              key={index}
              className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="h-16 flex items-center mb-4">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 h-16 flex items-center">
                {reason.title}
              </h3>
              <p className="text-gray-600 flex-grow">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Deuxième rangée - 2 cartes centrées */}
        <div className="flex justify-center gap-8 flex-wrap">
          {secondRow.map((reason, index) => (
            <div 
              key={index + 3}
              className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 flex flex-col h-full w-full md:w-96"
            >
              <div className="h-16 flex items-center mb-4">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 h-16 flex items-center">
                {reason.title}
              </h3>
              <p className="text-gray-600 flex-grow">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}