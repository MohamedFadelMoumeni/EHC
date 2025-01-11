import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from '../components/DataTable';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../layouts/ConfirmationModal';

const Payment = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('services');
  const [data, setData] = useState({ services: [], promos: [] });
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Columns configuration
  const columns = {
    services: [
      { key: 'name', label: 'Nom' },
      { 
        key: 'price', 
        label: 'Prix',
        render: (value) => `${value.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}`
      },
      { key: 'businessUnit', label: 'Unité' },
      { key: 'description', label: 'Description' }
    ],
    promos: [
      { key: 'promoCode', label: 'Code Promo' },
      { 
        key: 'reductionValue', 
        label: 'Réduction (%)',
        render: (value) => `${value}%`
      },
      { key: 'description', label: 'Description' }
    ]
  };

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, promosRes] = await Promise.all([
          axios.get('http://localhost:8081/api/business-services'),
          axios.get('http://localhost:8081/api/promos')
        ]);
        setData({
          services: servicesRes.data,
          promos: promosRes.data
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle delete operation
  const handleDelete = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedItem) {
      try {
        const endpoint = activeTab === 'services' ? 'business-services' : 'promos';
        await axios.delete(`http://localhost:8081/api/${endpoint}/${selectedItem.id}`);
        setData((prev) => ({
          ...prev,
          [activeTab]: prev[activeTab].filter((item) => item.id !== selectedItem.id),
        }));
        setSelectedItem(null);
        setModalOpen(false);
      } catch (error) {
        console.error('Error deleting item:', error);
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
              <button
                onClick={() => setActiveTab('promos')}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'promos'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Promotions
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            <DataTable
              title={activeTab === 'services' ? "Gestion des Services" : "Gestion des Promotions"}
              data={data[activeTab]}
              columns={columns[activeTab]}
              onAdd={() => navigate(`/admin/payment/${activeTab}add`)}
              onEdit={(item) => navigate(`/admin/payment/${activeTab}edit/${item.id}`)}
              onDelete={handleDelete}
              onView={(item) => navigate(`/admin/payment/${activeTab}show/${item.id}`)}
              searchPlaceholder={`Rechercher ${activeTab === 'services' ? 'un service' : 'une promotion'}...`}
            />
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        message={`Êtes-vous sûr de vouloir supprimer ${
          activeTab === 'services' 
            ? `le service "${selectedItem?.name}"` 
            : `la promotion "${selectedItem?.promoCode}"`
        } ?`}
      />
    </div>
  );
};

export default Payment;