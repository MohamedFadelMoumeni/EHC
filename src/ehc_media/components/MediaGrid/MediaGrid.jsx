import PropTypes from 'prop-types';
import { useState } from 'react';
import MediaCard from '../MediaCard/MediaCard';
import Pagination from '../Pagination/Pagination';
import AnimatedGrid from '../AnimatedGrid/AnimatedGrid';
import FilterBar from '../Filters/FilterBar';
import './MediaGrid.css';

// Updated to work with API data structure
export const getUniqueAuthors = (items) => {
  return [...new Set(items.map(item => item.author))].sort();
};

export const getUniqueYears = (items) => {
  return [...new Set(items.map(item => 
    new Date(item.publishedDate).getFullYear()
  ))].sort((a, b) => b - a);
};

export const filterArticles = (items, filters) => {
  return items.filter(item => {
    const dateMatch = !filters.year || 
      new Date(item.publishedDate).getFullYear() === parseInt(filters.year);
    const authorMatch = !filters.author || 
      item.author === filters.author;
    const categoryMatch = !filters.category || 
      item.category === filters.category;
    
    return dateMatch && authorMatch && categoryMatch;
  });
};

const ITEMS_PER_PAGE = 12;
const MEDIA_CATEGORIES = ['SSSSSSSSSSSSSSS', 'aaaaaaa', 'ZZZZZZZZZ', '222222']; // Update with your actual categories

const MediaGrid = ({ items, type, onItemClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    year: '',
    author: '',
    category: ''
  });
  
  const years = getUniqueYears(items);
  const authors = type === 'articles' ? getUniqueAuthors(items) : [];

  const typeOfMedia = type;
  
  const filteredItems = filterArticles(items, filters);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      year: '',
      author: '',
      category: ''
    });
    setCurrentPage(1);
  };

  // Transform API data to match MediaCard expectations
  const transformedItems = visibleItems.map(item => {
    console.log("Processing item: "+JSON.stringify(item));
    
    return {
      id: item.id.toString(),
      title: item.title,
      imageUrl: typeOfMedia === 'articles' 
        ? `http://localhost:8081/api/uploads/articles/${item.imagePath}` 
        : typeOfMedia === 'videos' ? `http://localhost:8081/api/uploads/videos/images/${item.imagePath}` 
         : `http://localhost:8081/api/uploads/podcasts/images/${item.imagePath}` ,
      description: item.description,
      author: item.author,
      category: item.category,
      date: item.publishedDate,
      content: item.content,
      articleType: item.articleType,
      videoPath: item?.videoPath,
      videoUrl: item?.videoURL,
      podcastPath: item?.podcastPath,
      podcastURl: item?.podcastURl
    };
  });


  return (
    <div className="media-grid-container">
      <FilterBar
        type={type}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        authors={authors}
        categories={MEDIA_CATEGORIES}
        years={years}
      />

<AnimatedGrid>
  {transformedItems.map((item) => {
    console.log("test: " + JSON.stringify(item));
    return (
      <MediaCard
        key={item.id}
        {...item}
        type={type}
        onClick={() => onItemClick(item, type)}
        category={item?.category}
        videoPath={item?.videoPath}
        videoUrl={item?.videoUrl}
        podcastPath={item?.podcastPath}
        podcastURl={item?.podcastURl}
        description={item?.description}
      />
    );
  })}
</AnimatedGrid>

      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

MediaGrid.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      content: PropTypes.string,
      author: PropTypes.string,
      publishedDate: PropTypes.string.isRequired,
      category: PropTypes.string,
      articleType: PropTypes.string,
      imagePath: PropTypes.string,
      videoPath: PropTypes.string,
      podcastPath: PropTypes.string,
      podcastURl: PropTypes.string
    })
  ).isRequired,
  type: PropTypes.string.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default MediaGrid;