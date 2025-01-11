import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import Modal from './Modal';

export default function PServiceCard({ service, onAddToCart }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300">
        {/* Cercle décoratif */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
        
        {/* Badge Prix */}
        <div className="absolute top-4 right-4 bg-white shadow-lg rounded-full px-4 py-2">
          <p className="text-primary text-lg font-extrabold">
            {service.price.toLocaleString('fr-FR')} €
          </p>
        </div>
        
        {/* Contenu principal */}
        <div className="relative">
          <h3 className="font-bold text-xl mb-6 text-gray-800 pr-24 break-words">{service.name}</h3>
          
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => onAddToCart(service)}
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-medium">Ajouter au panier</span>
            </button>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary text-white py-2 px-4 rounded-lg 
                       transform transition-all duration-300 
                       hover:bg-primary/90 hover:shadow-lg
                       active:scale-95"
            >
              En savoir plus
            </button>
          </div>
        </div>
        
        {/* Barre de progression au survol */}
        <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
      </div>

      {/* Modal avec la description du service */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center">
          <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
            <span className="text-primary text-2xl">✨</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.name}</h3>
          <p className="text-gray-600 mb-6 leading-relaxed ">
            {service.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-primary">
              {service.price.toLocaleString('fr-FR')} €
            </span>
            <button
              onClick={() => {
                onAddToCart(service);
                setIsModalOpen(false);
              }}
              className="bg-primary text-white px-6 py-3 rounded-lg
                       transform transition-all duration-300
                       hover:bg-primary/90 hover:shadow-lg
                       active:scale-95"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}