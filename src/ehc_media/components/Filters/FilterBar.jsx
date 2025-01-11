import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import './FilterBar.css';

const FilterBar = ({ 
  type,
  filters,
  onFilterChange,
  onClearFilters,
  authors,
  categories,
  years 
}) => {
  const isArticle = type === 'articles';
  
  return (
    <motion.div 
      className="filter-bar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="filter-controls">
        {isArticle ? (
          <select 
            value={filters.author || ''} 
            onChange={(e) => onFilterChange('author', e.target.value)}
            className="filter-select"
          >
            <option value="">Tous les auteurs</option>
            {authors.map(author => (
              <option key={author} value={author}>{author}</option>
            ))}
          </select>
        ) : (
          <select 
            value={filters.category || ''} 
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="filter-select"
          >
            <option value="">Toutes les catégories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        )}

        <select 
          value={filters.year || ''} 
          onChange={(e) => onFilterChange('year', e.target.value)}
          className="filter-select"
        >
          <option value="">Toutes les années</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <AnimatePresence>
        {(filters.year || filters.author || filters.category) && (
          <motion.button
            className="clear-filters"
            onClick={onClearFilters}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Réinitialiser les filtres
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

FilterBar.propTypes = {
  type: PropTypes.string.isRequired,
  filters: PropTypes.shape({
    year: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.string
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string),
  categories: PropTypes.arrayOf(PropTypes.string),
  years: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default FilterBar;