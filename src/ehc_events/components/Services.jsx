import { Calendar, ChartArea, Handshake, Code, Building } from 'lucide-react'
import { FadeIn } from './animations/FadeIn'

const services = [
  {
    icon: <Calendar className="text-4xl text-primary" />,
    title: "Organisation d'Événements sur Mesure",
    description: "Nous concevons des événements uniques, qu'il s'agisse de conférences, séminaires, lancements de produits, galas ou célébrations d'entreprise."
  },
  {
    icon: <ChartArea className="text-4xl text-primary" />,
    title: "Gestion de Projets Clés en Main",
    description: "Nous prenons en charge l'ensemble du processus organisationnel, depuis l'idée initiale jusqu'à la réalisation finale."
  },
  {
    icon: <Handshake className="text-4xl text-primary" />,
    title: "Services d'Accompagnement",
    description: "Logistique, gestion des participants, communication et suivi post-événement font partie de nos services complémentaires."
  },
  {
    icon: <Code className="text-4xl text-primary" />,
    title: "Solutions Innovantes et Digitales",
    description: "Nous intégrons des outils technologiques pour la gestion des inscriptions et des expériences interactives."
  },
  {
    icon: <Building className="text-4xl text-primary" />,
    title: "Services aux Entreprises",
    description: "Des prestations adaptées aux besoins opérationnels des organisations, incluant la gestion des espaces de travail."
  }
]

function EvServices() {
  const firstRow = services.slice(0, 3)
  const secondRow = services.slice(3)

  return (
    <section id ="events-service" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Des Solutions Complètes pour Vos Besoins
          </h2>
        </FadeIn>
        
        {/* Première rangée - 3 cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {firstRow.map((service, index) => (
            <FadeIn key={index} delay={index * 0.2}>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col">
                <div className="h-16 flex items-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 h-20 flex items-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-justify flex-grow">
                  {service.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Deuxième rangée - 2 cartes centrées */}
        <div className="flex justify-center gap-8 flex-wrap">
          {secondRow.map((service, index) => (
            <FadeIn key={index + 3} delay={(index + 3) * 0.2}>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col w-full md:w-96">
                <div className="h-16 flex items-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 h-20 flex items-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-justify flex-grow">
                  {service.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EvServices