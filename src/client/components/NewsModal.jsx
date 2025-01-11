import React, { useState, useEffect } from 'react';
import { Calendar, Users, FileText, Mail, Bell } from 'lucide-react';
import axios from 'axios';

const NewsModal = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState({ type: '', message: '' });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/news');
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setNews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubscribing(true);
    setSubscriptionMessage({ type: '', message: '' });
  
    try {
      await axios.post('http://localhost:8081/api/subscribers', {
        email: email,
        subscriptionDate: new Date().toISOString() // Current date in ISO format
      });
  
      setSubscriptionMessage({
        type: 'success',
        message: 'Merci de votre inscription ! Vous recevrez nos prochaines actualités par email.'
      });
      setEmail('');
    } catch (error) {
      setSubscriptionMessage({
        type: 'error',
        message: 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.'
      });
      console.error('Subscription error:', error);
    } finally {
      setSubscribing(false);
    }
  };

  const currentNews = news.filter((item) => item.newsType === 'CURRENT');
  const upcomingNews = news.filter((item) => item.newsType === 'UPCOMING');

  const EvenementCard = ({ evenement }) => {
    return (
      <div className="mb-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Calendar className="h-6 w-6" style={{ color: '#168187' }} />
            <h2 className="text-xl font-semibold text-black">{evenement.title}</h2>
          </div>
          <div className="text-gray-600 mt-2">
            <p>{new Date(evenement.eventDate).toLocaleDateString()}</p>
            <p>{evenement.location}</p>
          </div>
        </div>
        <div className="p-6">
          <p className="mb-4 text-gray-600">{evenement.description}</p>

          {evenement.activities.length > 0 && (
            <>
              <h3 className="font-semibold text-lg mb-3 text-black">Au programme :</h3>
              <div className="space-y-4">
                {evenement.activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <FileText className="h-5 w-5 mt-1" style={{ color: '#168187' }} />
                    <div>
                      <h4 className="font-medium text-[#168187]">{activity.title}</h4>
                      <p className="text-gray-600">{activity.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <p className="text-gray-600 text-lg">
          Restez informé des dernières nouvelles et initiatives d'EHC Groupe !
          Nous vous partageons ici nos événements marquants, projets en cours et actualités clés.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-6 text-black">Événements actuels</h3>
        {currentNews.length > 0 ? (
          currentNews.map((evenement) => (
            <EvenementCard key={evenement.id} evenement={evenement} />
          ))
        ) : (
          <p className="text-gray-600">Aucun événement actuel disponible.</p>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-6 text-black">Événements à venir</h3>
        {upcomingNews.length > 0 ? (
          upcomingNews.map((evenement) => (
            <EvenementCard key={evenement.id} evenement={evenement} />
          ))
        ) : (
          <p className="text-gray-600">Aucun événement à venir disponible.</p>
        )}
      </div>

      {/* Subscription Form */}
      <div className="mt-16 bg-[#168187] bg-opacity-5 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="h-6 w-6 text-[#168187]" />
          <h2 className="text-xl font-semibold text-black">Restez informé !</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Inscrivez-vous à notre newsletter pour recevoir les dernières actualités et ne manquer aucun événement.
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-grow">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#168187] focus:border-transparent"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={subscribing}
            className="bg-[#168187] text-white px-6 py-2 rounded-lg hover:bg-[#136d72] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {subscribing ? 'En cours...' : 'S\'inscrire'}
          </button>
        </form>
        {subscriptionMessage.message && (
          <div className={`mt-4 p-3 rounded-lg ${
            subscriptionMessage.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {subscriptionMessage.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsModal;