import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Mic, Link, Tag, FileText, X, Upload, Settings } from 'lucide-react';

const PodcastEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    podcastURL: '',
    podcastType: 'OUR_PODCAST'
  });
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [currentFiles, setCurrentFiles] = useState({
    audioUrl: '',
    imageUrl: ''
  });

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/podcasts/${id}`);
        const podcastData = response.data;
        setFormData({
          title: podcastData.title,
          description: podcastData.description,
          category: podcastData.category,
          podcastURL: podcastData.podcastURL || '',
          podcastType: podcastData.podcastType || 'OUR_PODCAST'
        });
        setCurrentFiles({
          audioUrl: podcastData.audioUrl || '',
          imageUrl: podcastData.imageUrl || ''
        });
      } catch (error) {
        toast.error('Failed to fetch podcast details');
        console.error(error);
      }
    };
    fetchPodcast();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = new FormData();
      
      // Create a Blob from the form data
      const podcastDataBlob = new Blob([JSON.stringify({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        podcastURL: formData.podcastURL,
        podcastType: formData.podcastType
      })], { type: 'application/json' });
      
      // Add the Blob as form data
      submitData.append('podcast', podcastDataBlob);
      
      // Add files if they exist
      if (audioFile) {
        submitData.append('audioFile', audioFile);
      }
      if (imageFile) {
        submitData.append('imageFile', imageFile);
      }

      await axios.put(`http://localhost:8081/api/podcasts/${id}`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      toast.success('Podcast updated successfully');
      navigate('/admin/media');
    } catch (error) {
      toast.error('Failed to update podcast');
      console.error(error);
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === 'audio') {
      setAudioFile(file);
    } else if (type === 'image') {
      setImageFile(file);
    }
  };

  const formFields = [
    { id: 'title', icon: <Mic className="w-4 h-4 text-[#168187]" />, type: 'text', placeholder: 'Enter podcast title' },
    { id: 'description', icon: <FileText className="w-4 h-4 text-[#168187]" />, type: 'textarea', placeholder: 'Enter podcast description' },
    { id: 'category', icon: <Tag className="w-4 h-4 text-[#168187]" />, type: 'text', placeholder: 'Enter podcast category' },
    { 
      id: 'podcastType', 
      icon: <Settings className="w-4 h-4 text-[#168187]" />, 
      type: 'select', 
      options: [
        { value: 'OUR_PODCAST', label: 'Our Podcast' },
        { value: 'PARTNER_PODCAST', label: 'Partner Podcast' }
      ]
    },
    { id: 'podcastURL', icon: <Link className="w-4 h-4 text-[#168187]" />, type: 'url', placeholder: 'Enter podcast URL (optional if uploading file)' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-[#168187] rounded-t-lg p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Mic className="w-8 h-8" />
            Edit Podcast
          </h1>
          <p className="text-slate-100 mt-2">Update your podcast details</p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-b-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {formFields.map((field) => (
              <div key={field.id}>
                <label 
                  htmlFor={field.id} 
                  className="block text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2"
                >
                  {field.icon}
                  {field.id.charAt(0).toUpperCase() + field.id.slice(1)}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.id}
                    value={formData[field.id]}
                    onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187] focus:border-transparent min-h-[100px]"
                    required
                  />
                ) : field.type === 'select' ? (
                  <select
                    id={field.id}
                    value={formData[field.id]}
                    onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187] focus:border-transparent"
                    required
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={field.id}
                    type={field.type}
                    value={formData[field.id]}
                    onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187] focus:border-transparent"
                    required={field.id !== 'podcastURL'}
                  />
                )}
              </div>
            ))}

            {/* Current Files Display */}
            {(currentFiles.audioUrl || currentFiles.imageUrl) && (
              <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
                <h3 className="font-semibold text-gray-700">Current Files</h3>
                {currentFiles.audioUrl && (
                  <div className="flex items-center gap-2">
                    <Mic className="w-4 h-4 text-[#168187]" />
                    <span className="text-sm">Current Audio: {currentFiles.audioUrl}</span>
                  </div>
                )}
                {currentFiles.imageUrl && (
                  <div className="flex items-center gap-2">
                    <img 
                      src={currentFiles.imageUrl} 
                      alt="Current cover" 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <span className="text-sm">Current Cover Image</span>
                  </div>
                )}
              </div>
            )}

            {/* File Upload Sections */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <Upload className="w-4 h-4 text-[#168187]" />
                  New Audio File (optional)
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, 'audio')}
                  accept="audio/*"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <Upload className="w-4 h-4 text-[#168187]" />
                  New Cover Image (optional)
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, 'image')}
                  accept="image/*"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187] focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={() => navigate('/admin/media')}
                className="px-6 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-md bg-[#168187] text-white hover:bg-[#136e73] flex items-center gap-2"
              >
                <Mic className="w-4 h-4" />
                Update Podcast
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PodcastEdit;