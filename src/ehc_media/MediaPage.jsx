import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import MainMenu from './components/Navigation/MainMenu';
import MediaTypeMenu from './components/Navigation/MediaTypeMenu';
import MediaGrid from './components/MediaGrid/MediaGrid';
import ArticlePage from './components/ArticlePage/ArticlePage';
import PageTransition from './components/transitions/PageTransition';

function MediaPage() {
  const [activeCategory, setActiveCategory] = useState('MEDIA_ENTREPRISE');
  const [activeType, setActiveType] = useState('articles');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [videos, setVideos] = useState([]);
  const [podcasts, setPodcasts] = useState([]);

  const mediasMap = new Map();

// Add entries to the map
mediasMap.set("MEDIA_ENTREPRISE", ["OUR_ARTICLE", "OUR_VIDEO", "OUR_PODCAST"]);
mediasMap.set("MEDIA_PARTENAIRE", ["PARTNER_ARTICLE", "PARTNER_VIDEO","PARTNER_PODCAST"]);



  // Fetch articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/articles');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        // Ensure each article has an articleType field
        const articlesWithType = data.map(article => ({
          ...article,
          articleType: article.articleType || 'OUR_ARTICLE' // Default type if none exists
        }));
        setArticles(articlesWithType);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Fetch Videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/videos');
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        // Ensure each videos has an videosType field
        const videoWithType = data.map(video => ({
          ...video,
          videoType: video.videoType || 'OUR_VIDEO' // Default type if none exists
        }));
        setVideos(videoWithType);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

   // Fetch Videos
   useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/podcasts');
        if (!response.ok) {
          throw new Error('Failed to fetch podcasts');
        }
        const data = await response.json();
        // Ensure each podcast has an podcastType field
        const podcastType = data.map(podcast => ({
          ...podcast,
          podcastType: podcast.podcastType || 'OUR_PODCAST' // Default type if none exists
        }));
        setPodcasts(podcastType);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);


  // Filter articles based on active category using useMemo
  const filteredArticles = useMemo(() => {
    return articles.filter(article => mediasMap.get(activeCategory).includes(article.articleType));
  }, [articles, activeCategory]);

  // Filter Videos based on active category using useMemo
  const filteredVideos = useMemo(() => {
    return videos.filter(video => mediasMap.get(activeCategory).includes(video.videoType));
  }, [videos, activeCategory]);

   // Filter Podcasts based on active category using useMemo
   const filteredPodcasts = useMemo(() => {
    return podcasts.filter(podcast => mediasMap.get(activeCategory).includes(podcast.podcastType));
  }, [podcasts, activeCategory]);


  // Dynamic section content based on active category
  const currentSection = useMemo(() => {
    if (activeType === 'articles') {
      return {
        title: activeCategory === 'MEDIA_ENTREPRISE' 
          ? "Articles de l'entreprise" 
          : "Articles des partenaires",
        description: activeCategory === 'MEDIA_ENTREPRISE'
          ? "Derniers articles et mises à jour de l'entreprise"
          : "Articles et actualités de nos partenaires",
        content: {
          articles: filteredArticles,
        },
      };
    } else if (activeType === 'videos') {
      console.log("it is video");
      
      return {
        title: activeCategory === 'MEDIA_ENTREPRISE' 
          ? "Vidéos de l'entreprise" 
          : "Vidéos des partenaires",
        description: activeCategory === 'MEDIA_ENTREPRISE'
          ? "Derniers vidéos et mises à jour de l'entreprise"
          : "Vidéos et actualités de nos partenaires",
        content: {
          videos: filteredVideos,
        },
      };
      
    } else if (activeType === 'podcasts') {
      return {
        title: activeCategory === 'MEDIA_ENTREPRISE' 
          ? "Podcasts de l'entreprise" 
          : "Podcasts des partenaires",
        description: activeCategory === 'MEDIA_ENTREPRISE'
          ? "Derniers podcasts et mises à jour de l'entreprise"
          : "Podcasts et actualités de nos partenaires",
          content: {
            podcasts: filteredPodcasts,
          },
        };
      }
    return null; // Handle the case when neither condition is met
  }, [activeType, activeCategory, filteredArticles, filteredVideos]);
  

  // Event handlers
  const handleItemClick = (item, type) => {
    console.log("==>"+ activeType);
    if (type === 'articles') {
      setSelectedArticle(item);
    } else if (type === 'videos') {
      setSelectedVideo(item);
    } else if (type === 'podcasts') {
      setSelectedPodcast(item);
    }
  };


  const handleCategoryChange = (newCategory) => {

    console.log("=>"+newCategory)
    setActiveCategory(newCategory);
    setSelectedArticle(null); // Reset selected article when changing category
    setSelectedVideo(null); // Reset selected video when changing category
    setSelectedPodcast(null); // Reset selected video when changing category
  };

  // Loading state
  if (loading) {
    return (
      <div className="App">
        <MainMenu 
          activeCategory={activeCategory} 
          onCategoryChange={handleCategoryChange}
        />
        <MediaTypeMenu 
          activeType={activeType} 
          onTypeChange={setActiveType} 
        />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">Loading articles...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="App">
        <MainMenu 
          activeCategory={activeCategory} 
          onCategoryChange={handleCategoryChange}
        />
        <MediaTypeMenu 
          activeType={activeType} 
          onTypeChange={setActiveType} 
        />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  // Selected article view
  if (selectedArticle) {
    return (
      <AnimatePresence mode="wait">
        <ArticlePage 
          article={selectedArticle} 
          onBack={() => setSelectedArticle(null)} 
        />
      </AnimatePresence>
    );
  }

  // Selected Video view
  if (selectedVideo) {
    return (
      <AnimatePresence mode="wait">
        <ArticlePage 
          video={selectedVideo} 
          onBack={() => setSelectedVideo(null)} 
        />
      </AnimatePresence>
    );
  }

    // Selected Video view
  

  // Main view
  return (
    <div className="App">
      <MainMenu 
        activeCategory={activeCategory} 
        onCategoryChange={handleCategoryChange}
      />
      
      <MediaTypeMenu 
        activeType={activeType} 
        onTypeChange={setActiveType} 
      />
      
      <AnimatePresence mode="wait">
        <PageTransition key={`${activeCategory}-${activeType}`}>
          <div className="media-container">
            <div className="media-category">
              <h1>{currentSection.title}</h1>
              <p className="category-description">{currentSection.description}</p>
              
              <MediaGrid
                items={currentSection.content[activeType]}
                type={activeType}
                onItemClick={handleItemClick}
                mediaType={activeType}
              />
            </div>
          </div>
        </PageTransition>
      </AnimatePresence>
    </div>
  );
}

export default MediaPage;