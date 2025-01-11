import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Plus, Minus, ArrowLeft, Save, Calendar, MapPin } from 'lucide-react';

const NewsAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titre: '',
    date: '',
    lieu: '',
    description: '',
    type: ''
  });

  const [evenements, setEvenements] = useState([]);
  const [lastNewsId, setLastNewsId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchLastNewsId = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/news');
        const newsList = response.data;
        const maxId = newsList.length > 0 ? Math.max(...newsList.map(news => news.id)) : 0;
        setLastNewsId(maxId);
      } catch (error) {
        console.error('Error fetching the last news ID:', error);
      }
    };
    fetchLastNewsId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const payload = {
      title: formData.titre,
      eventDate: new Date(formData.date).toISOString(),
      location: formData.lieu,
      description: formData.description,
      newsType: formData.type.toUpperCase(),
      activities: evenements.map(evt => ({
        title: evt.titre,
        details: evt.description,
        newsId: lastNewsId + 1
      }))
    };

    try {
      await axios.post('http://localhost:8081/api/news', payload);
      toast.success('News added successfully');
      navigate('/admin/news');
    } catch (error) {
      console.error('Error adding news:', error);
      toast.error('Failed to add news');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ajouterEvenement = () => {
    setEvenements([...evenements, { id: Date.now(), titre: '', description: '' }]);
  };

  const handleEvenementChange = (id, field, value) => {
    setEvenements(evenements.map(evt => 
      evt.id === id ? { ...evt, [field]: value } : evt
    ));
  };

  const supprimerEvenement = (id) => {
    setEvenements(evenements.filter(evt => evt.id !== id));
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add News</h1>
            <p className="mt-1 text-sm text-gray-500">Create and publish your news</p>
          </div>
          <button
            onClick={() => navigate('/admin/news')}
            className="inline-flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to News
          </button>
        </div>

        {/* Main Form */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
            {/* Main Details Section */}
            <div className="p-8 space-y-8">
              <div>
                <input
                  type="text"
                  value={formData.titre}
                  onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                  className="w-full text-3xl font-semibold border-0 border-b-2 border-gray-200 focus:border-[#168187] focus:ring-0 p-0 pb-2"
                  placeholder="Enter news title..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-[#168187]" />
                    News Date
                  </div>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#168187]/20 focus:border-[#168187]"
                    required
                  />
                </div>
                <div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-2 text-[#168187]" />
                    Location
                  </div>
                  <input
                    type="text"
                    value={formData.lieu}
                    onChange={(e) => setFormData({ ...formData, lieu: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#168187]/20 focus:border-[#168187]"
                    placeholder="Enter event location"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#168187]/20 focus:border-[#168187]"
                  rows={4}
                  placeholder="Write your news content here..."
                  required
                />
              </div>

              <div className="max-w-xs">
                <label className="block text-sm text-gray-600 mb-2">News Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#168187]/20 focus:border-[#168187]"
                  required
                >
                  <option value="" disabled>Select type</option>
                  <option value="CURRENT">Current News</option>
                  <option value="UPCOMING">Upcoming News</option>
                </select>
              </div>
            </div>

            {/* Events Section */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Associated Events</h3>
                  <p className="mt-1 text-sm text-gray-500">Add related events to your news article</p>
                </div>
                <button
                  type="button"
                  onClick={ajouterEvenement}
                  className="inline-flex items-center px-4 py-2 bg-[#168187]/10 text-[#168187] rounded-lg hover:bg-[#168187]/20 transition-colors duration-200"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </button>
              </div>

              <div className="space-y-4">
                {evenements.map((evt, index) => (
                  <div 
                    key={evt.id} 
                    className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-[#168187]/30 transition-colors duration-200"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-[#168187]">Event {index + 1}</span>
                        <button
                          type="button"
                          onClick={() => supprimerEvenement(evt.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={evt.titre}
                        onChange={(e) => handleEvenementChange(evt.id, 'titre', e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#168187]/20 focus:border-[#168187]"
                        placeholder="Event title"
                      />
                      <textarea
                        value={evt.description}
                        onChange={(e) => handleEvenementChange(evt.id, 'description', e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#168187]/20 focus:border-[#168187]"
                        placeholder="Event description"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Actions */}
            <div className="px-8 py-4 bg-gray-50 flex justify-between items-center rounded-b-xl">
              <button
                type="button"
                onClick={() => navigate('/admin/news')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#168187]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-[#168187] hover:bg-[#147177] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#168187] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Publishing...' : 'Publish News'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsAdd;