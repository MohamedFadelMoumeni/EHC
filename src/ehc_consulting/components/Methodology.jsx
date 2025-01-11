import React from 'react';
import { Search, Lightbulb, Settings, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: "Analyse et diagnostic",
    description: "Évaluation approfondie de votre situation actuelle pour identifier les opportunités."
  },
  {
    icon: Lightbulb,
    title: "Conception sur mesure",
    description: "Développement de stratégies et solutions adaptées à vos besoins spécifiques."
  },
  {
    icon: Settings,
    title: "Mise en œuvre agile",
    description: "Exécution rapide et efficace avec adaptation continue selon vos retours."
  },
  {
    icon: CheckCircle,
    title: "Suivi des résultats",
    description: "Mesure de l'impact et ajustements pour une performance optimale."
  }
];

export default function Methodology() {
  return (
    <section className="py-24 bg-white" id="methodology">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 animate-scale">Notre méthodologie</h2>
          <p className="text-lg text-gray-600 animate-fade-up">
            Une approche structurée et éprouvée pour garantir le succès de votre transformation
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-primary-100 -translate-y-1/2 hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative bg-white p-8 rounded-xl shadow-lg group hover:bg-primary-50 transition-all duration-300 flex flex-col h-full"
              >
                <div className="bg-primary-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white relative z-10 group-hover:bg-white transition-all duration-300">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="h-16 flex items-center justify-center">
                    <h3 className="text-xl font-bold">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 text-justify">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}