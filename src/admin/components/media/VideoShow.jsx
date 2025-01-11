import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Video, ArrowLeft, Loader2, FileText, Tag, Link, Settings, Calendar, Image } from 'lucide-react';

const VideoShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/videos/${id}`);
        setVideo(response.data);
      } catch (error) {
        console.error('Error fetching video details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-2 text-[#168187]">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-lg">Loading video details...</span>
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600 text-lg">Video not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-[#168187] rounded-t-lg p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Video className="w-8 h-8" />
            {video.title}
          </h1>
          <p className="text-slate-100 mt-2">Video Details</p>
        </div>

        {/* Video and Thumbnail Section */}
        <div className="bg-white shadow-lg">
          {/* Only show video if it's an uploaded file */}
          {video.videoPath && (
            <div className="aspect-video w-full bg-black">
              <video
                src={`http://localhost:8081/api/uploads/videos/${video.videoPath}`}
                controls
                className="w-full h-full"
              />
            </div>
          )}

          {/* Show Thumbnail if exists */}
          {video.imagePath && (
            <div className={`p-6 ${video.videoPath ? 'border-t border-slate-100' : ''}`}>
              <div className="flex items-start gap-3">
                <Image className="w-5 h-5 text-[#168187] mt-1" />
                <div>
                  <h2 className="text-sm font-semibold text-slate-600 mb-2">Thumbnail</h2>
                  <img 
                    src={`http://localhost:8081/api/uploads/videos/images/${video.imagePath}`}
                    alt="Video thumbnail"
                    className="max-w-xs rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-b-lg shadow-lg divide-y divide-slate-100">
          {/* Description Section */}
          <div className="p-6">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-[#168187] mt-1" />
              <div>
                <h2 className="text-sm font-semibold text-slate-600 mb-2">Description</h2>
                <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">{video.description}</p>
              </div>
            </div>
          </div>

          {/* Video Type Section */}
          <div className="p-6">
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-[#168187]" />
              <div>
                <h2 className="text-sm font-semibold text-slate-600 mb-1">Video Type</h2>
                <p className="text-slate-800">
                  {video.videoType === 'OUR_VIDEO' ? 'Our Video' : 'Partner Video'}
                </p>
              </div>
            </div>
          </div>

          {/* Category Section */}
          <div className="p-6">
            <div className="flex items-center gap-3">
              <Tag className="w-5 h-5 text-[#168187]" />
              <div>
                <h2 className="text-sm font-semibold text-slate-600 mb-1">Category</h2>
                <p className="text-slate-800">{video.category}</p>
              </div>
            </div>
          </div>

          {/* URL Section - Only show if URL exists */}
          {video.videoURL && (
            <div className="p-6">
              <div className="flex items-center gap-3">
                <Link className="w-5 h-5 text-[#168187]" />
                <div>
                  <h2 className="text-sm font-semibold text-slate-600 mb-1">Video URL</h2>
                  <a 
                    href={video.videoURL} 
                    className="text-[#168187] hover:underline break-all"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {video.videoURL}
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="p-6 flex justify-between">
            <button
              onClick={() => navigate('/admin/media')}
              className="flex items-center gap-2 px-6 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Videos
            </button>
            <button
              onClick={() => navigate(`/admin/media/${id}/edit`)}
              className="flex items-center gap-2 px-6 py-2 bg-[#168187] text-white rounded-lg hover:bg-[#136e73] transition-colors duration-200"
            >
              <FileText className="w-4 h-4" />
              Edit Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoShow;