import React from 'react';

export default function PFooter() {
  return (
    <footer className="mt-12 py-8 border-t">
      <div className="flex justify-center gap-8 mb-4">
        <a href="#" className="text-gray-600 hover:text-primary">Conditions Générales</a>
        <a href="#" className="text-gray-600 hover:text-primary">Politique de Remboursement</a>
        <a href="#" className="text-gray-600 hover:text-primary">Sécurité des Paiements</a>
      </div>
      <p className="text-center text-gray-500">
        Paiement sécurisé via SSL. Tous les droits sont réservés © 2025.
      </p>
    </footer>
  );
}