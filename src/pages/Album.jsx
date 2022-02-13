import React from 'react';
import PropType from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      albumName: '',
      trackList: [],
      favoriteList: [],
      isLoading: false,
    };
  }

  async componentDidMount() {
    // console.log(this) O ID quando clica no album está em props.match.params.id
    const { match: { params: { id } } } = this.props;
    const albumInformation = await getMusics(id);
    // console.log(musicas);
    const { artistName, collectionName } = albumInformation[0];
    const musics = albumInformation.slice(1);
    const favorites = await getFavoriteSongs();
    this.setState({
      artistName,
      albumName: collectionName,
      trackList: musics,
      favoriteList: favorites,
    });
  }

  handleCheckboxFavorite = async ({ target }) => {
    const { match: { params: { id } } } = this.props; // console.log(this) -> this.props.match.params.id
    const isChecked = target.checked;
    const trackId = Number(target.name);

    this.setState({ isLoading: true });
    const albumInformation = await getMusics(id);
    const track = albumInformation.find((music) => music.trackId === trackId);

    if (isChecked === true) {
      await addSong(track);
    } else {
      await removeSong(track);
    }

    const favorites = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favoriteList: favorites,
    });
  };

  isFavoriteSong = (id) => {
    const { favoriteList } = this.state;
    return favoriteList.some((track) => track.trackId === id);
  }

  render() {
    const { artistName, albumName, trackList, isLoading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <h2>Album(s)</h2>
          <h3 data-testid="album-name">{ albumName }</h3>
          <h3 data-testid="artist-name">{ artistName }</h3>
          { isLoading ? <Loading /> : (
            trackList.map((track) => (
              <div key={ track.trackNumber }>
                <MusicCard
                  trackName={ track.trackName }
                  previewUrl={ track.previewUrl }
                  trackId={ track.trackId }
                  trackInfos={ track }
                  onChange={ this.handleCheckboxFavorite }
                  isChecked={ this.isFavoriteSong(track.trackId) }
                />
              </div>
            )))}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropType.shape.isRequired,
};

export default Album;
