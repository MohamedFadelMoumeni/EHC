import React from 'react';
import { Award, Users, Target } from 'lucide-react';

const advantages = [
  {
    icon: Award,
    title: "Expertise reconnue",
    description: "Plus de 15 ans d'expérience dans le conseil stratégique"
  },
  {
    icon: Users,
    title: "Accompagnement personnalisé",
    description: "Une approche sur mesure adaptée à vos besoins"
  },
  {
    icon: Target,
    title: "Résultats mesurables",
    description: "Des objectifs clairs et des résultats quantifiables"
  }
];

export default function WhyUs() {
  return (
    <section className="py-20 bg-primary-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 animate-scale">Pourquoi nous choisir ?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {advantages.map((advantage, index) => (
            <div 
              key={index} 
              className="text-center animate-fade-up hover-scale"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <advantage.icon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{advantage.title}</h3>
              <p className="text-gray-600">{advantage.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg mx-auto animate-scale animate-delay-400">
          <div className="text-4xl font-bold text-primary mb-2">95%</div>
          <div className="text-xl">de satisfaction client</div>
        </div>
      </div>
    </section>
  );
}