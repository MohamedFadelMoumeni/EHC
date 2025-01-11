import React from 'react';

export default function RcHeader() {
  return (
    <header className="relative h-screen flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-primary/90">
        <img 
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop"
          alt="Background" 
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl font-bold mb-4 text-white">Bienvenue chez EHC Recruiting</h1>
        <p className="text-xl mb-8">Votre partenaire stratégique pour un recrutement d'excellence</p>
        <div className="space-x-4">
          <a href="#service-card">
            <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Découvrez nos services
            </button>
          </a>

          <a href="#contact_recrutement">
            <button className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition">
              Contactez-nous
            </button>
          </a>

        </div>
      </div>
    </header>
  );
}