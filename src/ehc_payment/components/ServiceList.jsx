import React, { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';

export default function PServiceList({ category, addToCart }) {
  const [services, setServices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/business-services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        
        // Organize services by category
        const organizedServices = data.reduce((acc, service) => {
          const category = service.businessUnit;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push({
            id: service.id,
            name: service.name,
            price: service.price,
            description: service.description
          });
          return acc;
        }, {});
        
        setServices(organizedServices);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-600">Chargement des services...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-red-600">Erreur: {error}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
      <div className="lg:col-span-2 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {services[category]?.length || 0} Services disponibles
        </h2>
        <p className="text-gray-600">
          Sélectionnez les services qui correspondent à vos besoins
        </p>
      </div>
      
      {services[category]?.map((service) => (
        <ServiceCard 
          key={service.id}
          service={service}
          onAddToCart={addToCart}
        />
      ))}
    </div>
  );
}