import { Settings, LineChart, FolderKanban, Wrench, Lightbulb } from 'lucide-react';
import { services } from '../data/services';

const serviceIcons = {
  modules: <Settings className="text-4xl text-primary" />,
  erp: <LineChart className="text-4xl text-primary" />,
  gestion: <FolderKanban className="text-4xl text-primary" />,
  support: <Wrench className="text-4xl text-primary" />,
  audit: <Lightbulb className="text-4xl text-primary" />
};

export default function EgServices() {
  const firstRow = services.slice(0, 3);
  const secondRow = services.slice(3);

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-primary mb-12">
          Nos Services
        </h2>

        {/* Première rangée - 3 cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {firstRow.map((service) => (
            <div
              key={service.id}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="h-16 flex items-center mb-4">
                {serviceIcons[service.id]}
              </div>
              <h3 className="text-xl font-bold mb-3 h-20 flex items-center">
                {service.title}
              </h3>
              <p className="text-gray-600 flex-grow">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Deuxième rangée - 2 cartes centrées */}
        <div className="flex justify-center gap-8 flex-wrap mb-12">
          {secondRow.map((service) => (
            <div
              key={service.id}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full w-full md:w-96"
            >
              <div className="h-16 flex items-center mb-4">
                {serviceIcons[service.id]}
              </div>
              <h3 className="text-xl font-bold mb-3 h-20 flex items-center">
                {service.title}
              </h3>
              <p className="text-gray-600 flex-grow">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-primary hover:bg-primary-light text-white font-bold py-3 px-8 rounded-full transition duration-300">
            Parlons de votre projet
          </button>
        </div>
      </div>
    </section>
  );
}