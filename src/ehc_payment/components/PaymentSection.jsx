import React from 'react';

export default function PPaymentSection() {
  return (
    <div className="text-center">
      <button
        className="bg-primary text-white px-8 py-4 rounded-lg text-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
      >
        Payer Maintenant
      </button>
      <div className="mt-6 flex justify-center gap-4">
        <img src="https://cdn-icons-png.flaticon.com/128/349/349221.png" alt="Visa" className="h-8" />
        <img src="https://cdn-icons-png.flaticon.com/128/349/349228.png" alt="Mastercard" className="h-8" />
        <img src="https://cdn-icons-png.flaticon.com/128/174/174861.png" alt="PayPal" className="h-8" />
      </div>
    </div>
  );
}