import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  MapPin,
  Phone,
  PhoneCall,
  Mail,
  Clock,
  Building2,
  Loader2,
  ArrowLeft,
  AlertCircle,
  Globe,
  CheckCircle2,
  Contact2,
  Building
} from 'lucide-react';

const ContactShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/contactConfigs/${id}`);
        setContact(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch contact details.');
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#168187]/5 to-cyan-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-12 h-12 text-[#168187] animate-spin" />
          <div className="bg-white rounded-full px-6 py-2 shadow-lg">
            <span className="text-lg font-medium text-[#168187]">Loading contact information...</span>
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Contact</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/admin/contacts')}
            className="px-6 py-3 bg-[#168187] text-white rounded-lg hover:bg-[#168187]/90 transition-all duration-200"
          >
            Return to Contacts
          </button>
        </div>
      </div>
    );
  }

  if (!contact) return null;

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
                <Contact2 className="w-12 h-12 text-white opacity-90" />
                <div>
                  <h1 className="text-2xl font-bold text-white">Contact Information</h1>
                  <p className="text-white/80">Company Contact Details</p>
                </div>
              </div>
              <CheckCircle2 className="w-8 h-8 text-white opacity-75" />
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 -mt-8">
            {/* Contact Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Address Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#168187]">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-[#168187]/10 rounded-lg">
                    <MapPin className="w-6 h-6 text-[#168187]" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Physical Address</h2>
                </div>
                <p className="text-gray-600 whitespace-pre-line ml-12">
                  {contact.address}
                </p>
              </div>

              {/* Phone Numbers Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-cyan-600">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-cyan-50 rounded-lg">
                    <Phone className="w-6 h-6 text-cyan-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Contact Numbers</h2>
                </div>
                <div className="space-y-4 ml-12">
                  <div className="flex items-center space-x-3">
                    <PhoneCall className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">Mobile: {contact.phone}</span>
                  </div>
                  {contact.fixedPhone && (
                    <div className="flex items-center space-x-3">
                      <Building className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">Fixed: {contact.fixedPhone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Email Information Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-teal-600">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-teal-50 rounded-lg">
                    <Mail className="w-6 h-6 text-teal-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Email Addresses</h2>
                </div>
                <div className="space-y-4 ml-12">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">Main: {contact.contactEmail}</span>
                  </div>
                  {contact.emailService && (
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">Service: {contact.emailService}</span>
                    </div>
                  )}
                  {contact.emailSpontaneous && (
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">Applications: {contact.emailSpontaneous}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#168187]">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-[#168187]/10 rounded-lg">
                    <Clock className="w-6 h-6 text-[#168187]" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Working Hours</h2>
                </div>
                <div className="ml-12">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-600">{contact.workTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8">
              <button
                onClick={() => navigate('/admin/contacts')}
                className="group flex items-center space-x-2 px-6 py-3 rounded-lg bg-[#168187]/5 text-[#168187] hover:bg-[#168187]/10 transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                <span>Back to Contacts</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactShow;