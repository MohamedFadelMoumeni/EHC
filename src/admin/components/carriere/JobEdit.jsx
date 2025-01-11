import React, { useState, useEffect, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FileText, MapPin, Mail, Hash, Briefcase, Edit2, User, Image, List } from 'lucide-react';

const InputWrapper = memo(({ children, label }) => (
  <div className="relative">
    <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
    {children}
  </div>
));

InputWrapper.displayName = 'InputWrapper';

const JOB_CATEGORIES = [
  'SOFTWARE_ENGINEERING',
  'DATA_SCIENCE',
  'DESIGN',
  'MARKETING',
  'SALES',
  'HUMAN_RESOURCES',
  'FINANCE',
  'OPERATIONS',
  'CONSULTING',
  'CUSTOMER_SERVICE',
  'PRODUCT_MANAGEMENT',
  'ENGINEERING',
  'IT_SUPPORT',
  'LEGAL',
  'EDUCATION',
  'HEALTHCARE',
  'CONSTRUCTION',
  'MANUFACTURING',
  'SUPPLY_CHAIN',
  'OTHER'
];

const JobEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobType: '',
    jobSource: '',
    jobCategory: '',
    partnerName: '',
    title: '',
    location: '',
    description: '',
    requirements: '',
    email: '',
    reference: ''
  });
  const [logo, setLogo] = useState(null);
  const [currentLogo, setCurrentLogo] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/jobs/${id}`);
        setFormData({
          ...response.data,
          jobSource: response.data.jobSource || 'OUR_JOB',
          jobCategory: response.data.jobCategory || 'SOFTWARE_ENGINEERING',
          partnerName: response.data.partnerName || ''
        });
        if (response.data.imagePath) {
          setCurrentLogo(`http://localhost:8081/api/uploads/Jobs/${response.data.imagePath}`);
        }
      } catch (error) {
        console.error('Error fetching job:', error);
        toast.error('Failed to fetch job details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value,
      partnerName: field === 'jobSource' && value !== 'PARTNER_JOB' ? '' : prev.partnerName,
    }));
  };

  const handleLogoChange = (e) => {
    if (e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      
      // Convert form data to JSON and append as blob
      const jsonData = new Blob([JSON.stringify({
        ...formData,
        logo: null // Exclude logo from JSON
      })], {
        type: 'application/json'
      });
      formDataToSend.append('job', jsonData);

      // Append logo if changed
      if (logo) {
        formDataToSend.append('imageFile', logo);
      }

      await axios.put(`http://localhost:8081/api/jobs/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Job updated successfully');
      navigate('/admin/career');
    } catch (error) {
      console.error('Error updating job:', error);
      toast.error('Failed to update job. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-[#168187] text-lg font-semibold">Loading job details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-[#168187] px-6 py-4">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Edit2 className="w-6 h-6" />
              Edit Job Position
            </h1>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputWrapper label="Job Type">
                <div className="relative">
                  <select
                    value={formData.jobType}
                    onChange={handleChange('jobType')}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#168187] focus:ring-1 focus:ring-[#168187]"
                  >
                    <option value="JOB">Full-time Position</option>
                    <option value="INTERNSHIP">Internship</option>
                  </select>
                </div>
              </InputWrapper>

              <InputWrapper label="Job Category">
                <div className="relative">
                  <select
                    value={formData.jobCategory}
                    onChange={handleChange('jobCategory')}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#168187] focus:ring-1 focus:ring-[#168187]"
                  >
                    {JOB_CATEGORIES.map(category => (
                      <option key={category} value={category}>
                        {category.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </select>
                  <List className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                </div>
              </InputWrapper>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputWrapper label="Job Source">
                <div className="relative">
                  <select
                    value={formData.jobSource}
                    onChange={handleChange('jobSource')}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#168187] focus:ring-1 focus:ring-[#168187]"
                  >
                    <option value="OUR_JOB">Internal Position</option>
                    <option value="PARTNER_JOB">Partner Position</option>
                  </select>
                </div>
              </InputWrapper>

              <InputWrapper label="Logo">
                <div className="space-y-2">
                  {currentLogo && (
                    <img
                      src={currentLogo}
                      alt="Current Logo"
                      className="h-16 object-contain mb-2"
                    />
                  )}
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleLogoChange}
                      accept="image/*"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#168187] focus:ring-1 focus:ring-[#168187]"
                    />
                    <Image className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                  </div>
                </div>
              </InputWrapper>
            </div>

            {formData.jobSource === 'PARTNER_JOB' && (
              <InputWrapper label="Partner Name">
                <div className="relative">
                  <input
                    type="text"
                    value={formData.partnerName}
                    onChange={handleChange('partnerName')}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#168187] focus:ring-1 focus:ring-[#168187]"
                    placeholder="Enter partner name"
                    required
                  />
                  <User className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                </div>
              </InputWrapper>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputWrapper label="Job Title">
                <div className="relative">
                  <input
                    type="text"
                    value={formData.title}
                    onChange={handleChange('title')}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#168187] focus:ring-1 focus:ring-[#168187]"
                    placeholder="Enter job title"
                    required
                  />
                  <Briefcase className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                </div>
              </InputWrapper>

              <InputWrapper label="Location">
                <div className="relative">
                  <input
                    type="text"
                    value={formData.location}
                    onChange={handleChange('location')}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#168187] focus:ring-1 focus:ring-[#168187]"
                    placeholder="Enter location"
                    required
                  />
                  <MapPin className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                </div>
              </InputWrapper>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputWrapper label="Email">
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#168187] focus:ring-1 focus:ring-[#168187]"
                    placeholder="Enter contact email"
                    required
                  />
                  <Mail className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                </div>
              </InputWrapper>

              <InputWrapper label="Reference Number">
                <div className="relative">
                  <input
                    type="text"
                    value={formData.reference}
                    onChange={handleChange('reference')}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#168187] focus:ring-1 focus:ring-[#168187]"
                    placeholder="Enter reference number"
                    required
                  />
                  <Hash className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                </div>
              </InputWrapper>
            </div>

            <InputWrapper label="Job Description">
              <div className="relative">
                <textarea
                  value={formData.description}
                  onChange={handleChange('description')}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#168187] focus:ring-1 focus:ring-[#168187] min-h-32"
                  placeholder="Enter detailed job description"
                  required
                />
                <FileText className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
              </div>
            </InputWrapper>

            <InputWrapper label="Requirements">
              <div className="relative">
                <textarea
                  value={formData.requirements}
                  onChange={handleChange('requirements')}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#168187] focus:ring-1 focus:ring-[#168187] min-h-32"
                  placeholder="Enter job requirements"
                  required
                />
                <FileText className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
              </div>
            </InputWrapper>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/admin/career')}
                className="px-6 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-[#168187] text-white font-medium hover:bg-[#126d76]"
              >
                Update Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobEdit;