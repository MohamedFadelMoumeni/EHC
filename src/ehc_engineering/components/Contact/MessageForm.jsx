import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function MessageForm() {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("http://localhost:8081/api/contacts", data);
      toast.success("La demande de service a été bien envoyée!");
      setData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error("Erreur ! Essayez une autre fois.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-2 gap-6">
        <input
          type="text"
          name="firstName"
          value={data.firstName}
          onChange={handleChange}
          placeholder="Prénom *"
          className="col-span-2 sm:col-span-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          required
        />
        <input
          type="text"
          name="lastName"
          value={data.lastName}
          onChange={handleChange}
          placeholder="Nom *"
          className="col-span-2 sm:col-span-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          required
        />
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Email *"
          className="col-span-2 sm:col-span-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          required
        />
        <input
          type="tel"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          placeholder="Téléphone *"
          className="col-span-2 sm:col-span-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          required
        />
      </div>
      <textarea
        name="message"
        value={data.message}
        onChange={handleChange}
        placeholder="Message *"
        rows="4"
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
        required
      ></textarea>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            Envoyer le message
            <ArrowRight />
          </>
        )}
      </button>
    </motion.form>
  );
}