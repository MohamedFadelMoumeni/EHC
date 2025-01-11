import React, { useState, useEffect, act } from 'react';
import axios from 'axios';
import DataTable from '../components/DataTable'; // Adjust path to your DataTable component
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../layouts/ConfirmationModal'; // Adjust path to your ConfirmationModal component

const Career = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('jobs');
  const [data, setData] = useState({
    jobs: [],
    applications: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch jobs data from the API
  useEffect(() => {
    const fetchData = async () => {
      console.log('fetching ff jobs');
      try {
        if (activeTab === 'jobs') {
          console.log('fetching jobs');
          const response = await axios.get('http://localhost:8081/api/jobs');
          setData((prev) => ({ ...prev, jobs: response.data }));
        } else if (activeTab === 'applications') {
          const response = await axios.get('http://localhost:8081/api/applications');
          setData((prev) => ({ ...prev, applications: response.data }));
        } 
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [activeTab]); // add activeTab as a dependency
  

    /*
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/jobs');
        const jobs = response.data.map((job) => ({
          id: job.id,
          title: job.title,
          department: job.jobType,
          location: job.location,
          type: job.jobType,
          email: job.email,
          description: job.description,
        }));
        setData((prev) => ({ ...prev, jobs }));
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);*/

  const columns = {
    jobs: [
      { key: 'title', label: 'Title' },
      { key: 'jobCategory', label: 'Department' },
      { key: 'location', label: 'Location' },
      { key: 'jobType', label: 'Type' },
      { key: 'email', label: 'Email' },
    ],
    applications: [
      { key: 'fullName', label: 'Full name' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone number' },
      { key: 'reference', label: 'Reference' },
    ]

  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedItem) {
      try {
        if (activeTab === 'jobs') {
          await axios.delete(`http://localhost:8081/api/jobs/${selectedItem.id}`);
          setData((prev) => ({
            ...prev,
            jobs: prev.jobs.filter((job) => job.id !== selectedItem.id),
          }));
        } else if (activeTab === 'applications') {
          await axios.delete(`http://localhost:8081/api/applications/${selectedItem.id}`);
          setData((prev) => ({
            ...prev,
            applications: prev.applications.filter((app) => app.id !== selectedItem.id),
          }));
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      } finally {
        setSelectedItem(null);
        setModalOpen(false);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="bg-white rounded-lg shadow">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
              {['jobs','applications'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {setActiveTab(tab);
                    console.log('tab',activeTab);
                  }}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            <DataTable
              title={`Manage ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
              data={data[activeTab]}
              columns={columns[activeTab]}
              onAdd={() => activeTab === 'jobs' && navigate('/admin/career/jobsadd' )}
              onEdit={(item) =>
                activeTab === 'jobs' && navigate(`/admin/career/jobsedit/${item.id}`)
              }
              onDelete={handleDelete}
              onView={(item) =>
                navigate(`/admin/career/${activeTab === 'jobs' ? 'jobsshow' : 'applicationsshow'}/${item.id}`)
              }
              searchPlaceholder={`Search ${activeTab}...`}
            />
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        message={`Are you sure you want to delete this ${activeTab.slice(0, -1)}?`}
      />
    </div>
  );
};

export default Career;
