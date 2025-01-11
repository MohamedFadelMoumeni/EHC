import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';

const PodcastPlayer = ({ podcast, onClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = (e) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  return (
    <div 
      onClick={onClick}
      className="group w-full bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative">
        <img 
          src={podcast.coverArtUrl || "/api/placeholder/300/200"}
          alt={podcast.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={togglePlay}
            className="p-2 bg-white rounded-full"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-teal-600" />
            ) : (
              <Play className="w-8 h-8 text-teal-600" />
            )}
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-teal-600">{podcast.title}</h3>
        {podcast.description && (
          <p className="text-slate-600 mt-2 line-clamp-2">{podcast.description}</p>
        )}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-slate-500">
            Episode: {podcast.episodeNumber}
          </span>
          <span className="text-sm text-slate-500">
            Duration: {podcast.duration}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PodcastPlayer;