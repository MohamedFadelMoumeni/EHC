import PropTypes from 'prop-types';

const MediaSection = ({ title, description, items, type }) => {
  const getButtonText = (mediaType) => {
    switch (mediaType) {
      case 'article': return 'Lire l\'article';
      case 'video': return 'Regarder la vidéo';
      case 'podcast': return 'Écouter le podcast';
      default: return 'Voir plus';
    }
  };

  return (
    <div className="media-section">
      <h2>{title}</h2>
      <p className="section-description">{description}</p>
      <div className="media-grid">
        {items.map((item, index) => (
          <div key={index} className="media-card">
            <h3>{item.title}</h3>
            <button className="media-button">
              {getButtonText(type)}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

MediaSection.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
  })).isRequired,
  type: PropTypes.oneOf(['article', 'video', 'podcast']).isRequired,
};

export default MediaSection;