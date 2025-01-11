import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ApplicationEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    type: '',
    date: '',
    status: ''
  });

  useEffect(() => {
    const fetchApplication = () => {
      const application = {
        id,
        name: 'John Doe',
        position: 'Senior Frontend Developer',
        type: 'Job',
        date: '2024-03-15',
        status: 'New'
      };
      setFormData(application);
    };
    fetchApplication();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Application updated:', formData);
    toast.success('Application updated');
    navigate('/admin/career');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="bg-white shadow rounded-lg p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Application</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Applicant Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-2 block w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position</label>
            <input
              id="position"
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="mt-2 block w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="mt-2 block w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="Job">Job</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Application Date</label>
            <input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="mt-2 block w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="mt-2 block w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="New">New</option>
              <option value="In Review">In Review</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">

            <button
              type="button"
              onClick={() => navigate('/admin/career')}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Update Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationEdit;
