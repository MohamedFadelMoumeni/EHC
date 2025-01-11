import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DemandeDevis = () => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9+\s()-]{10,}$/.test(phone);

  const validateForm = () => {
    const newErrors = {};
    Object.keys(data).forEach((key) => {
      if (!data[key]) {
        newErrors[key] = 'Ce champ est requis';
      } else if (key === 'email' && !validateEmail(data[key])) {
        newErrors[key] = 'Email invalide';
      } else if (key === 'phone' && !validatePhone(data[key])) {
        newErrors[key] = 'Téléphone invalide';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true); // Start loading
      try {
        const requestData = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          serviceType: data.service,
          approximateBudget: data.budget,
          message: data.message,
        };
        await axios.post("http://localhost:8081/api/requestquotes", requestData);
        toast.success("Votre demande de devis a été envoyée avec succès!");
        setData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          service: '',
          budget: '',
          message: '',
        });
      } catch (error) {
        console.error("Erreur lors de l'envoi de la demande:", error);
        toast.error("Une erreur est survenue. Veuillez réessayer.");
      } finally {
        setLoading(false); // End loading
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Demande de devis</h2>
      <form onSubmit={handleSubmit} noValidate>
        {[
          { name: 'firstName', type: 'text', placeholder: 'Prénom *' },
          { name: 'lastName', type: 'text', placeholder: 'Nom *' },
          { name: 'email', type: 'email', placeholder: 'Email *' },
          { name: 'phone', type: 'tel', placeholder: 'Téléphone *' },
          {
            name: 'service',
            type: 'select',
            placeholder: 'Type de prestation *',
            options: [
              { value: 'Web Development', label: 'Développement Web' },
              { value: 'Graphic Design', label: 'Design Graphique' },
            ],
          },
          {
            name: 'budget',
            type: 'select',
            placeholder: 'Budget approximatif *',
            options: [
              { value: '$500 - $1000', label: '500€ - 1000€' },
              { value: '$1000 - $2000', label: '1000€ - 2000€' },
              { value: '$2000+', label: 'Plus de 2000€' },
            ],
          },
          { name: 'message', type: 'textarea', placeholder: 'Message *' },
        ].map((field) => (
          <div key={field.name} className="mb-4">
            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                value={data[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className={`w-full p-2 border rounded ${
                  errors[field.name] ? 'border-red-500' : ''
                } h-32`}
                disabled={loading}
              />
            ) : field.type === 'select' ? (
              <select
                name={field.name}
                value={data[field.name]}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  errors[field.name] ? 'border-red-500' : ''
                }`}
                disabled={loading}
              >
                <option value="">{field.placeholder}</option>
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={data[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className={`w-full p-2 border rounded ${
                  errors[field.name] ? 'border-red-500' : ''
                }`}
                disabled={loading}
              />
            )}
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}
        <button
          type="submit"
          style={{ backgroundColor: '#168187' }}
          className="w-full text-white py-2 px-4 rounded hover:opacity-90 transition-opacity"
          disabled={loading}
        >
          {loading ? 'Envoi en cours...' : 'Envoyer'}
        </button>
      </form>
    </div>
  );
};

export default DemandeDevis;
