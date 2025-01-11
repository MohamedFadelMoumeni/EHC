import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FileEdit, Tag, Percent, Save, X, Loader2 } from 'lucide-react';

const PromotionEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    promoCode: '',
    reductionValue: '',
    description: ''
  });

  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/promos/${id}`);
        const promo = response.data;
        setFormData({
          promoCode: promo.promoCode,
          reductionValue: promo.reductionValue,
          description: promo.description
        });
      } catch (error) {
        console.error('Error fetching promotion:', error);
        toast.error('Failed to fetch promotion details.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPromotion();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.put(`http://localhost:8081/api/promos/${id}`, {
        ...formData,
        reductionValue: Number(formData.reductionValue)
      });
      toast.success('Promotion updated successfully');
      navigate('/admin/payment');
    } catch (error) {
      console.error('Error updating promotion:', error);
      toast.error('Failed to update promotion.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex items-center space-x-3 text-[#168187]">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="text-lg font-medium">Loading promotion details...</span>
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
            <h1 className="text-3xl font-bold text-gray-800">Edit Promotion</h1>
          </div>
          <p className="mt-2 text-gray-600 ml-11">Modify the promotion details below</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-b-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Promo Code */}
            <div className="space-y-2">
              <label htmlFor="promoCode" className="text-sm font-semibold text-gray-700">
                Promo Code
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="promoCode"
                  type="text"
                  value={formData.promoCode}
                  onChange={(e) => setFormData({ ...formData, promoCode: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187]/20 focus:border-[#168187] transition-all duration-200"
                  placeholder="Enter promo code"
                  required
                />
              </div>
            </div>

            {/* Reduction Value */}
            <div className="space-y-2">
              <label htmlFor="reductionValue" className="text-sm font-semibold text-gray-700">
                Reduction Value (%)
              </label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="reductionValue"
                  type="number"
                  value={formData.reductionValue}
                  onChange={(e) => setFormData({ ...formData, reductionValue: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187]/20 focus:border-[#168187] transition-all duration-200"
                  placeholder="Enter reduction percentage"
                  required
                  min="0"
                  max="100"
                />
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
                placeholder="Enter promotion description"
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

export default PromotionEdit;