import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FileEdit, DollarSign, Building2, Save, X, Loader2, FileText } from 'lucide-react';

const PServiceEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    businessUnit: '',
    description: ''
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/business-services/${id}`);
        const service = response.data;
        setFormData({
          name: service.name,
          price: service.price,
          businessUnit: service.businessUnit,
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
      await axios.put(`http://localhost:8081/api/business-services/${id}`, {
        ...formData,
        price: Number(formData.price)
      });
      toast.success('Service updated successfully');
      navigate('/admin/payment');
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
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187]/20 focus:border-[#168187] transition-all duration-200"
                  placeholder="Enter service name"
                  required
                />
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-semibold text-gray-700">
                Price
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187]/20 focus:border-[#168187] transition-all duration-200"
                  placeholder="Enter price"
                  required
                />
              </div>
            </div>

            {/* Business Unit */}
            <div className="space-y-2">
              <label htmlFor="businessUnit" className="text-sm font-semibold text-gray-700">
                Business Unit
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  id="businessUnit"
                  value={formData.businessUnit}
                  onChange={(e) => setFormData({ ...formData, businessUnit: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187]/20 focus:border-[#168187] transition-all duration-200"
                  required
                >
                  <option value="">Select business unit</option>
                  <option value="CONSULTING">CONSULTING</option>
                  <option value="RECRUITMENT">RECRUITMENT</option>
                  <option value="LEARNING">LEARNING</option>
                  <option value="SERVICES">SERVICES</option>
                  <option value="ENGINEERING">ENGINEERING</option>
                </select>
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187]/20 focus:border-[#168187] transition-all duration-200"
                placeholder="Enter service description"
                required
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/admin/payment')}
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

export default PServiceEdit;