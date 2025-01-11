import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import MediaCard from './MediaCard';
import ItemDetails from './ItemDetails';
import MediaSection from './MediaSection';
import VideoPlayer from './VideoPlayer';
import PodcastPlayer from './PodcastPlayer';
import { video } from 'framer-motion/client';

const MediaInterface = () => {
  const [activeSource, setActiveSource] = useState('company');
  const [activeTab, setActiveTab] = useState('articles');
  const [selectedItem, setSelectedItem] = useState(null);
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState({
    articles: false,
    videos: false,
    podcasts: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [articlesResponse, videosResponse, podcastsResponse] = await Promise.all([
          axios.get('http://localhost:8081/api/articles'),
          axios.get('http://localhost:8081/api/videos'),
          axios.get('http://localhost:8081/api/podcasts')
        ]);

        console.log(articlesResponse.data);
        console.log(videosResponse.data)
        console.log(podcastsResponse.data)


        const filterBySource = (items) => items.filter(item => 
          activeSource === 'company' 
            ? item.type === 'OUR_CONTENT'
            : item.type === 'PARTNER_CONTENT'
        );

        setArticles(filterBySource(articlesResponse.data));
        setVideos(filterBySource(videosResponse.data));
        setPodcasts(filterBySource(podcastsResponse.data));

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeSource]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-6 bg-slate-50 flex items-center justify-center">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  const getDisplayedItems = (items, type) => showAll[type] ? items : items.slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-teal-600 mb-4">
          Bienvenue sur notre plateforme média
          </h1>
          <p className="text-xl text-gray-600">
          Découvrez notres ressources  de nos partenaires
          </p>
        </header>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveSource('company')}
            className={`px-8 py-3 rounded-lg font-semibold transition-colors duration-300 border-2 border-teal-600 ${
              activeSource === 'company'
                ? 'bg-teal-600 text-white'
                : 'bg-transparent text-teal-600 hover:bg-teal-50'
            }`}
          >
            Notre Univers
          </button>
          <button
            onClick={() => setActiveSource('partner')}
            className={`px-8 py-3 rounded-lg font-semibold transition-colors duration-300 border-2 border-teal-600 ${
              activeSource === 'partner'
                ? 'bg-teal-600 text-white'
                : 'bg-transparent text-teal-600 hover:bg-teal-50'
            }`}
          >
            Univers Partagé
          </button>
        </div>

        {selectedItem ? (
          <ItemDetails
            item={selectedItem}
            onBack={() => setSelectedItem(null)}
          />
        ) : (
          <div className="space-y-8">
            <div className="flex justify-center gap-1 p-1 mb-8 bg-slate-200 rounded-lg">
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
                data={getDisplayedItems(articles, 'articles')}
                renderItem={(article) => (
                  <div className="w-full h-full">
                    <MediaCard
                      key={article.id}
                      item={article}
                      onClick={() => setSelectedItem(article)}
                    />
                  </div>
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

            {activeTab === 'videos' && (
              <MediaSection
                title="Videos"
                data={getDisplayedItems(videos, 'videos')}
                renderItem={(video) => (
                  <div className="w-full h-full">
                    <VideoPlayer
                      key={video.id}
                      video={video}
                      onClick={() => setSelectedItem(video)}
                    />
                  </div>
                )}
                hasMore={!showAll.videos && videos.length > 6}
                onToggle={() =>
                  setShowAll((prev) => ({
                    ...prev,
                    videos: !prev.videos,
                  }))
                }
                isLoading={loading}
              />
            )}

            {activeTab === 'podcasts' && (
              <MediaSection
                title="Podcasts"
                data={getDisplayedItems(podcasts, 'podcasts')}
                renderItem={(podcast) => (
                  <div className="w-full h-full">
                    <PodcastPlayer
                      key={podcast.id}
                      podcast={podcast}
                      onClick={() => setSelectedItem(podcast)}
                    />
                  </div>
                )}
                hasMore={!showAll.podcasts && podcasts.length > 6}
                onToggle={() =>
                  setShowAll((prev) => ({
                    ...prev,
                    podcasts: !prev.podcasts,
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