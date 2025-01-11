import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, Pencil } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PartnerEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    companyURL: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchPartner = async () => {
        try {
          const response = await axios.get(`http://localhost:8081/api/partners/${id}`);
          setFormData({
            name: response.data.name,
            companyURL: response.data.companyURL
          });
          setImagePreview(response.data.imagePath ? `http://localhost:8081/api/uploads/partners/${response.data.imagePath}` : '');
        } catch (error) {
          console.error('Error fetching partner details:', error);
          toast.error('Failed to fetch partner details.');
        }
      };

      fetchPartner();
    }
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create FormData object
      const formDataToSend = new FormData();

      // Append 'partner' as a JSON string
      const partnerData = {
        name: formData.name,
        companyURL: formData.companyURL
      };
      formDataToSend.append("partner", new Blob([JSON.stringify(partnerData)], { type: "application/json" }));

      // Append 'imageFile' if it exists
      if (imageFile) {
        formDataToSend.append('imageFile', imageFile);
      }

      // Log formData contents for debugging
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}:`, value);
      }

      // Send the data via Axios
      await axios.put(`http://localhost:8081/api/partners/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Axios automatically includes the boundary
        },
      });

      toast.success('Partner updated successfully');
      navigate('/admin/about');
    } catch (error) {
      console.error('Error updating partner:', error);
      toast.error('Failed to update partner. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#168187] px-6 py-4 flex items-center justify-center gap-2">
            <Pencil className="w-6 h-6 text-white" />
            <h1 className="text-2xl font-bold text-white">Edit Partner</h1>
          </div>

          {/* Form */}
          <div className="px-6 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187] focus:border-transparent transition duration-200 ease-in-out"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Enter partner name"
                />
              </div>

              {/* Website URL Input */}
              <div>
                <label htmlFor="companyURL" className="block text-sm font-medium text-gray-700 mb-1">
                  Website URL
                </label>
                <input
                  id="companyURL"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187] focus:border-transparent transition duration-200 ease-in-out"
                  value={formData.companyURL}
                  onChange={(e) => setFormData({ ...formData, companyURL: e.target.value })}
                  required
                  placeholder="https://example.com"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logo Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-[#168187] transition-colors duration-200">
                  <div className="space-y-2 text-center">
                    {imagePreview ? (
                      <div className="flex flex-col items-center">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="h-32 w-auto object-contain mb-4"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview(null);
                          }}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Remove image
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="image-upload"
                            className="relative cursor-pointer rounded-md font-medium text-[#168187] hover:text-[#126970] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#168187] focus-within:ring-offset-2"
                          >
                            <span>Upload a file</span>
                            <input
                              id="image-upload"
                              name="image-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#168187] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#126970] transform transition duration-200 ease-in-out hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#168187]"
                >
                  Update Partner
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/admin/about')}
                  className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transform transition duration-200 ease-in-out hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerEdit;
