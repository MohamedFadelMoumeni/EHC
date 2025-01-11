import { Target, Award, Lightbulb, Handshake, Smartphone } from 'lucide-react'
import { FadeIn } from './animations/FadeIn'

const reasons = [
  {
    icon: <Target className="text-4xl text-primary" />,
    title: "Approche Centrée sur Vos Objectifs",
    description: "Nous plaçons vos besoins et vos ambitions au cœur de notre démarche."
  },
  {
    icon: <Award className="text-4xl text-primary" />,
    title: "Expertise Reconnue",
    description: "Notre équipe d'experts possède une solide expérience dans l'organisation d'événements."
  },
  {
    icon: <Lightbulb className="text-4xl text-primary" />,
    title: "Créativité Sans Limites",
    description: "Nous imaginons des concepts innovants pour chacun de vos projets."
  },
  {
    icon: <Handshake className="text-4xl text-primary" />,
    title: "Accompagnement Complet",
    description: "De la planification à l'exécution, nous vous accompagnons à chaque étape."
  },
  {
    icon: <Smartphone className="text-4xl text-primary" />,
    title: "Intégration des Nouvelles Technologies",
    description: "Nous utilisons des outils digitaux pour optimiser l'efficacité."
  }
]

function EvWhyChooseUs() {
  const firstRow = reasons.slice(0, 3)
  const secondRow = reasons.slice(3)

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Les Raisons de Nous Faire Confiance
          </h2>
        </FadeIn>

        {/* Première rangée - 3 cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {firstRow.map((reason, index) => (
            <FadeIn key={index} delay={index * 0.2} direction="up">
              <div className="text-center p-6 hover:scale-105 transition-transform duration-300 bg-white h-full flex flex-col">
                <div className="mb-4 flex justify-center h-16 items-center">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 h-20 flex items-center justify-center">
                  {reason.title}
                </h3>
                <p className="text-gray-600 flex-grow flex items-center justify-center">
                  {reason.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Deuxième rangée - 2 cartes centrées */}
        <div className="flex justify-center gap-8 flex-wrap">
          {secondRow.map((reason, index) => (
            <FadeIn key={index + 3} delay={(index + 3) * 0.2} direction="up">
              <div className="text-center p-6 hover:scale-105 transition-transform duration-300 bg-white h-full flex flex-col w-full md:w-96">
                <div className="mb-4 flex justify-center h-16 items-center">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 h-20 flex items-center justify-center">
                  {reason.title}
                </h3>
                <p className="text-gray-600 flex-grow flex items-center justify-center">
                  {reason.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EvWhyChooseUs
