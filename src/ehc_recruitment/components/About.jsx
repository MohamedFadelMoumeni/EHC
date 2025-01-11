import React from 'react';

export default function RcAbout() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">À propos de EHC Recruiting</h2>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <p className="text-lg text-gray-700 leading-relaxed">
              EHC Recruiting est une Business Unit dédiée à l'art et à la science du recrutement. 
              Nous mettons à votre disposition une expertise éprouvée et des solutions sur-mesure 
              pour identifier, attirer et intégrer les meilleurs talents.
            </p>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop" 
              alt="Collaboration" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}