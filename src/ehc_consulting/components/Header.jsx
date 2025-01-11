import React from 'react';
import { ArrowRight } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

export default function Header() {
  return (
    <header className="relative h-screen flex items-center">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl text-white">
          <h1 className="text-6xl font-bold mb-6 leading-tight text-white">
            <TypeAnimation
              sequence={[
                'Bienvenue chez EHC Groupe Consulting',
                1000,
                'Votre partenaire stratégique',
                1000,
                'Pour une transformation intégrale',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="inline-block"
            />
          </h1>
          <p className="text-xl mb-8 text-gray-200 animate-fade-up animate-delay-200 max-w-2xl">
            Votre partenaire stratégique pour une transformation intégrale et une performance optimale dans un monde en constante évolution.
          </p>
          <div className="flex gap-4 animate-fade-up animate-delay-400">
            <a href="#contact_consulting">
             <button className="bg-primary hover:bg-primary-600 text-white px-8 py-4 rounded-lg flex items-center gap-2 transition-all hover-scale">
              Commencez votre transformation
              <ArrowRight size={20} />
             </button>
            </a>

            <button
                onClick={() => {
                  const section = document.getElementById("solutions_consulting");
                  section.scrollIntoView({ behavior: "smooth" });
                }}
                className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-lg transition-all hover:scale-105"
              >
                Découvrir nos services
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 text-white text-center">
            {[
              { number: '15+', label: "Années d'expertise" },
              { number: '200+', label: 'Projets réussis' },
              { number: '95%', label: 'Satisfaction client' }
            ].map((stat, index) => (
              <div key={index} className="animate-fade-up" style={{ animationDelay: `${600 + index * 200}ms` }}>
                <div className="text-3xl font-bold text-primary-200">{stat.number}</div>
                <div className="text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}