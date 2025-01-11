import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from '../components/DataTable'; // Adjust path to your DataTable component
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../layouts/ConfirmationModal'; // Adjust path to your ConfirmationModal component

const Services = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('services');
  const [data, setData] = useState({ services: [] });
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Columns configuration
  const columns = {
    services: [
      { key: 'name', label: 'Name' },
      { key: 'serviceCategory', label: 'Category' },
      { key: 'description', label: 'Description' },
    ]
  };

  // Fetch data from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/services');
        setData({ services: response.data });
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  // Handle delete operation
  const handleDelete = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedItem) {
      try {
        await axios.delete(`http://localhost:8081/api/services/${selectedItem.id}`);
        setData((prev) => ({
          ...prev,
          services: prev.services.filter((item) => item.id !== selectedItem.id),
        }));
        setSelectedItem(null);
        setModalOpen(false);
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="bg-white rounded-lg shadow">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('services')}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'services'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Services
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            <DataTable
              title="Manage Services"
              data={data[activeTab]}
              columns={columns[activeTab]}
              onAdd={() => navigate(`/admin/servicesadd`)}
              onEdit={(item) => navigate(`/admin/servicesedit/${item.id}`)}
              onDelete={handleDelete}
              onView={(item) => navigate(`/admin/servicesshow/${item.id}`)}
              searchPlaceholder="Search services..."
            />
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this service?"
      />
    </div>
  );
};

export default Services;
