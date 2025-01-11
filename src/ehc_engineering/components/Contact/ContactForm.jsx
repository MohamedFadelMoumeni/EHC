import { useState } from 'react';
import MessageForm from './MessageForm';
import QuoteForm from './QuoteForm';

export default function EgContactForm() {
  const [activeForm, setActiveForm] = useState(null);

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-primary mb-12">
          Contactez-nous
        </h2>
        
        {!activeForm && (
          <div className="flex justify-center gap-6">
            <button
              onClick={() => setActiveForm('message')}
              className="bg-primary hover:bg-primary-light text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              Envoyer un message
            </button>
            <button
              onClick={() => setActiveForm('quote')}
              className="bg-primary hover:bg-primary-light text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              Demander un devis
            </button>
          </div>
        )}

        {activeForm && (
          <div className="max-w-2xl mx-auto">
            {activeForm === 'message' ? <MessageForm /> : <QuoteForm />}
            <button
              onClick={() => setActiveForm(null)}
              className="mt-6 text-gray-600 hover:text-primary transition-colors"
            >
              ← Retour aux options
            </button>
          </div>
        )}
      </div>
    </section>
  );
}