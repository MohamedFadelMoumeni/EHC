import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FileText, 
  Users, 
  Building2, 
  GraduationCap, 
  Loader2, 
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Activity
} from 'lucide-react';

const ServiceShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getCategoryDetails = (category) => {
    switch (category) {
      case 'STUDENT':
        return {
          icon: GraduationCap,
          color: 'bg-gradient-to-r from-[#168187] to-cyan-500',
          lightColor: 'bg-cyan-50',
          textColor: 'text-[#168187]',
          label: 'Student Services',
          description: 'Specialized services for academic growth and student success'
        };
      case 'COMPANY':
        return {
          icon: Building2,
          color: 'bg-gradient-to-r from-teal-600 to-[#168187]',
          lightColor: 'bg-teal-50',
          textColor: 'text-teal-600',
          label: 'Company Solutions',
          description: 'Professional services tailored for business needs'
        };
      case 'EMPLOYEE':
        return {
          icon: Users,
          color: 'bg-gradient-to-r from-[#168187] to-teal-500',
          lightColor: 'bg-[#168187]/10',
          textColor: 'text-[#168187]',
          label: 'Employee Benefits',
          description: 'Services designed to support workforce development'
        };
      default:
        return {
          icon: Activity,
          color: 'bg-gradient-to-r from-cyan-600 to-[#168187]',
          lightColor: 'bg-cyan-50',
          textColor: 'text-cyan-600',
          label: 'General Services',
          description: 'Professional services for various needs'
        };
    }
  };

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/services/${id}`);
        setService(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch service details.');
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#168187]/5 to-cyan-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-12 h-12 text-[#168187] animate-spin" />
          <div className="bg-white rounded-full px-6 py-2 shadow-lg">
            <span className="text-lg font-medium text-[#168187]">Loading service details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#168187]/5 to-cyan-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto text-center transform transition-all duration-300 scale-95 hover:scale-100">
          <div className="w-16 h-16 rounded-full bg-[#168187]/10 mx-auto mb-4 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-[#168187]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Service</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/admin/services')}
            className="px-6 py-3 bg-[#168187] text-white rounded-lg hover:bg-[#168187]/90 transition-all duration-200 transform hover:scale-105"
          >
            Return to Services
          </button>
        </div>
      </div>
    );
  }

  if (!service) return null;

  const categoryDetails = getCategoryDetails(service.serviceCategory);
  const CategoryIcon = categoryDetails.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#168187]/5 to-cyan-50 py-8 px-4">
      <div 
        className={`max-w-4xl mx-auto transform transition-all duration-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Banner */}
          <div className={`${categoryDetails.color} h-32 relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[#168187] mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-20"></div>
            </div>
            <div className="relative h-full flex items-center px-8">
              <CategoryIcon className="w-12 h-12 text-white opacity-90" />
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 -mt-16 relative">
            {/* Service Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{service.name}</h1>
                  <div className={`inline-flex items-center px-4 py-2 rounded-full ${categoryDetails.lightColor} ${categoryDetails.textColor} font-medium text-sm`}>
                    <CategoryIcon className="w-4 h-4 mr-2" />
                    {categoryDetails.label}
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-full ${categoryDetails.lightColor} flex items-center justify-center`}>
                  <CheckCircle2 className={`w-6 h-6 ${categoryDetails.textColor}`} />
                </div>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-gradient-to-br from-gray-50 to-[#168187]/5 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">About This Service</h2>
              <p className="text-gray-600 leading-relaxed">
                {service.description || 'No description available.'}
              </p>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className={`flex items-center space-x-2 ${categoryDetails.textColor}`}>
                  <CategoryIcon className="w-5 h-5" />
                  <span className="font-medium">{categoryDetails.description}</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8">
              <button
                onClick={() => navigate('/admin/services')}
                className="group flex items-center space-x-2 px-6 py-3 rounded-lg bg-[#168187]/5 text-[#168187] hover:bg-[#168187]/10 transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                <span>Back to Services</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceShow;