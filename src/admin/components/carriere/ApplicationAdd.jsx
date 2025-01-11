import React, { useState } from 'react';
import DataTable from '../components/DataTable';

const JobApplicationViewer = () => {
  const [applications, setApplications] = useState([
    { id: 1, reference: 'JOB-123', fullName: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, reference: 'JOB-456', fullName: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
    { id: 3, reference: 'JOB-789', fullName: 'Bob Johnson', email: 'bob@example.com', phone: '555-123-4567' },
  ]);

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [searchReference, setSearchReference] = useState('');

  const handleSearch = () => {
    const application = applications.find(app => app.reference === searchReference);
    setSelectedApplication(application || null);
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'reference', label: 'Reference' },
    { key: 'fullName', label: 'Full Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-6 px-2 sm:px-4 lg:px-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter job reference"
          value={searchReference}
          onChange={(e) => setSearchReference(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-64 mr-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white rounded px-4 py-2"
        >
          Search
        </button>
      </div>

      {selectedApplication ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Application Details</h2>
          <p><strong>Full Name:</strong> {selectedApplication.fullName}</p>
          <p><strong>Email:</strong> {selectedApplication.email}</p>
          <p><strong>Phone:</strong> {selectedApplication.phone}</p>
        </div>
      ) : (
        <DataTable
          title="Job Applications"
          data={applications}
          columns={columns}
          searchPlaceholder="Search applications..."
        />
      )}
    </div>
  );
};

export default JobApplicationViewer;