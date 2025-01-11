import React, { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FileText, MapPin, Mail, Hash, Briefcase, User, Image, List } from 'lucide-react';

const InputWrapper = memo(({ children, label }) => (
  <div className="relative">
    <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
    {children}
  </div>
));

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

const JobAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobType: 'JOB',
    jobSource: 'OUR_JOB',
    jobCategory: 'SOFTWARE_ENGINEERING',
    partnerName: '',
    title: '',
    location: '',
    description: '',
    requirements: '',
    email: '',
    reference: '',
    imageFile: null
  });

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({
      ...prev,
      imageFile: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const jobData = {
        jobType: formData.jobType,
        jobSource: formData.jobSource,
        jobCategory: formData.jobCategory,
        partnerName: formData.partnerName,
        title: formData.title,
        location: formData.location,
        description: formData.description,
        requirements: formData.requirements,
        email: formData.email,
        reference: formData.reference
      };

      const formDataToSend = new FormData();
      const jobBlob = new Blob([JSON.stringify(jobData)], { type: 'application/json' });
      formDataToSend.append('job', jobBlob);
      if (formData.imageFile) {
        formDataToSend.append('imageFile', formData.imageFile);
      }

      await axios.post('http://localhost:8081/api/jobs', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      toast.success('Job added successfully');
      navigate('/admin/career');
    } catch (error) {
      console.error('Error adding job:', error);
      toast.error('Failed to add job. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-[#168187] px-6 py-4">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Briefcase className="w-6 h-6" />
              Add New Job
            </h1>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputWrapper label="Job Type">
                <select
                  value={formData.jobType}
                  onChange={handleChange('jobType')}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#168187] focus:ring-1 focus:ring-[#168187]"
                >
                  <option value="JOB">Full Time Position</option>
                  <option value="INTERNSHIP">Internship</option>
                </select>
              </InputWrapper>

              <InputWrapper label="Job Category">
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
              </InputWrapper>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputWrapper label="Job Source">
                <select
                  value={formData.jobSource}
                  onChange={handleChange('jobSource')}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#168187] focus:ring-1 focus:ring-[#168187]"
                >
                  <option value="OUR_JOB">Internal Job</option>
                  <option value="PARTNER_JOB">Partner Job</option>
                </select>
              </InputWrapper>

              <InputWrapper label="Company Logo">
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#168187] focus:ring-1 focus:ring-[#168187]"
                  />
                  <Image className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
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
              <InputWrapper label="Contact Email">
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
                Add Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobAdd;