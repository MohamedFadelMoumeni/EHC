import ContactForm from '../forms/ContactForm';
import QuoteForm from '../forms/QuoteForm';
import { useState } from 'react';

export default function LrContact() {
  const [activeForm, setActiveForm] = useState('contact');

  return (
    <section id="contact_consulting" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 text-primary">Contactez-nous</h2>
        <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
        Rejoignez-nous pour optimiser vos performances et vos stratégies. 
        Découvrez comment notre expertise en consulting peut propulser vos projets vers le succès.
        </p>

        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-white">
            <button
              onClick={() => setActiveForm('contact')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeForm === 'contact'
                  ? 'bg-primary text-white'
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              Envoyer un message
            </button>
            <button
              onClick={() => setActiveForm('quote')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeForm === 'quote'
                  ? 'bg-primary text-white'
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              Demander un devis
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {activeForm === 'contact' ? <ContactForm /> : <QuoteForm />}
        </div>
      </div>
    </section>
  );
}