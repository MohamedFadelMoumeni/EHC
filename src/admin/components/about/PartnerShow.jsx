import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Eye } from 'lucide-react';
import axios from 'axios';

const PartnerShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/partners/${id}`);
        setPartner(response.data);
      } catch (error) {
        console.error('Error fetching partner details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartner();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#168187] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header with Icon */}
        <div className="bg-[#168187] px-6 py-4 flex items-center justify-center gap-2">
          <Eye className="w-6 h-6 text-white" />
          <h1 className="text-xl font-semibold text-white">View Partner</h1>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="mt-1 p-2 block w-full rounded-lg border border-gray-200 bg-gray-50">
              {partner?.name || 'No name available'}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Website URL
            </label>
            {partner?.companyURL ? (
              <a
                href={partner.companyURL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 p-2 block w-full rounded-lg border border-gray-200 bg-gray-50 text-[#168187] hover:text-[#126970]"
              >
                {partner.companyURL}
              </a>
            ) : (
              <div className="mt-1 p-2 block w-full rounded-lg border border-gray-200 bg-gray-50">
                No URL available
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Logo Image
            </label>
            <div className="mt-1 border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
              {partner?.imagePath ? (
                <div className="flex justify-center">
                  <img
                    src={"http://localhost:8081/api/uploads/partners/"+partner.imagePath}
                    alt={`${partner.name} logo`}
                    className="w-[200px] h-[200px] object-contain"
                  />
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  No logo available
                </div>
              )}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate('/admin/about')}
              className="w-full bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Partners
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerShow;