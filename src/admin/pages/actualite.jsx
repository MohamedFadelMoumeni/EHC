import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DataTable from '../components/DataTable';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../layouts/ConfirmationModal';

const News = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('news');
  const [data, setData] = useState({ 
    news: [],
    subscriptions: [] 
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const apiEndpoint = 'http://localhost:8081/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTab === 'news') {
          const response = await axios.get(`${apiEndpoint}/news`);
          const formattedData = response.data.map((item) => ({
            id: item.id,
            title: item.title,
            date: new Date(item.eventDate).toLocaleDateString(),
            location: item.location,
            type: item.newsType.toLowerCase(),
            eventsCount: item.activities?.length || 0,
          }));
          setData(prev => ({ ...prev, news: formattedData }));
        } else {
          // Fetch subscriptions data when that endpoint is ready
          // For now, using placeholder data
          const response = await axios.get(`${apiEndpoint}/subscribers`);
          const formattedSubscriptions = response.data.map((item) => ({
            id: item.id,
            email: item.email,
            date: new Date(item.subscriptionDate).toLocaleDateString(),
          }));
          setData(prev => ({ ...prev, subscriptions: formattedSubscriptions }));
        }
      } catch (error) {
        console.error(`Error fetching ${activeTab} data:`, error);
        toast.error(`Failed to fetch ${activeTab} data`);
      }
    };

    fetchData();
  }, [activeTab]);

  const columns = {
    news: [
      { key: 'title', label: 'Title' },
      { key: 'date', label: 'Date' },
      { key: 'location', label: 'Location' },
      { key: 'type', label: 'Type', render: (value) => (value === 'current' ? 'Current' : 'Upcoming') },
      { key: 'eventsCount', label: 'Events', render: (value) => `${value} events` },
    ],
    subscriptions: [
      { key: 'email', label: 'Email' },
      { key: 'date', label: 'Subscription Date' },
    ],
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedItem) {
      try {
        const endpoint = activeTab === 'news' 
          ? `${apiEndpoint}/news/${selectedItem.id}`
          : `${apiEndpoint}/subscribers/${selectedItem.id}`;

        await axios.delete(endpoint);
        
        setData((prev) => ({
          ...prev,
          [activeTab]: prev[activeTab].filter((item) => item.id !== selectedItem.id),
        }));
        
        toast.success(`${activeTab === 'news' ? 'News' : 'Subscription'} deleted successfully`);
      } catch (error) {
        console.error(`Error deleting ${activeTab}:`, error);
        toast.error(`Failed to delete ${activeTab}`);
      } finally {
        setSelectedItem(null);
        setModalOpen(false);
      }
    }
  };

  const renderActions = {
    news: {
      onAdd: () => navigate(`/admin/newsadd`),
      onEdit: (item) => navigate(`/admin/newsedit/${item.id}`),
      onDelete: handleDelete,
      onView: (item) => navigate(`/admin/newsshow/${item.id}`),
    },
    subscriptions: {
      onDelete: handleDelete,
    },
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="bg-white rounded-lg shadow">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('news')}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'news'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                News
              </button>
              <button
                onClick={() => setActiveTab('subscriptions')}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'subscriptions'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Subscriptions
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            <DataTable
              title={activeTab === 'news' ? 'Manage News' : 'Manage Subscriptions'}
              data={data[activeTab]}
              columns={columns[activeTab]}
              {...renderActions[activeTab]}
              searchPlaceholder={`Search ${activeTab}...`}
            />
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        message={`Are you sure you want to delete this ${activeTab === 'news' ? 'news item' : 'subscription'}?`}
      />
    </div>
  );
};

export default News;