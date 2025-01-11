import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Check, X, PhoneCall, Mail, Clock } from 'lucide-react';

const ContactAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    contactAddress: '',
    phone: '',
    fixedPhone: '',
    contactEmail: '',
    workTime: '',
    emailService: '',
    emailSpontaneous: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/api/contacts', formData);
      toast.success('Contact information added successfully');
      navigate('/admin/contacts');
    } catch (error) {
      console.error('Error adding contact:', error);
      toast.error('Failed to add contact information. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-t-xl shadow-sm p-6 border-b-2 border-[#168187]">
          <div className="flex items-center space-x-3">
            <Mail className="w-8 h-8 text-[#168187]" />
            <h1 className="text-3xl font-bold text-gray-800">Add Contact Information</h1>
          </div>
          <p className="mt-2 text-gray-600 ml-11">Create new contact information by filling out the details below</p>
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
                value={formData.contactAddress}
                onChange={(e) => setFormData({ ...formData, contactAddress: e.target.value })}
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
              >
                <X className="w-5 h-5" />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-[#168187] text-white font-medium hover:bg-[#168187]/90 transition-colors duration-200 flex items-center space-x-2"
              >
                <Check className="w-5 h-5" />
                <span>Add Contact</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactAdd;