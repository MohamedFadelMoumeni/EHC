import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FileEdit, Users, Building2, GraduationCap, Save, X, Loader2 } from 'lucide-react';

const ServiceEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: ''
  });

  const categories = [
    { id: 'STUDENT', icon: GraduationCap, label: 'Student Services' },
    { id: 'COMPANY', icon: Building2, label: 'Company Solutions' },
    { id: 'EMPLOYEE', icon: Users, label: 'Employee Benefits' }
  ];

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/services/${id}`);
        const service = response.data;
        setFormData({
          name: service.name,
          category: service.serviceCategory,
          description: service.description
        });
      } catch (error) {
        console.error('Error fetching service:', error);
        toast.error('Failed to fetch service details.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchService();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.put(`http://localhost:8081/api/services/${id}`, {
        name: formData.name,
        serviceCategory: formData.category,
        description: formData.description
      });
      toast.success('Service updated successfully');
      navigate('/admin/services');
    } catch (error) {
      console.error('Error updating service:', error);
      toast.error('Failed to update service.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex items-center space-x-3 text-[#168187]">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="text-lg font-medium">Loading service details...</span>
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
            <h1 className="text-3xl font-bold text-gray-800">Edit Service</h1>
          </div>
          <p className="mt-2 text-gray-600 ml-11">Modify the service information below</p>
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
                {categories.map(({ id: catId, icon: Icon, label }) => (
                  <button
                    key={catId}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: catId })}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center space-y-2
                      ${formData.category === catId 
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

export default ServiceEdit;