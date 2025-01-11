import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from '../components/DataTable'; // Adjust path as necessary
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../layouts/ConfirmationModal'; // Adjust path as necessary
//import 'react-quill/dist/quill.snow.css';

const Media = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('articles');

    const [data, setData] = useState({
        articles: [],
        videos: [],
        podcasts: []
    });

    const columns = {
        articles: [
            { key: 'id', label: 'ID' },
            { key: 'title', label: 'Title' },
            { key: 'author', label: 'Author' },
            { key: 'category', label: 'Category' },
            { key: 'publishedDate', label: 'Date', render: (value) => new Date(value).toLocaleDateString() }
        ],
        videos: [
            { key: 'id', label: 'ID' },
            { key: 'title', label: 'Title' },
            { key: 'description', label: 'Description' },
            { key: 'category', label: 'Category' },
            { key: 'videoURl', label: 'Link', render: (value) => <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Watch Video</a> }
        ],
        podcasts: [
            { key: 'id', label: 'ID' },
            { key: 'title', label: 'Title' },
            { key: 'description', label: 'Description' },
            { key: 'category', label: 'Category' },
            { key: 'podcastURl', label: 'Link', render: (value) => <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Listen Podcast</a> }
        ]
    };

    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (activeTab === 'articles') {
                    const response = await axios.get('http://localhost:8081/api/articles');
                    setData((prev) => ({ ...prev, articles: response.data }));
                } else if (activeTab === 'videos') {
                    const response = await axios.get('http://localhost:8081/api/videos');
                    setData((prev) => ({ ...prev, videos: response.data }));
                } else if (activeTab === 'podcasts') {
                    const response = await axios.get('http://localhost:8081/api/podcasts');
                    setData((prev) => ({ ...prev, podcasts: response.data }));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [activeTab]);

    const handleDelete = (item) => {
        setSelectedItem(item);
        setModalOpen(true);
    };

    const confirmDelete = async () => {
        if (selectedItem) {
            try {
                await axios.delete(`http://localhost:8081/api/${activeTab}/${selectedItem.id}`);
                setData((prev) => ({
                    ...prev,
                    [activeTab]: prev[activeTab].filter((item) => item.id !== selectedItem.id)
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
            <div className="max-w-7xl mx-auto py-6 px-2 sm:px-4 lg:px-6">
                <div className="bg-white rounded-lg shadow">
                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex">
                            {['articles', 'videos', 'podcasts'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-4 px-8 text-center border-b-2 font-medium text-sm ${
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

                    <div className="p-6">
                        <DataTable
                            title={`Manage ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
                            data={data[activeTab]}
                            columns={columns[activeTab]}
                            onAdd={() => navigate(`/admin/media/${activeTab}add`)}
                            onEdit={(item) => navigate(`/admin/media/${activeTab}edit/${item.id}`)}
                            onDelete={handleDelete}
                            onView={(item) => navigate(`/admin/media/${activeTab}show/${item.id}`)}
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

export default Media;
