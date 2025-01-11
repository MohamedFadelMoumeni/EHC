import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PPromoCode({ onApply }) {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [promoCodes, setPromoCodes] = useState([]);

  // Fetch all promo codes when component mounts
  useEffect(() => {
    const fetchPromoCodes = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/promos');
        setPromoCodes(response.data);
      } catch (error) {
        console.error('Error fetching promo codes:', error);
      }
    };

    fetchPromoCodes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Find the promo code in our array
      const foundPromo = promoCodes.find(
        promo => promo.promoCode === code.toUpperCase()
      );

      if (foundPromo) {
        setMessage({ 
          type: 'success', 
          text: `Code promo appliqué avec succès : -${foundPromo.reductionValue}%` 
        });
        
        // Convert reduction value to decimal (e.g., 12.0 becomes 0.12)
        const discountDecimal = foundPromo.reductionValue / 100;
        onApply(discountDecimal);
      } else {
        setMessage({ 
          type: 'error', 
          text: 'Code promo invalide' 
        });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Une erreur est survenue lors de la vérification du code promo' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Entrez votre code promo ici"
          className="flex-1 border rounded-lg px-4 py-2"
          disabled={loading}
        />
        <button
          type="submit"
          className={`px-6 py-2 rounded-lg transition-colors ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-primary text-white hover:bg-primary/90'
          }`}
          disabled={loading}
        >
          {loading ? 'Vérification...' : 'Appliquer'}
        </button>
      </form>
      {message && (
        <p 
          className={`mt-2 ${
            message.type === 'success' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}