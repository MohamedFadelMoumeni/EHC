import { Lightbulb, Pencil, Settings, BarChart } from 'lucide-react';

const steps = [
  {
    icon: <Lightbulb className="text-3xl" />,
    title: "Analyse des besoins",
    description: "Phase d'écoute active pour comprendre vos enjeux et définir des objectifs clairs et mesurables."
  },
  {
    icon: <Pencil className="text-3xl" />,
    title: "Conception sur-mesure",
    description: "Création de contenus pédagogiques avec des outils modernes : simulations, études de cas et outils digitaux interactifs."
  },
  {
    icon: <Settings className="text-3xl" />,
    title: "Déploiement optimisé",
    description: "Formats adaptés à vos contraintes : présentiel, e-learning, ou solutions hybrides."
  },
  {
    icon: <BarChart className="text-3xl" />,
    title: "Évaluation et suivi",
    description: "Mesure de l'efficacité via des évaluations, retours d'expérience et outils de suivi de performance."
  }
];

export default function LrMethodology() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary">Notre Méthodologie</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 right-0 w-full h-0.5 bg-primary/20 -z-10"></div>
              )}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition h-full flex flex-col">
                <div className="text-primary mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 h-16 flex items-center">{step.title}</h3>
                <p className="text-gray-600 flex-grow text-justify">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}