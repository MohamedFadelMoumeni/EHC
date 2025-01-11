import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Building2, Loader2 } from 'lucide-react';

const Localisation = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/contactConfigs/1');
        const data = await response.json();
        setContactData(data);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#168187]" />
      </div>
    );
  }

  const contactItems = [
    { 
      icon: MapPin, 
      label: 'Adresse', 
      value: contactData?.address
    },
    { 
      icon: Phone, 
      label: 'Téléphone Mobile', 
      value: contactData?.phone 
    },
    { 
      icon: Building2, 
      label: 'Téléphone Fixe', 
      value: contactData?.fixedPhone 
    },
    { 
      icon: Mail, 
      label: 'Adresse Email', 
      value: contactData?.contactEmail 
    },
    { 
      icon: Clock, 
      label: 'Horaires d\'Ouverture', 
      value: contactData?.workTime 
    }
  ];

  return (
    <div className="bg-white">
      <section className="w-full bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#168187] mb-8 text-center">
            Informations de Contact
          </h2>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="space-y-6">
              {contactItems.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0 p-2 bg-[#168187] bg-opacity-10 rounded-full">
                    <item.icon className="h-6 w-6 text-[#168187]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">
                      {item.label}
                    </p>
                    <p className="mt-1 text-lg text-gray-900">
                      {item.value || 'Non disponible'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Carte en cours de chargement
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Localisation;