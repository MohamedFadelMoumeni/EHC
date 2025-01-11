import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const ApplicationShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const application = {
    id,
    name: 'John Doe',
    position: 'Senior Frontend Developer',
    type: 'Job',
    date: '2024-03-15',
    status: 'New'
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="bg-white shadow rounded-lg p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Application Details</h1>
        <div className="mb-4">
          <p><strong>Applicant Name:</strong> {application.name}</p>
          <p><strong>Position:</strong> {application.position}</p>
          <p><strong>Type:</strong> {application.type}</p>
          <p><strong>Date:</strong> {application.date}</p>
          <p><strong>Status:</strong> {application.status}</p>
        </div>
        <button
          onClick={() => navigate('/admin/career')}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Back to Applications
        </button>
      </div>
    </div>
  );
};

export default ApplicationShow;
