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
      artistName: '', // Nomes que vem nas informações do album, é a posição 0 do array. Após isso, tudo o que vem são músicas.
      collectionName: '',
      musicas: [],
      listaMusicasFavoritas: [],
      mensagemLoading: false,
    };
  }

  async componentDidMount() {
    // console.log(this) O ID quando clica no album está em props.match.params.id
    const { match: { params: { id } } } = this.props;
    const informaçõesAlbum = await getMusics(id);
    // console.log(musicas);
    const { artistName, collectionName } = informaçõesAlbum[0];
    const musicas = informaçõesAlbum.slice(1);
    const favorites = await getFavoriteSongs();
    this.setState({
      artistName,
      collectionName,
      musicas,
      listaMusicasFavoritas: favorites,
    });
  }

  handleCheckboxFavorite = async ({ target }) => {
    const { match: { params: { id } } } = this.props; // console.log(this) -> this.props.match.params.id
    const isChecked = target.checked;
    const trackId = Number(target.name);

    this.setState({ mensagemLoading: true });
    const informaçõesAlbum = await getMusics(id);
    const track = informaçõesAlbum.find((music) => music.trackId === trackId);

    if (isChecked === true) {
      await addSong(track);
    } else {
      await removeSong(track);
    }

    const favorites = await getFavoriteSongs();
    this.setState({
      mensagemLoading: false,
      listaMusicasFavoritas: favorites,
    });
  };

  isFavoriteSong = (id) => {
    const { listaMusicasFavoritas } = this.state;
    return listaMusicasFavoritas.some((track) => track.trackId === id);
  }

  render() {
    const { artistName, collectionName, musicas, mensagemLoading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <h2>Album(s)</h2>
          <h3 data-testid="album-name">{ collectionName }</h3>
          <h3 data-testid="artist-name">{ artistName }</h3>
          { mensagemLoading ? <Loading /> : (
            musicas.map((musica) => (
              <div key={ musica.trackNumber }>
                <MusicCard
                  trackName={ musica.trackName }
                  previewUrl={ musica.previewUrl }
                  trackId={ musica.trackId }
                  trackInfos={ musica }
                  onChange={ this.handleCheckboxFavorite }
                  isChecked={ this.isFavoriteSong(musica.trackId) }
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
