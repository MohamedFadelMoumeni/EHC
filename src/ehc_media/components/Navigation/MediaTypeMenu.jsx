import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './MediaTypeMenu.css';

const MediaTypeMenu = ({ activeType, onTypeChange }) => {
  const mediaTypes = [
    { id: 'articles', label: 'Articles' },
    { id: 'videos', label: 'Vidéos' },
    { id: 'podcasts', label: 'Podcasts' }
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
    <nav className="media-type-menu">
      {mediaTypes.map(type => (
        <motion.button
          key={type.id}
          className={`menu-item ${activeType === type.id ? 'active' : ''}`}
          onClick={() => onTypeChange(type.id)}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          {type.label}
        </motion.button>
      ))}
    </nav>
  );
};

MediaTypeMenu.propTypes = {
  activeType: PropTypes.string.isRequired,
  onTypeChange: PropTypes.func.isRequired
};

export default MediaTypeMenu;