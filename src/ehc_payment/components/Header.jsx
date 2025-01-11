import React from 'react';

export default function PHeader() {
  return (
    <header className="text-center py-8">
      <h1 className="text-4xl font-bold text-primary mb-4">
        Finalisez votre commande
      </h1>
      <p className="text-gray-500 italic">
        Sélectionnez vos services, appliquez un code promo, et effectuez votre paiement en toute sécurité.
      </p>
    </header>
  );
}