import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { User, Briefcase, Book, Languages, Clock, Award, GraduationCap, FolderKanban } from 'lucide-react';

const ExpertShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpert = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/experts/${id}`);
        setExpert(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching expert:', err);
        setError('Failed to load expert details');
      } finally {
        setLoading(false);
      }
    };

    fetchExpert();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        <div className="flex items-center space-x-3 text-[#168187]">
          <svg className="animate-spin h-8 w-8" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-lg font-medium">Loading expert details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-red-100 text-center">
          <div className="text-red-500 text-lg font-medium mb-2">{error}</div>
          <button
            onClick={() => navigate('/admin/about')}
            className="text-[#168187] hover:text-[#0f5c61] font-medium transition-colors"
          >
            Return to experts list
          </button>
        </div>
      </div>
    );
  }

  const formatCategory = (category) => {
    if (!category) return 'N/A';
    return category.replace('_', ' ').replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-[#168187] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Expert Image */}
              {expert.imagePath ? (
                <img
                  src={`http://localhost:8081/api/uploads/experts/${expert.imagePath}`}
                  alt={expert.fullName}
                  className="w-24 h-24 rounded-lg object-cover border-2 border-white/20"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150?text=Expert';
                  }}
                />
              ) : (
                <div className="w-24 h-24 rounded-lg bg-white/10 flex items-center justify-center">
                  <User size={32} className="text-white/80" />
                </div>
              )}

              {/* Header Content */}
              <div className="flex justify-between items-center flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">{expert.fullName || 'Expert Details'}</h1>
                <button
                  onClick={() => navigate('/admin/about')}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 backdrop-blur-sm"
                >
                  Return to List
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <User size={16} className="inline mr-2" />
                Full Name
              </label>
              <div className="mt-1 p-3 block w-full rounded-lg border border-gray-200 bg-gray-50">
                {expert.fullName || 'N/A'}
              </div>
            </div>

            {/* Function */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <Briefcase size={16} className="inline mr-2" />
                Function
              </label>
              <div className="mt-1 p-3 block w-full rounded-lg border border-gray-200 bg-gray-50">
                {expert.function || 'N/A'}
              </div>
            </div>

            {/* Expert Category - New Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <FolderKanban size={16} className="inline mr-2" />
                Expert Category
              </label>
              <div className="mt-1 p-3 block w-full rounded-lg border border-gray-200 bg-gray-50">
                {formatCategory(expert.expertCategory)}
              </div>
            </div>

            {/* Biography */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <Book size={16} className="inline mr-2" />
                Biography
              </label>
              <div className="mt-1 p-3 block w-full rounded-lg border border-gray-200 bg-gray-50">
                {expert.biography || 'N/A'}
              </div>
            </div>

            {/* Expertises */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <Award size={16} className="inline mr-2" />
                Expertises
              </label>
              <div className="mt-1 p-3 block w-full rounded-lg border border-gray-200 bg-gray-50">
                {expert.expertises || 'N/A'}
              </div>
            </div>

            {/* Education */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <GraduationCap size={16} className="inline mr-2" />
                Education
              </label>
              <div className="mt-1 p-3 block w-full rounded-lg border border-gray-200 bg-gray-50">
                {expert.education || 'N/A'}
              </div>
            </div>

            {/* Languages */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <Languages size={16} className="inline mr-2" />
                Languages
              </label>
              <div className="mt-1 p-3 block w-full rounded-lg border border-gray-200 bg-gray-50">
                {expert.languages || 'N/A'}
              </div>
            </div>

            {/* Seniority */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <Clock size={16} className="inline mr-2" />
                Seniority
              </label>
              <div className="mt-1 p-3 block w-full rounded-lg border border-gray-200 bg-gray-50">
                {expert.seniority ? `${expert.seniority} years` : 'N/A'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertShow;