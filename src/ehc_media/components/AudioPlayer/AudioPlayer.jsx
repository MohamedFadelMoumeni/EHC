import PropTypes from 'prop-types';
import './AudioPlayer.css';

const AudioPlayer = ({ url }) => {
  return (
    <div className="audio-player mt-3">
      <audio controls className="audio-element">
        <source src={url} type="audio/mpeg" />
        Votre navigateur ne supporte pas la lecture audio.
      </audio>
    </div>
  );
};

AudioPlayer.propTypes = {
  url: PropTypes.string.isRequired
};

export default AudioPlayer;