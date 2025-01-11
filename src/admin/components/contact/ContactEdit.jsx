import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FileEdit, Mail, PhoneCall, Clock, Save, X, Loader2 } from 'lucide-react';

const ContactEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    fixedPhone: '',
    contactEmail: '',
    workTime: '',
    emailService: '',
    emailSpontaneous: ''
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/contactConfigs/${id}`);
        const contact = response.data;
        setFormData({
          address: contact.address,
          phone: contact.phone,
          fixedPhone: contact.fixedPhone,
          contactEmail: contact.contactEmail,
          workTime: contact.workTime,
          emailService: contact.emailService,
          emailSpontaneous: contact.emailSpontaneous
        });
      } catch (error) {
        console.error('Error fetching contact:', error);
        toast.error('Failed to fetch contact details.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchContact();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.put(`http://localhost:8081/api/contactConfigs/${id}`, formData);
      toast.success('Contact information updated successfully');
      navigate('/admin/contacts');
    } catch (error) {
      console.error('Error updating contact:', error);
      toast.error('Failed to update contact information.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex items-center space-x-3 text-[#168187]">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="text-lg font-medium">Loading contact details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-t-xl shadow-sm p-6 border-b-2 border-[#168187]">
          <div className="flex items-center space-x-3">
            <FileEdit className="w-8 h-8 text-[#168187]" />
            <h1 className="text-3xl font-bold text-gray-800">Edit Contact Information</h1>
          </div>
          <p className="mt-2 text-gray-600 ml-11">Modify the contact information below</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-b-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Address */}
            <div className="space-y-2">
              <label htmlFor="contactAddress" className="text-sm font-semibold text-gray-700">
                Contact Address
              </label>
              <textarea
                id="contactAddress"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187]/20 focus:border-[#168187] transition-all duration-200"
                placeholder="Enter physical address"
                required
                rows={3}
              />
            </div>

            {/* Phone Numbers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                  Mobile Phone
                </label>
                <div className="relative">
                  <PhoneCall className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187]/20 focus:border-[#168187] transition-all duration-200"
                    placeholder="Enter mobile number"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="fixedPhone" className="text-sm font-semibold text-gray-700">
                  Fixed Phone
                </label>
                <div className="relative">
                  <PhoneCall className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="fixedPhone"
                    type="tel"
                    value={formData.fixedPhone}
                    onChange={(e) => setFormData({ ...formData, fixedPhone: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187]/20 focus:border-[#168187] transition-all duration-200"
                    placeholder="Enter fixed phone number"
                  />
                </div>
              </div>
            </div>

            {/* Emails */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="contactEmail" className="text-sm font-semibold text-gray-700">
                  Contact Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187]/20 focus:border-[#168187] transition-all duration-200"
                    placeholder="Enter contact email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="emailService" className="text-sm font-semibold text-gray-700">
                  Service Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="emailService"
                    type="email"
                    value={formData.emailService}
                    onChange={(e) => setFormData({ ...formData, emailService: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187]/20 focus:border-[#168187] transition-all duration-200"
                    placeholder="Enter service email"
                  />
                </div>
              </div>
            </div>

            {/* Additional Fields */}
            <div className="space-y-2">
              <label htmlFor="emailSpontaneous" className="text-sm font-semibold text-gray-700">
                Spontaneous Application Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="emailSpontaneous"
                  type="email"
                  value={formData.emailSpontaneous}
                  onChange={(e) => setFormData({ ...formData, emailSpontaneous: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187]/20 focus:border-[#168187] transition-all duration-200"
                  placeholder="Enter spontaneous application email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="workTime" className="text-sm font-semibold text-gray-700">
                Work Hours
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="workTime"
                  type="text"
                  value={formData.workTime}
                  onChange={(e) => setFormData({ ...formData, workTime: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187]/20 focus:border-[#168187] transition-all duration-200"
                  placeholder="Enter work hours (e.g., Mon-Fri 9:00-17:00)"
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/admin/contacts')}
                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
                disabled={isLoading}
              >
                <X className="w-5 h-5" />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-[#168187] text-white font-medium hover:bg-[#168187]/90 transition-colors duration-200 flex items-center space-x-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactEdit;