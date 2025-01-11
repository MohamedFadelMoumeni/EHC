import React from 'react';
import { ChevronRight } from 'lucide-react';

const MediaCard = ({ item, onClick }) => (
  <div 
    onClick={onClick}
    className="group w-full bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
  >
    <div className="relative overflow-hidden">
      <img 
        src={item.imagePath ? `http://localhost:8081/api/uploads/articles/${item.imagePath}` : "/api/placeholder/300/200"}
        alt={item.title}
        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-teal-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    <div className="p-4">
      <h3 className="text-xl font-semibold text-teal-600">{item.title}</h3>
      {item.description && (
        <p className="text-slate-600 mt-2 line-clamp-2">{item.description}</p>
      )}
      <div className="mt-4 flex justify-between items-center">
        <button className="font-medium flex items-center text-teal-600 transition-transform duration-300 group-hover:translate-x-1">
          View Details
          <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </button>
        {item.category && (
          <span className="text-sm text-slate-500">
            {item.category}
          </span>
        )}
      </div>
    </div>
  </div>
);

export default MediaCard;
