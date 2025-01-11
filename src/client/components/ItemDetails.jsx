import React from 'react';
import VideoPlayer from './VideoPlayer';
import PodcastPlayer from './PodcastPlayer';

const ItemDetails = ({ item, onBack }) => {
  const renderMediaContent = () => {
    switch (item.mediaType) {
      case 'video':
        return <VideoPlayer video={item} />;
      case 'podcast':
        return <PodcastPlayer podcast={item} />;
      default:
        return (
          <img 
            src={`http://localhost:8081/api/uploads/articles/${item.imagePath}`}
            alt={item.title}
            className="w-full h-auto rounded-lg shadow-md mb-6"
          />
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <article className="p-8">
        <header className="mb-6 pb-4 border-b-2 border-gray-200">
          <h1 className="text-4xl font-extrabold text-teal-600 mb-2">
            {item.title}
          </h1>
          <div className="flex justify-between items-center">
            {item.publishedDate && (
              <p className="text-gray-500 text-sm">
                {new Date(item.publishedDate).toLocaleString()}
              </p>
            )}
            {item.category && (
              <p className="text-gray-600 text-lg font-light">
                {item.category}
              </p>
            )}
          </div>
        </header>
        <section>
          {renderMediaContent()}
          {item.content && (
            <p className="text-gray-800 text-lg leading-relaxed mb-6">
              {item.content}
            </p>
          )}
          <footer className="mt-6 text-gray-500">
            {item.author && (
              <p>
                <strong>Author:</strong> {item.author}
              </p>
            )}
            {item.duration && (
              <p>
                <strong>Duration:</strong> {item.duration}
              </p>
            )}
          </footer>
        </section>
      </article>
      <div className="px-8 pb-8">
        <button
          onClick={onBack}
          className="w-full px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300"
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default ItemDetails;
