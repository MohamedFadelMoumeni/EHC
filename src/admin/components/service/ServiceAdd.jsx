import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Check, X, FileText, Users, Building2, GraduationCap } from 'lucide-react';

const ServiceAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    serviceCategory: '',
    description: ''
  });

  const categories = [
    { id: 'STUDENT', icon: GraduationCap, label: 'Student Services' },
    { id: 'COMPANY', icon: Building2, label: 'Company Solutions' },
    { id: 'EMPLOYEE', icon: Users, label: 'Employee Benefits' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/api/services', formData);
      toast.success('Service added successfully');
      navigate('/admin/services');
    } catch (error) {
      console.error('Error adding service:', error);
      toast.error('Failed to add service. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-t-xl shadow-sm p-6 border-b-2 border-[#168187]">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-[#168187]" />
            <h1 className="text-3xl font-bold text-gray-800">Add New Service</h1>
          </div>
          <p className="mt-2 text-gray-600 ml-11">Create a new service by filling out the information below</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-b-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-gray-700">
                Service Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187]/20 focus:border-[#168187] transition-all duration-200"
                placeholder="Enter service name"
                required
              />
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Service Category
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {categories.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setFormData({ ...formData, serviceCategory: id })}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center space-y-2
                      ${formData.serviceCategory === id 
                        ? 'border-[#168187] bg-[#168187]/5 text-[#168187]' 
                        : 'border-gray-200 hover:border-[#168187]/50'}`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-semibold text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187]/20 focus:border-[#168187] transition-all duration-200 min-h-[150px]"
                placeholder="Describe the service in detail..."
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/admin/services')}
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
                <span>Add Service</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceAdd;