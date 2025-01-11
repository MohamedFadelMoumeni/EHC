import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Building2,
  Loader2,
  ArrowLeft,
  AlertCircle,
  DollarSign,
  FileText,
  CheckCircle2,
  Briefcase,
  ClipboardList
} from 'lucide-react';

const PServiceShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/business-services/${id}`);
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
            <span className="text-lg font-medium text-[#168187]">Loading service information...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#168187]/5 to-cyan-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 mx-auto mb-4 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Service</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/admin/payment')}
            className="px-6 py-3 bg-[#168187] text-white rounded-lg hover:bg-[#168187]/90 transition-all duration-200"
          >
            Return to Services
          </button>
        </div>
      </div>
    );
  }

  if (!service) return null;

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
          <div className="bg-gradient-to-r from-[#168187] to-cyan-600 h-32 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[#168187] mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-20"></div>
            </div>
            <div className="relative h-full flex items-center justify-between px-8">
              <div className="flex items-center space-x-4">
                <Briefcase className="w-12 h-12 text-white opacity-90" />
                <div>
                  <h1 className="text-2xl font-bold text-white">Service Details</h1>
                  <p className="text-white/80">Business Service Information</p>
                </div>
              </div>
              <CheckCircle2 className="w-8 h-8 text-white opacity-75" />
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Service Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#168187]">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-[#168187]/10 rounded-lg">
                    <FileText className="w-6 h-6 text-[#168187]" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Service Name</h2>
                </div>
                <p className="text-gray-600 ml-12">
                  {service.name}
                </p>
              </div>

              {/* Price Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-cyan-600">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-cyan-50 rounded-lg">
                    <DollarSign className="w-6 h-6 text-cyan-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Price</h2>
                </div>
                <p className="text-gray-600 ml-12">
                  {service.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                </p>
              </div>

              {/* Business Unit Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-teal-600">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-teal-50 rounded-lg">
                    <Building2 className="w-6 h-6 text-teal-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Business Unit</h2>
                </div>
                <p className="text-gray-600 ml-12">
                  {service.businessUnit}
                </p>
              </div>

              {/* Description Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#168187]">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-[#168187]/10 rounded-lg">
                    <ClipboardList className="w-6 h-6 text-[#168187]" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Description</h2>
                </div>
                <p className="text-gray-600 ml-12">
                  {service.description}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8">
              <button
                onClick={() => navigate('/admin/payment')}
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

export default PServiceShow;