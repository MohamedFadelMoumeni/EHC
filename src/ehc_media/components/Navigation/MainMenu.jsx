import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './MainMenu.css';

const MainMenu = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: 'MEDIA_ENTREPRISE', label: 'Médias de l\'entreprise' },
    { id: 'MEDIA_PARTENAIRE', label: 'Médias des partenaires' }
  ];

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <nav className="main-menu">
      {categories.map(category => (
        <motion.button
          key={category.id}
          className={`menu-item ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.id)}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          {category.label}
        </motion.button>
      ))}
    </nav>
  );
};

MainMenu.propTypes = {
  activeCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired
};

export default MainMenu;