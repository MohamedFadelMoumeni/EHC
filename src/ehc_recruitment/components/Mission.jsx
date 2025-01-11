import React from 'react';

export default function Mission() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Notre Mission</h2>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <p className="text-lg text-gray-700 leading-relaxed">
              Chez EHC Recruiting, notre mission est d'accompagner les organisations dans leur quête 
              des meilleurs talents, en alignant notre expertise sur leurs exigences stratégiques. 
              Nous combinons des techniques de chasse de tête rigoureuses, des outils technologiques 
              modernes et un accompagnement intégral pour garantir un recrutement réussi, tout en 
              respectant les spécificités et les valeurs de chaque client.
            </p>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-1.2.1&auto=format&fit=crop" 
              alt="Mission" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}