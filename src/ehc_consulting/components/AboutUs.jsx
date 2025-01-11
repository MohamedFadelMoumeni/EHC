import React from 'react';
import { Target, Lightbulb, TrendingUp } from 'lucide-react';

export default function AboutUs() {
  return (
    <section id="apropos_consulting" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 animate-scale">Notre Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed animate-fade-up text-justify">
    Chez EHC Groupe Consulting, nous croyons en la puissance de la transformation pour libérer le potentiel de chaque organisation. Notre mission est d'accompagner les entreprises dans leur évolution vers l'excellence opérationnelle et l'innovation durable.
          </p> 
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          {[
            {
              icon: Target,
              title: "Vision Stratégique",
              description: "Nous identifions les opportunités de croissance et développons des stratégies sur mesure pour atteindre vos objectifs."
            },
            {
              icon: Lightbulb,
              title: "Innovation Continue",
              description: "Notre approche combine expertise traditionnelle et solutions technologiques innovantes pour maximiser votre potentiel."
            },
            {
              icon: TrendingUp,
              title: "Impact Mesurable",
              description: "Nous nous engageons à générer des résultats tangibles et durables pour votre organisation."
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="text-center p-8 rounded-xl bg-gray-50 hover:bg-primary-50 transition-all duration-300 animate-fade-up hover-scale"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary mb-6">
                <item.icon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-600 text-justify">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}