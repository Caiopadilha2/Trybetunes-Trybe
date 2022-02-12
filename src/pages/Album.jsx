import React from 'react';
import PropType from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '', // Nomes que vem nas informações do album, é a posição 0 do array. Após isso, tudo o que vem são músicas.
      collectionName: '',
      musicas: [],
    };
  }

  async componentDidMount() {
    // console.log(this) O ID quando clica no album está em props.match.params.id
    const { match: { params: { id } } } = this.props;
    const musicas = await getMusics(id);
    console.log(musicas);
    const { artistName, collectionName } = musicas[0];
    this.setState({ artistName, collectionName, musicas: musicas.slice(1) });
  }

  render() {
    const { artistName, collectionName, musicas } = this.state;
    return (
      <div data-testid="page-album">
        <span>Album</span>
        <Header />
        <div>
          <h3 data-testid="artist-name">{artistName}</h3>
          <p data-testid="album-name">{collectionName}</p>
        </div>
        <div>
          { musicas.map((musica) => <MusicCard key={ musica.trackId } { ...musica } />) }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropType.shape.isRequired,
};

export default Album;
