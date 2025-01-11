import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Pencil, Upload, X, ChevronLeft, Award, Book, Globe, Clock, Briefcase } from 'lucide-react';

const ExpertEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    function: '',
    biography: '',
    expertises: '',
    education: '',
    languages: '',
    seniority: '',
    expertCategory: '', // Added new field
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const expertCategories = [
    'CONSULTING',
    'RECRUITMENT',
    'LEARNING',
    'SERVICE_AND_EVENT',
    'ENGINEERING'
  ];

  useEffect(() => {
    const fetchExpert = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/experts/${id}`);
        setFormData({
          fullName: response.data.fullName,
          function: response.data.function,
          biography: response.data.biography,
          expertises: response.data.expertises,
          education: response.data.education,
          languages: response.data.languages,
          seniority: response.data.seniority,
          expertCategory: response.data.expertCategory, // Load existing category
        });
        if (response.data.imagePath) {
          setImagePreview(`http://localhost:8081/api/uploads/experts/${response.data.imagePath}`);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching expert:', error);
        toast.error('Failed to load expert details');
        navigate('/admin/about');
      }
    };

    fetchExpert();
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
      const expertData = {
        fullName: formData.fullName,
        function: formData.function,
        biography: formData.biography,
        expertises: formData.expertises,
        education: formData.education,
        languages: formData.languages,
        seniority: Number(formData.seniority),
        expertCategory: formData.expertCategory, // Include category in update
      };
      formDataToSend.append('expert', new Blob([JSON.stringify(expertData)], { type: 'application/json' }));
      if (imageFile) {
        formDataToSend.append('imageFile', imageFile);
      }

      await axios.put(`http://localhost:8081/api/experts/${id}`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Expert updated successfully');
      navigate('/admin/about');
    } catch (error) {
      console.error('Error updating expert:', error);
      toast.error('Failed to update expert. Please try again.');
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
          <p className="mt-4 text-sm text-gray-600">Loading expert details...</p>
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
          Back to Experts
        </button>

        <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-100">
          <div className="bg-[#168187]/5 px-8 py-6">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-[#168187] p-2 text-white">
                <Pencil className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Edit Expert Profile</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 p-8">
            {/* Personal Information */}
            <div>
              <SectionHeader icon={Pencil} title="Personal Information" />
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className={labelStyles}>Full Name</label>
                  <input
                    id="fullName"
                    type="text"
                    className={inputStyles}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label htmlFor="function" className={labelStyles}>Function</label>
                  <input
                    id="function"
                    type="text"
                    className={inputStyles}
                    value={formData.function}
                    onChange={(e) => setFormData({ ...formData, function: e.target.value })}
                    required
                    placeholder="Enter function"
                  />
                </div>
              </div>
            </div>

            {/* Expert Category */}
            <div>
              <SectionHeader icon={Briefcase} title="Expert Category" />
              <div>
                <label htmlFor="expertCategory" className={labelStyles}>Category</label>
                <select
                  id="expertCategory"
                  className={inputStyles}
                  value={formData.expertCategory}
                  onChange={(e) => setFormData({ ...formData, expertCategory: e.target.value })}
                  required
                >
                  <option value="">Select a category</option>
                  {expertCategories.map((category) => (
                    <option key={category} value={category}>
                      {category.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Biography */}
            <div>
              <SectionHeader icon={Book} title="Biography" />
              <textarea
                id="biography"
                className={`${inputStyles} h-32 resize-none`}
                value={formData.biography}
                onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                required
                placeholder="Enter biography"
              />
            </div>

            {/* Expertise & Languages */}
            <div>
              <SectionHeader icon={Award} title="Expertise & Languages" />
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="expertises" className={labelStyles}>Expertises</label>
                  <input
                    id="expertises"
                    type="text"
                    className={inputStyles}
                    value={formData.expertises}
                    onChange={(e) => setFormData({ ...formData, expertises: e.target.value })}
                    required
                    placeholder="Separate expertises with commas"
                  />
                </div>
                <div>
                  <label htmlFor="languages" className={labelStyles}>Languages</label>
                  <input
                    id="languages"
                    type="text"
                    className={inputStyles}
                    value={formData.languages}
                    onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                    required
                    placeholder="Separate languages with commas"
                  />
                </div>
              </div>
            </div>

            {/* Education & Experience */}
            <div>
              <SectionHeader icon={Globe} title="Education & Experience" />
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="education" className={labelStyles}>Education</label>
                  <textarea
                    id="education"
                    className={`${inputStyles} h-32 resize-none`}
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    required
                    placeholder="Enter education details"
                  />
                </div>
                <div>
                  <label htmlFor="seniority" className={labelStyles}>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-[#168187]" />
                      <span>Years of Experience</span>
                    </div>
                  </label>
                  <input
                    id="seniority"
                    type="number"
                    className={inputStyles}
                    value={formData.seniority}
                    onChange={(e) => setFormData({ ...formData, seniority: e.target.value })}
                    required
                    placeholder="Enter years of experience"
                  />
                </div>
              </div>
            </div>

            {/* Profile Image */}
            <div>
              <SectionHeader icon={Upload} title="Profile Image" />
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
                Update Expert
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )};

  export default ExpertEdit;