import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Pencil, Upload, X, ChevronLeft, MessageSquare } from 'lucide-react';

const TestimonialEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    author: '',
    function: '',
    content: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/testimonials/${id}`);
        setFormData({
          author: response.data.author,
          function: response.data.function,
          content: response.data.content
        });
        if (response.data.imagePath) {
          setImagePreview(`http://localhost:8081/api/uploads/testimonials/${response.data.imagePath}`);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching testimonial:', error);
        toast.error('Failed to load testimonial details');
        navigate('/admin/about');
      }
    };

    fetchTestimonial();
  }, [id, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      const testimonialData = {
        author: formData.author,
        function: formData.function,
        content: formData.content
      };

      formDataToSend.append('testimonial', new Blob([JSON.stringify(testimonialData)], { type: 'application/json' }));
      if (imageFile) {
        formDataToSend.append('imageFile', imageFile);
      }

      await axios.put(`http://localhost:8081/api/testimonials/${id}`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Testimonial updated successfully');
      navigate('/admin/about');
    } catch (error) {
      console.error('Error updating testimonial:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update testimonial';
      toast.error(errorMessage);
    }
  };

  const inputStyles = `
    block w-full rounded-lg border border-gray-200 bg-white px-4 py-3
    text-gray-700 transition-all duration-200 ease-in-out placeholder:text-gray-400
    focus:border-[#168187] focus:ring-2 focus:ring-[#168187] focus:ring-opacity-20
    hover:border-[#168187]
  `;

  const labelStyles = 'block text-sm font-medium text-gray-700 mb-2';

  const SectionHeader = ({ icon: Icon, title }) => (
    <div className="mb-6 flex items-center space-x-2 border-b border-gray-100 pb-4">
      <Icon className="h-5 w-5 text-[#168187]" />
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#168187] border-t-transparent"></div>
          <p className="mt-4 text-sm text-gray-600">Loading testimonial details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <button
          onClick={() => navigate('/admin/about')}
          className="group mb-6 inline-flex items-center text-gray-600 hover:text-[#168187]"
        >
          <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to About
        </button>

        <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-100">
          <div className="bg-[#168187]/5 px-8 py-6">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-[#168187] p-2 text-white">
                <Pencil className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Edit Testimonial</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 p-8">
            {/* Author Image */}
            <div>
              <SectionHeader icon={Upload} title="Author Image" />
              <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 transition-colors hover:border-[#168187]">
                <div className="flex flex-col items-center justify-center text-center">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-48 w-48 rounded-lg object-cover shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
                        }}
                        className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1.5 text-white shadow-md transition-transform hover:bg-red-600 hover:scale-110"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-4 rounded-full bg-[#168187]/10 p-4">
                        <Upload className="h-8 w-8 text-[#168187]" />
                      </div>
                      <label
                        htmlFor="image-upload"
                        className="group cursor-pointer space-y-4"
                      >
                        <span className="block rounded-lg bg-[#168187] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#126970] hover:shadow-md group-hover:scale-105">
                          Choose Image
                        </span>
                        <input
                          id="image-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        <span className="block text-sm text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </span>
                      </label>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Author Information */}
            <div>
              <SectionHeader icon={Pencil} title="Author Information" />
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="author" className={labelStyles}>
                    Full Name
                  </label>
                  <input
                    id="author"
                    type="text"
                    className={inputStyles}
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    required
                    placeholder="Enter author's name"
                  />
                </div>
                <div>
                  <label htmlFor="function" className={labelStyles}>
                  function
                  </label>
                  <input
                    id="function"
                    type="text"
                    className={inputStyles}
                    value={formData.function}
                    onChange={(e) => setFormData({ ...formData,function: e.target.value })}
                    required
                    placeholder="Enter author's function"
                  />
                </div>
              </div>
            </div>

            {/* Testimonial Content */}
            <div>
              <SectionHeader icon={MessageSquare} title="Testimonial Content" />
              <textarea
                id="content"
                className={`${inputStyles} h-32 resize-none`}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                placeholder="Enter testimonial content"
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 border-t pt-6">
              <button
                type="button"
                onClick={() => navigate('/admin/about')}
                className="rounded-lg border-2 border-[#168187] px-6 py-2.5 text-sm font-semibold text-[#168187] shadow-sm transition-all hover:bg-[#168187]/5 hover:shadow-md focus:ring-2 focus:ring-[#168187] focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-[#168187] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#126970] hover:shadow-md focus:ring-2 focus:ring-[#168187] focus:ring-offset-2"
              >
                Update Testimonial
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TestimonialEdit;