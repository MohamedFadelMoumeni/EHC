import React from 'react';

const Form = ({ title, onSubmit, fields, data, errors, onChange }) => (
  <div className="bg-gray-50 p-6 rounded-lg shadow">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
    <form onSubmit={onSubmit} noValidate>
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          {field.type === 'textarea' ? (
            <textarea
              name={field.name}
              value={data[field.name]}
              onChange={onChange}
              placeholder={field.placeholder}
              className={`w-full p-2 border rounded ${
                errors[field.name] ? 'border-red-500' : ''
              } ${field.type === 'textarea' ? 'h-32' : ''}`}
            />
          ) : field.type === 'select' ? (
            <select
              name={field.name}
              value={data[field.name]}
              onChange={onChange}
              className={`w-full p-2 border rounded ${
                errors[field.name] ? 'border-red-500' : ''
              }`}
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
              onChange={onChange}
              placeholder={field.placeholder}
              className={`w-full p-2 border rounded ${
                errors[field.name] ? 'border-red-500' : ''
              }`}
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
      >
        {title}
      </button>
    </form>
  </div>
);

export default function ContactPage() {
  const [contact, setContact] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [quote, setQuote] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
  });

  const [payment, setPayment] = React.useState({
    amount: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const [errors, setErrors] = React.useState({
    contact: {},
    quote: {},
    payment: {},
  });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9+\s()-]{10,}$/.test(phone);

  const validateForm = (data) => {
    const newErrors = {};
    const currentYear = new Date().getFullYear() % 100; // Get last two digits of the current year
    const currentMonth = new Date().getMonth() + 1; // Month is 0-indexed
  
    Object.keys(data).forEach((key) => {
      if (!data[key]) {
        newErrors[key] = 'Ce champ est requis';
      } else if (key === 'email' && !validateEmail(data[key])) {
        newErrors[key] = 'Email invalide';
      } else if (key === 'phone' && !validatePhone(data[key])) {
        newErrors[key] = 'Téléphone invalide';
      } else if (key === 'cardNumber' && !/^\d{16}$/.test(data[key])) {
        newErrors[key] = 'Numéro de carte invalide (16 chiffres requis)';
      } else if (
        key === 'expiry' &&
        !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data[key])
      ) {
        newErrors[key] = 'Format invalide (MM/AA)';
      } else if (key === 'expiry') {
        const [month, year] = data[key].split('/').map(Number);
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
          newErrors[key] = 'Date d’expiration invalide';
        }
      } else if (key === 'cvc' && !/^\d{3}$/.test(data[key])) {
        newErrors[key] = 'CVC invalide (3 chiffres requis)';
      }
    });
    return newErrors;
  };
  

  const handleSubmit = (type) => (e) => {
    e.preventDefault();
    const data =
      type === 'contact'
        ? contact
        : type === 'quote'
        ? quote
        : payment;
    const newErrors = validateForm(data);
    setErrors((prev) => ({ ...prev, [type]: newErrors }));

    if (Object.keys(newErrors).length === 0) {
      console.log(`${type} form submitted:`, data);
    }
  };

  const handleChange = (type) => (e) => {
    const { name, value } = e.target;
    const setter =
      type === 'contact'
        ? setContact
        : type === 'quote'
        ? setQuote
        : setPayment;

    setter((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [type]: { ...prev[type], [name]: '' },
    }));
  };

  const contactFields = [
    { name: 'firstName', type: 'text', placeholder: 'Prénom *' },
    { name: 'lastName', type: 'text', placeholder: 'Nom *' },
    { name: 'email', type: 'email', placeholder: 'Email *' },
    { name: 'phone', type: 'tel', placeholder: 'Téléphone *' },
    { name: 'message', type: 'textarea', placeholder: 'Message *' },
  ];

  const quoteFields = [
    { name: 'firstName', type: 'text', placeholder: 'Prénom *' },
    { name: 'lastName', type: 'text', placeholder: 'Nom *' },
    { name: 'email', type: 'email', placeholder: 'Email *' },
    { name: 'phone', type: 'tel', placeholder: 'Téléphone *' },
    {
      name: 'service',
      type: 'select',
      placeholder: 'Type de prestation *',
      options: [
        { value: 'service1', label: 'Service 1' },
        { value: 'service2', label: 'Service 2' },
      ],
    },
    {
      name: 'budget',
      type: 'select',
      placeholder: 'Budget approximatif *',
      options: [
        { value: '500', label: 'Moins de 500€' },
        { value: '1000', label: '500€ - 1000€' },
        { value: '2000', label: 'Plus de 1000€' },
      ],
    },
    { name: 'message', type: 'textarea', placeholder: 'Message *' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6" id="C&P">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Form
          title="Contact"
          onSubmit={handleSubmit('contact')}
          fields={contactFields}
          data={contact}
          errors={errors.contact}
          onChange={handleChange('contact')}
        />

        <Form
          title="Demande de devis"
          onSubmit={handleSubmit('quote')}
          fields={quoteFields}
          data={quote}
          errors={errors.quote}
          onChange={handleChange('quote')}
        />

        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Paiement par carte</h2>
          <form onSubmit={handleSubmit('payment')} noValidate>
            <div className="mb-4">
              <input
                type="number"
                name="amount"
                value={payment.amount}
                onChange={handleChange('payment')}
                placeholder="Montant à payer *"
                className={`w-full p-2 border rounded ${
                  errors.payment.amount ? 'border-red-500' : ''
                }`}
              />
              {errors.payment.amount && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.payment.amount}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="cardNumber"
                value={payment.cardNumber}
                onChange={handleChange('payment')}
                placeholder="Numéro de carte *"
                maxLength="16"
                className={`w-full p-2 border rounded ${
                  errors.payment.cardNumber ? 'border-red-500' : ''
                }`}
              />
              {errors.payment.cardNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.payment.cardNumber}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <input
                  type="text"
                  name="expiry"
                  value={payment.expiry}
                  onChange={handleChange('payment')}
                  placeholder="MM/AA *"
                  maxLength="5"
                  className={`w-full p-2 border rounded ${
                    errors.payment.expiry ? 'border-red-500' : ''
                  }`}
                />
                {errors.payment.expiry && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.payment.expiry}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="cvc"
                  value={payment.cvc}
                  onChange={handleChange('payment')}
                  placeholder="CVC *"
                  maxLength="3"
                  className={`w-full p-2 border rounded ${
                    errors.payment.cvc ? 'border-red-500' : ''
                  }`}
                />
                {errors.payment.cvc && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.payment.cvc}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              style={{ backgroundColor: '#168187' }}
              className="w-full text-white py-2 px-4 rounded hover:opacity-90 transition-opacity"
            >
              Payer maintenant
            </button>
            <div className="text-center text-gray-600 mt-4">
              Paiement sécurisé
            </div>
          </form>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Nos coordonnées</h2>
          <div className="space-y-4">
            <p>123 Rue Example, 75000 Paris</p>
            <p>+33 1 23 45 67 89</p>
            <p>contact@example.com</p>
            <p>Lun-Ven: 9h-18h</p>
            <div className="mt-4 h-48 bg-gray-200 rounded">
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Carte Google Maps
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

