import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mic, ArrowLeft, Loader2, FileText, Tag, Link } from 'lucide-react';

const PodcastShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState(null);

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/podcasts/${id}`);
        setPodcast(response.data);
      } catch (error) {
        console.error('Error fetching podcast details:', error);
      }
    };
    fetchPodcast();
  }, [id]);

  if (!podcast) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-2 text-[#168187]">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-lg">Loading podcast details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-[#168187] rounded-t-lg p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Mic className="w-8 h-8" />
            {podcast.title}
          </h1>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-b-lg shadow-lg divide-y divide-slate-100">
          {/* Description Section */}
          <div className="p-6">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-[#168187] mt-1" />
              <div>
                <h2 className="text-sm font-semibold text-slate-600 mb-2">Description</h2>
                <p className="text-slate-800 leading-relaxed">{podcast.description}</p>
              </div>
            </div>
          </div>

          {/* Category Section */}
          <div className="p-6">
            <div className="flex items-center gap-3">
              <Tag className="w-5 h-5 text-[#168187]" />
              <div>
                <h2 className="text-sm font-semibold text-slate-600 mb-1">Category</h2>
                <p className="text-slate-800">{podcast.category}</p>
              </div>
            </div>
          </div>

          {/* URL Section */}
          <div className="p-6">
            <div className="flex items-center gap-3">
              <Link className="w-5 h-5 text-[#168187]" />
              <div>
                <h2 className="text-sm font-semibold text-slate-600 mb-1">Listen</h2>
                <a 
                  href={podcast.podcastURl} 
                  className="text-[#168187] hover:underline break-all"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {podcast.podcastURl}
                </a>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="p-6">
            <button
              onClick={() => navigate('/admin/media')}
              className="flex items-center gap-2 px-6 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Podcasts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastShow;