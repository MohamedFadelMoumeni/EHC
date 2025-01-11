import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Plus, Minus, ArrowLeft, Save, Calendar, MapPin, Edit2, Trash2 } from 'lucide-react';

const NewsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    eventDate: '',
    location: '',
    description: '',
    newsType: ''
  });

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/news/${id}`);
        const news = response.data;

        setFormData({
          title: news.title || '',
          eventDate: news.eventDate || '',
          location: news.location || '',
          description: news.description || '',
          newsType: news.newsType || '',
        });

        setActivities(news.activities || []);
      } catch (error) {
        toast.error('Failed to fetch news details');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.get(`http://localhost:8081/api/news`);
      const allNews = response.data;
      const lastId = allNews.length > 0 ? Math.max(...allNews.map(news => news.id)) : 0;
      const newNewsId = lastId + 1;

      await axios.delete(`http://localhost:8081/api/news/${id}`);

      const { id: _, ...newFormData } = formData;
      const newNews = {
        ...newFormData,
        activities: activities.map(({ id, ...activity }) => ({
          ...activity,
          newsId: newNewsId,
        })),
      };

      await axios.post(`http://localhost:8081/api/news/up`, newNews);
      toast.success('News updated successfully');
      navigate('/admin/news');
    } catch (error) {
      toast.error('Failed to update news');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addActivity = () => {
    setActivities([
      ...activities,
      { id: Date.now(), title: '', details: '', newsId: id }
    ]);
  };

  const handleActivityChange = (id, field, value) => {
    setActivities(activities.map(activity =>
      activity.id === id ? { ...activity, [field]: value } : activity
    ));
  };

  const removeActivity = (id) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              Edit News
              <Edit2 className="h-6 w-6 text-[#168187]" />
            </h1>
            <p className="mt-1 text-sm text-gray-500">Update your news article details</p>
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
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full text-3xl font-semibold border-0 border-b-2 border-gray-200 focus:border-[#168187] focus:ring-0 p-0 pb-2"
                  placeholder="News title"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-[#168187]" />
                    Event Date
                  </div>
                  <input
                    type="date"
                    value={formData.eventDate.split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
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
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#168187]/20 focus:border-[#168187]"
                    placeholder="Event location"
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
                  placeholder="News content"
                  required
                />
              </div>

              <div className="max-w-xs">
                <label className="block text-sm text-gray-600 mb-2">News Type</label>
                <select
                  value={formData.newsType}
                  onChange={(e) => setFormData({ ...formData, newsType: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#168187]/20 focus:border-[#168187]"
                  required
                >
                  <option value="" disabled>Select type</option>
                  <option value="CURRENT">Current News</option>
                  <option value="UPCOMING">Upcoming Event</option>
                </select>
              </div>
            </div>

            {/* Activities Section */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Associated Activities</h3>
                  <p className="mt-1 text-sm text-gray-500">Manage activities related to this news</p>
                </div>
                <button
                  type="button"
                  onClick={addActivity}
                  className="inline-flex items-center px-4 py-2 bg-[#168187]/10 text-[#168187] rounded-lg hover:bg-[#168187]/20 transition-colors duration-200"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Activity
                </button>
              </div>

              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div 
                    key={activity.id} 
                    className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-[#168187]/30 transition-colors duration-200"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-[#168187]">Activity {index + 1}</span>
                        <button
                          type="button"
                          onClick={() => removeActivity(activity.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={activity.title}
                        onChange={(e) => handleActivityChange(activity.id, 'title', e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#168187]/20 focus:border-[#168187]"
                        placeholder="Activity title"
                      />
                      <textarea
                        value={activity.details}
                        onChange={(e) => handleActivityChange(activity.id, 'details', e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#168187]/20 focus:border-[#168187]"
                        placeholder="Activity details"
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
                {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsEdit;