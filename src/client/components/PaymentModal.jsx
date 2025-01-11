import React, { useState } from 'react';

const PaymentForm = () => {
  const [payment, setPayment] = useState({
    amount: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = (data) => {
    const newErrors = {};
    const currentYear = new Date().getFullYear() % 100; // Get last two digits of the current year
    const currentMonth = new Date().getMonth() + 1; // Month is 0-indexed

    Object.keys(data).forEach((key) => {
      if (!data[key]) {
        newErrors[key] = 'Ce champ est requis';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(payment);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Payment submitted:', payment);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="bg-white p-6 ">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Paiement par carte</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <input
            type="number"
            name="amount"
            value={payment.amount}
            onChange={handleChange}
            placeholder="Montant à payer *"
            className={`w-full p-2 border rounded ${
              errors.amount ? 'border-red-500' : ''
            }`}
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="cardNumber"
            value={payment.cardNumber}
            onChange={handleChange}
            placeholder="Numéro de carte *"
            maxLength="16"
            className={`w-full p-2 border rounded ${
              errors.cardNumber ? 'border-red-500' : ''
            }`}
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <input
              type="text"
              name="expiry"
              value={payment.expiry}
              onChange={handleChange}
              placeholder="MM/AA *"
              maxLength="5"
              className={`w-full p-2 border rounded ${
                errors.expiry ? 'border-red-500' : ''
              }`}
            />
            {errors.expiry && (
              <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="cvc"
              value={payment.cvc}
              onChange={handleChange}
              placeholder="CVC *"
              maxLength="3"
              className={`w-full p-2 border rounded ${
                errors.cvc ? 'border-red-500' : ''
              }`}
            />
            {errors.cvc && (
              <p className="text-red-500 text-sm mt-1">{errors.cvc}</p>
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
        <div className="text-center text-gray-600 mt-4">Paiement sécurisé</div>
      </form>
    </div>
  );
};

export default PaymentForm;
