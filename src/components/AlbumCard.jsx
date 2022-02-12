import React from 'react';
import { Link } from 'react-router-dom';
import PropType from 'prop-types';

class AlbumCard extends React.Component {
  render() {
    const { collectionId, artistName, collectionName, artworkUrl100 } = this.props;
    return (
      <li>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img src={ artworkUrl100 } alt={ collectionId } />
          <p>
            { collectionName }
          </p>
          <p>
            { artistName }
          </p>
        </Link>
      </li>
    );
  }
}

AlbumCard.propTypes = {
  collectionId: PropType.number.isRequired,
  collectionName: PropType.string.isRequired,
  artistName: PropType.string.isRequired,
  artworkUrl100: PropType.string.isRequired,
};

export default AlbumCard;
