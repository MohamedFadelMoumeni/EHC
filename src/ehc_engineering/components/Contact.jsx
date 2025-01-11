import MessageForm from './forms/MessageForm';
import QuoteForm from './forms/QuoteForm';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-primary mb-12">
          Contactez-nous
        </h2>
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-lg mb-12 text-gray-600">
            Discutons de vos projets technologiques. Contactez-nous via les formulaires ci-dessous.
          </p>
          
          <div className="grid md:grid-cols-2 gap-10">
            <MessageForm />
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}