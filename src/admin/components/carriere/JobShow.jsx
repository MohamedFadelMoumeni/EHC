import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Briefcase, MapPin, Mail, Hash, FileText, ArrowLeft, User, Image, List } from 'lucide-react';

const JobShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/jobs/${id}`);
        setJob(response.data);
      } catch (err) {
        setError('Failed to fetch job details.');
        console.error('Error fetching job:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (isLoading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-[#168187] text-lg font-semibold">Loading job details...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 text-red-500 mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-2xl font-bold">Error Loading Job</h1>
          </div>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/admin/career')}
            className="flex items-center gap-2 px-6 py-3 bg-[#168187] text-white rounded-lg hover:bg-[#126d76] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Jobs
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-[#168187] px-6 py-4">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Briefcase className="w-6 h-6" />
              Job Details
            </h1>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-6">
                {job.imagePath && (
                  <div className="mb-6">
                    <img
                      src={`http://localhost:8081/api/uploads/Jobs/${job.imagePath}`}
                      alt="Company Logo"
                      className="max-h-24 object-contain"
                    />
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-sm font-semibold">Position</span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="inline-block px-3 py-1 bg-[#168187] bg-opacity-10 text-[#168187] rounded-full text-sm font-medium">
                      {job.jobType === 'JOB' ? 'Full-time Position' : 'Internship'}
                    </span>
                    <span className="inline-block px-3 py-1 bg-[#168187] bg-opacity-10 text-[#168187] rounded-full text-sm font-medium">
                      {job.jobSource === 'OUR_JOB' ? 'Internal Position' : 'Partner Position'}
                    </span>
                    <span className="inline-block px-3 py-1 bg-[#168187] bg-opacity-10 text-[#168187] rounded-full text-sm font-medium">
                      {job.jobCategory?.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>

                {job.jobSource === 'PARTNER_JOB' && (
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <User className="w-4 h-4" />
                      <span className="text-sm font-semibold">Partner Name</span>
                    </div>
                    <p className="text-gray-800">{job.partnerName}</p>
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-semibold">Location</span>
                  </div>
                  <p className="text-gray-800">{job.location}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm font-semibold">Contact Email</span>
                  </div>
                  <p className="text-gray-800">{job.email}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Hash className="w-4 h-4" />
                    <span className="text-sm font-semibold">Reference Number</span>
                  </div>
                  <p className="text-gray-800">{job.reference}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-semibold">Job Description</span>
                  </div>
                  <p className="text-gray-800 whitespace-pre-wrap">{job.description}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-semibold">Requirements</span>
                  </div>
                  <p className="text-gray-800 whitespace-pre-wrap">{job.requirements}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <button
                onClick={() => navigate('/admin/career')}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobShow;