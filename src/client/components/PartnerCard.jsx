import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PartnerCard = ({ name, website, imagePath }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex text-left space-x-4">
        <div className="flex-shrink-0">
          <img
            src={imagePath}
            alt={name}
            className="w-16 h-16 rounded-full border-2 border-teal-500"
          />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
          <a 
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 hover:text-teal-700 font-medium inline-flex items-center"
          >
            Visiter le site
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

const PartnersMain = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/partners');
        const transformedPartners = response.data.map(partner => ({
          name: partner.name,
          website: partner.companyURL,
          imagePath : "http://localhost:8081/api/uploads/partners/" + partner.imagePath
        }));
        setPartners(transformedPartners);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch partners data');
        setLoading(false);
        console.error('Error fetching partners:', err);
      }
    };

    fetchPartners();
  }, []);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-6"></div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              Notre Écosystème de Partenaires 
            </h2>
          </div>
          <p className="text-gray-600">
            La confiance et l'excellence sont au cœur de nos partenariats. 
            Nous collaborons avec des institutions prestigieuses et des entreprises de renom pour offrir le meilleur à nos clients.
          </p>
        </div>
      </div>
      
      <div className="space-y-6 mt-2">
        {partners.map((partner, index) => (
          <PartnerCard key={index} {...partner} />
        ))}
      </div>
    </div>
  );
};

export default PartnersMain;