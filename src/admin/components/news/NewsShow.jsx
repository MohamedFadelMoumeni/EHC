import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar, MapPin, Tag, ArrowLeft, Layout, Activity, Loader2 } from 'lucide-react';

const NewsShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiEndpoint = `http://localhost:8081/api/news/${id}`;

  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#168187] mx-auto" />
          <p className="mt-2 text-gray-500">Loading news details...</p>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-red-50 border border-red-100 rounded-xl p-8">
            <h1 className="text-2xl font-semibold text-red-800 mb-2">News Not Found</h1>
            <p className="text-red-600 mb-6">The news article you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate('/admin/news')}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to News List
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-500 mb-1">
              <span className="text-[#168187] hover:text-[#147177] cursor-pointer">Dashboard</span>
              {' / '}
              <span className="text-[#168187] hover:text-[#147177] cursor-pointer">News</span>
              {' / '}
              <span>Details</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{news.title}</h1>
          </div>
          <button
            onClick={() => navigate('/admin/news')}
            className="inline-flex items-center text-[#168187] hover:text-[#147177]"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to News
          </button>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Meta Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#168187]/5 rounded-xl p-4">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-[#168187] mt-1" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p className="text-gray-900">{new Date(news.eventDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
              </div>
            </div>
            <div className="bg-[#168187]/5 rounded-xl p-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-[#168187] mt-1" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p className="text-gray-900">{news.location}</p>
                </div>
              </div>
            </div>
            <div className="bg-[#168187]/5 rounded-xl p-4">
              <div className="flex items-start">
                <Tag className="h-5 w-5 text-[#168187] mt-1" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Type</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    news.newsType === 'CURRENT' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {news.newsType}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Layout className="h-5 w-5 text-[#168187] mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Description</h2>
            </div>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{news.description}</p>
          </div>

          {/* Activities */}
          {news.activities && news.activities.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center mb-6">
                <Activity className="h-5 w-5 text-[#168187] mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Associated Activities</h2>
              </div>
              <div className="grid gap-4">
                {news.activities.map((activity, index) => (
                  <div 
                    key={activity.id}
                    className="relative bg-gray-50 rounded-xl p-5 border border-gray-200"
                  >
                    <div className="absolute -left-2 top-4 w-4 h-4 bg-[#168187] rounded-full">
                      <div className="absolute inset-0 bg-[#168187] rounded-full animate-ping opacity-25"></div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{activity.title}</h3>
                      <p className="text-gray-600">{activity.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsShow;