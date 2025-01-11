import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from '../components/DataTable'; // Adjust path to your DataTable component
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../layouts/ConfirmationModal'; // Adjust path to your ConfirmationModal component

const Contact = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('contacts');
  const [data, setData] = useState({ contacts: [] });
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Columns configuration
  const columns = {
    contacts: [
      { key: 'phone', label: 'Phone' },
      { key: 'fixedPhone', label: 'Fixed Phone' },
      { key: 'contactEmail', label: 'Contact Email' },
      { key: 'emailService', label: 'Service Email' },
      { key: 'emailSpontaneous', label: 'Spontaneous Email' },
    ]
  };

  // Fetch data from API
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/contactConfigs/1');
        const contact = [response.data];
        setData({ contacts: contact });
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  // Handle delete operation
  const handleDelete = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedItem) {
      try {
        await axios.delete(`http://localhost:8081/api/contactConfigs/${selectedItem.id}`);
        setData((prev) => ({
          ...prev,
          contacts: prev.contacts.filter((item) => item.id !== selectedItem.id),
        }));
        setSelectedItem(null);
        setModalOpen(false);
      } catch (error) {
        console.error('Error deleting contact:', error);
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
                onClick={() => setActiveTab('contacts')}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'contacts'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Contact Information
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            <DataTable
              title="Manage Contact Information"
              data={data[activeTab]}
              columns={columns[activeTab]}
              // onAdd={() => navigate(`/admin/contactsadd`)}
              onEdit={(item) => navigate(`/admin/contactsedit/${item.id}`)}
              // onDelete={()=>{console.log("no delete method !")}}
              onView={(item) => navigate(`/admin/contactsshow/${item.id}`)}
              searchPlaceholder="Search contacts..."
            />
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this contact information?"
      />
    </div>
  );
};

export default Contact;