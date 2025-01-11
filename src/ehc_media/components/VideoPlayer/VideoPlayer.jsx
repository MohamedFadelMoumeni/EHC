import PropTypes from 'prop-types';
import './VideoPlayer.css';

const VideoPlayer = ({ url, poster }) => {
  return (
    <div className="video-player">
      <video
        controls
        poster={poster}
        className="video-element"
      >
        <source src={url} type="video/mp4" />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>
    </div>
  );
};

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  poster: PropTypes.string
};

export default VideoPlayer;