import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const FormSpontane = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);

    const formData = new FormData(e.target);
    try {
      await axios.post("http://localhost:8081/api/Spontaneous-applications", formData);
      toast.success("Votre candidature a été envoyée avec succès !");
    } catch (error) {
      toast.error("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

return (
    <div className="max-w-[1120px] mx-auto">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Full Name Input */}
        <div>
          <label className="block mb-2 text-lg font-medium text-gray-700">Nom complet</label>
          <input
            type="text"
            name="fullName"
            className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#168187] focus:ring-1 focus:ring-[#168187] outline-none"
            required
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block mb-2 text-lg font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#168187] focus:ring-1 focus:ring-[#168187] outline-none"
            required
          />
        </div>

        {/* CV Upload */}
        <div>
          <label className="block mb-2 text-lg font-medium text-gray-700">CV (PDF)</label>
          <input
            type="file"
            name="resume"
            accept=".pdf"
            className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#168187] outline-none file:bg-[#168187] file:text-white file:py-2 file:px-4 file:rounded-lg hover:file:bg-[#168187]/90"
            required
          />
        </div>

        {/* Cover Letter Upload */}
        <div>
          <label className="block mb-2 text-lg font-medium text-gray-700">Lettre de motivation (PDF)</label>
          <input
            type="file"
            name="coverLetter"
            accept=".pdf"
            className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#168187] outline-none file:bg-[#168187] file:text-white file:py-2 file:px-4 file:rounded-lg hover:file:bg-[#168187]/90"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={loading}
            className={`px-12 py-2 rounded-lg text-lg font-semibold transition duration-300 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#168187] text-white hover:opacity-90"
            }`}
          >
            {loading ? "Envoi en cours..." : "Envoyer ma candidature"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormSpontane;
