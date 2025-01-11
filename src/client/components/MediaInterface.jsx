import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Play, Pause, ChevronRight, ChevronDown, Loader2 } from 'lucide-react';
import DOMPurify from "dompurify";
import { div } from 'framer-motion/client';

const MediaCard = ({ item, onClick }) => (
  <div 
    onClick={onClick}
    className="group  w-[30%] bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
  >
    <article className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <img 
        src={item.imagePath ? `http://localhost:8081/api/uploads/articles/${item.imagePath}` : "/api/placeholder/300/200"} 
        alt={item.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{item.author}</span>
          <time>{item.publishedDate}</time>
        </div>
      </div>
    </article>
  </div>

);

const VideoCard = ({ video, onClick }) => (
  <div
    onClick={onClick}
    className="group bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
  >
    <div className="relative overflow-hidden">
      <img 
        src={video.thumbnail || "/api/placeholder/300/200"}
        alt=""
        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-teal-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="absolute bottom-2 right-2 bg-teal-600 text-white px-2 py-1 rounded">
        {video.duration}
      </span>
    </div>
    <div className="p-4">
      <h3 className="text-xl font-semibold text-teal-600">{video.title}</h3>
      {video.description && (
        <p className="text-slate-600 mt-2 line-clamp-2">{video.description}</p>
      )}
      <button className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors duration-300">
        Watch
      </button>
    </div>
  </div>
);

const PodcastCard = ({ podcast, isPlaying, onPlay }) => (
  <div className="group bg-white rounded-lg shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition-shadow duration-300">
    <div className="relative overflow-hidden rounded-md">
      <img 
        src={podcast.image || "/api/placeholder/200/200"}
        alt=""
        className="w-24 h-24 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-teal-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    <div className="flex-grow">
      <h3 className="text-xl font-semibold text-teal-600 cursor-pointer hover:underline">
        {podcast.title}
      </h3>
      {podcast.description && (
        <p className="text-slate-600 mt-1 line-clamp-2">{podcast.description}</p>
      )}
      <div className="text-slate-600 mt-1">{podcast.duration}</div>
      <button
        onClick={onPlay} 
        className="mt-2 flex items-center text-teal-600 transition-colors hover:text-teal-700"
      >
        {isPlaying ? (
          <>
            <Pause className="w-4 h-4 mr-1" /> Pause
          </>
        ) : (
          <>
            <Play className="w-4 h-4 mr-1" /> Listen
          </>
        )}
      </button>
    </div>
  </div>
);

const ItemDetails = ({ item, onBack }) => {
  const sanitizedContent = item.content ? DOMPurify.sanitize(item.content) : "";

  return (
    <div className="p-10 bg-white rounded-lg shadow-lg">
      <article>
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
              <p className="text-gray-600 text-lg font-light mt-2">
                {item.category}
              </p>
            )}
          </div>
        </header>
        <section>
          {item.imagePath && (
            <img
              src={`http://localhost:8081/api/uploads/articles/${item.imagePath}`}
              alt={item.title}
              className="w-full max-w-[400px] h-auto rounded-lg shadow-md mb-6 mx-auto"
            />
          )}
          {item.content && (
            <div
              className="text-gray-800 text-lg mb-6"
              style={{ wordWrap: "break-word" }}
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          )}
          <footer className="mt-6 text-gray-500">
            {item.author && (
              <p>
                <strong>Author:</strong> {item.author}
              </p>
            )}
          </footer>
        </section>
      </article>
      <button
        onClick={onBack}
        className="mt-6 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
      >
        Back
      </button>
    </div>
  );
};


const MediaSection = ({ title, data, renderItem, hasMore, onToggle, isLoading }) => (
  <div className="space-y-8">
    {isLoading ? (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    ) : (
      <>
        {data.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No content found
          </div>
        ) : (
          <>
            <div className='flex justify-around gap-2 flex-wrap'>
              {data.map((item) => renderItem(item))}
            </div>
            {hasMore && (
              <div className="text-center">
                <button
                  onClick={onToggle}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-teal-600 hover:bg-slate-100 transition-colors duration-300"
                >
                  {hasMore ? 'Show More' : 'Show Less'}
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      hasMore ? '' : 'rotate-180'
                    }`}
                  />
                </button>
              </div>
            )}
          </>
        )}
      </>
    )}
  </div>
);

const MediaInterface = () => {
  const [activeSource, setActiveSource] = useState('company');
  const [activeTab, setActiveTab] = useState('articles');
  const [selectedItem, setSelectedItem] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState({
    articles: false,
    videos: false,
    podcasts: false,
  });
  const [isPlaying, setIsPlaying] = useState({});

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:8081/api/articles');
        const allArticles = response.data;
        
        // Filter articles based on activeSource
        const filteredArticles = allArticles.filter(article => 
          activeSource === 'company' 
            ? article.articleType === 'OUR_ARTICLE'
            : article.articleType === 'PARTNER_ARTICLE'
        );
        
        setArticles(filteredArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Failed to load articles');
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 'articles') {
      fetchArticles();
    }
  }, [activeTab, activeSource]);

  if (error) {
    return (
      <div className="min-h-screen p-6 bg-slate-50 flex items-center justify-center">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  const displayedArticles = showAll.articles ? articles : articles.slice(0, 6);

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-teal-600 mb-4">
            Welcome to Our Media Platform
          </h1>
          <p className="text-gray-600">
            Discover resources from us and our partners
          </p>
        </header>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setActiveSource('company')}
            className={`px-8 py-3 rounded-lg font-semibold transition-colors duration-300 border-2 border-teal-600 ${
              activeSource === 'company'
                ? 'bg-teal-600 text-white'
                : 'bg-transparent text-teal-600 hover:bg-teal-50'
            }`}
          >
            Our Content
          </button>
          <button
            onClick={() => setActiveSource('partner')}
            className={`px-8 py-3 rounded-lg font-semibold transition-colors duration-300 border-2 border-teal-600 ${
              activeSource === 'partner'
                ? 'bg-teal-600 text-white'
                : 'bg-transparent text-teal-600 hover:bg-teal-50'
            }`}
          >
            Partner Content
          </button>
        </div>

        {selectedItem ? (
          <ItemDetails
            item={selectedItem}
            onBack={() => setSelectedItem(null)}
          />
        ) : (
          <div className="space-y-6">
            <div className="flex justify-center gap-1 p-1 mb-6 bg-slate-200 rounded-lg">
              {['articles', 'videos', 'podcasts'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-md transition-colors ${
                    activeTab === tab
                      ? 'bg-teal-600 text-white'
                      : 'text-teal-600 hover:bg-slate-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {activeTab === 'articles' && (
              <MediaSection
                title="Articles"
                data={displayedArticles}
                renderItem={(article) => (
                  <MediaCard
                    key={article.id}
                    item={article}
                    onClick={() => setSelectedItem(article)}
                  />
                )}
                hasMore={!showAll.articles && articles.length > 6}
                onToggle={() =>
                  setShowAll((prev) => ({
                    ...prev,
                    articles: !prev.articles,
                  }))
                }
                isLoading={loading}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaInterface;