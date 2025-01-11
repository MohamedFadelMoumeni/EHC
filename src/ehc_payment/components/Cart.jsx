import React from 'react';
import { Trash } from 'lucide-react';

export default function PCart({ items, removeFromCart, total }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span>🛒</span> Votre panier
      </h2>
      
      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Votre panier est vide</p>
          <span className="text-4xl">🛍️</span>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.id} 
                className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <span className="font-medium text-gray-800 break-words ">{item.name}</span>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-primary">
                    {item.price.toLocaleString('fr-FR')} €
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-4 border-t-2">
            <div className="flex justify-between items-center text-xl">
              <span className="font-medium text-gray-800">Total</span>
              <span className="font-bold text-primary">
                {total.toLocaleString('fr-FR')} €
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}