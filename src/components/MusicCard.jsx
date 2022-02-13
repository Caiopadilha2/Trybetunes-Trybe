import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, onChange, isChecked } = this.props;
    return (
      <>
        <p>
          {' '}
          {trackName}
          {' '}
        </p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="input-favorites">
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="input-favorites"
            onChange={ onChange }
            checked={ isChecked }
          />
          Favorita
        </label>
      </>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default MusicCard;
