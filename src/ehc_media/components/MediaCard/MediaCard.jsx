import PropTypes from 'prop-types';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '../Modal/Modal';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import './MediaCard.css';

const MediaCard = ({ 
  title, 
  type, 
  imageUrl, 
  author, 
  date, 
  videoUrl, 
  audioUrl,
  description,
  onClick,
  category,
  videoPath,
  podcastURl,
  podcastPath
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (type === 'articles') {
      onClick();
    } else {
      setIsModalOpen(true);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const cardVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const overlayVariants = {
    hover: {
      opacity: 1,
      transition: {
        duration: 0.2
      }
    }
  };

  const renderModalContent = () => {
    if (type === 'videos') {
      console.log("==========>"+videoUrl);
      return (
        <div className="video-content">
          <h2>{title}</h2>
          <div className="meta-info">
            <span className="author">{description}</span>
          </div>
          <div className="video-container mt-3">
            {videoUrl && 
            <iframe
            width="700"
            height="315"
            src={videoUrl}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowfullscreen>
          </iframe>
            
            }
            {videoPath && <VideoPlayer url={`http://localhost:8081/api/uploads/videos/${videoPath}`} poster={`${imageUrl}`} />}
          </div>
        </div>
      );
    } else if (type === 'podcasts') {
      console.log("it is podcast==============================="+podcastPath);
      return (
        <div className="podcast-content">
          <h2>{title}</h2>
          <div className="meta-info">
            <span className="author">{description}</span>
          </div>
          <div className="podcast-player">
            {podcastPath && <AudioPlayer url={`http://localhost:8081/api/uploads/podcasts/${podcastPath}`} />}
            {podcastURl && <AudioPlayer url={`${podcastURl}`} />}
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <>
      <motion.div 
        className="media-card"
        variants={cardVariants}
        whileHover="hover"
        onClick={handleClick}
      >
        <div className="media-image">
          <motion.img 
            src={imageUrl} 
            alt={title}
            variants={imageVariants}
          />
          {type === 'videos' && (
    
            <motion.div 
              className="play-overlay"
              initial={{ opacity: 0 }}
              variants={overlayVariants}
            >
              <span className="play-icon">▶</span>
            </motion.div>
           
          )}
          {type === 'podcasts' && (
            <motion.div 
              className="audio-overlay"
              initial={{ opacity: 0 }}
              variants={overlayVariants}
            >
              <span className="audio-icon">🎧</span>
            </motion.div>
          )}
        </div>
        
        
        <div className="media-content">
          <h3>{title}</h3>
          {type === 'articles' && (
          <div className="meta-info">
            <span className="author">{author}</span>
            <span className="date">{formatDate(date)}</span>
          </div>) 
        }

        {(type === 'videos' || type === 'podcasts')  && (
          <div className="meta-info">
            <span className="author">{description}</span>
          </div>) 
        }
        </div>
      
      </motion.div>

      {(type === 'videos' || type === 'podcasts') && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          {renderModalContent()}
        </Modal>
      )}
    </>
  );
};

MediaCard.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  videoUrl: PropTypes.string,
  audioUrl: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  category: PropTypes.string,
  description: PropTypes.string,
  videoPath: PropTypes.string,
  podcastURl: PropTypes.string,
  podcastPath: PropTypes.string,
};

export default MediaCard;