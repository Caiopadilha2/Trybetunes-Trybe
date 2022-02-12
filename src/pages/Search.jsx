import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumCard from '../components/AlbumCard';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      pesquisaAlbum: '',
      botaoPesquisaAlbum: true,
      mensagemLoading: false, // req 6
      encontrouAlbum: false, // req 6
      nomeArtista: '', // req 6
      albums: [], // req 6
    };
    // Ele tem que começar como true, pois o método, lá quando boto no botão no render,
    // é DISABLED, que significa desabilitado. Logo, desabilitado: true vai iniciar com
    // o botão desabilitado.
  }

  handleInputChange = ({ target }) => {
    this.setState({ pesquisaAlbum: target.value }, this.validarBotao);
  }

  validarBotao = () => {
    const { pesquisaAlbum } = this.state;
    const minimoDois = 2;
    // lint pede para guardar o número 2 numa constante.
    if (pesquisaAlbum.length >= minimoDois) {
      this.setState({ botaoPesquisaAlbum: false });
    }
    // Se o texto digitado no input tiver 2 ou mais caracteres, seto o estado para o botão não ficar mais desabilitado.
  }

  cliquePesquisarAlbum = async () => {
    const { pesquisaAlbum } = this.state;
    this.setState({ mensagemLoading: true, encontrouAlbum: false });
    console.log(pesquisaAlbum);
    const albumsArray = await searchAlbumsAPI(pesquisaAlbum);
    console.log(albumsArray.length);
    this.setState({ pesquisaAlbum: '' });

    // if (albumsArray.length > 0) {
    //   this.setState({
    //     mensagemLoading: false,
    //     encontrouAlbum: true,
    //     albums: albumsArray,
    //     nomeArtista: pesquisaAlbum,
    //   });
    // } else {
    //   this.setState({
    //     mensagemLoading: false,
    //     encontrouAlbum: false,
    //     albums: albumsArray,
    //     nomeArtista: pesquisaAlbum,
    //   });
    // }
    this.setState({
      mensagemLoading: false,
      encontrouAlbum: true,
      albums: albumsArray,
      nomeArtista: pesquisaAlbum,
    });
  }

  render() {
    const { botaoPesquisaAlbum,
      // pesquisaAlbum,
      mensagemLoading,
      encontrouAlbum,
      nomeArtista,
      albums } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { mensagemLoading ? <Loading /> : (
          <form>
            <input
              type="text"
              data-testid="search-artist-input"
              onChange={ this.handleInputChange }
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ botaoPesquisaAlbum }
              onClick={ this.cliquePesquisarAlbum }
            >
              Pesquisar

            </button>
          </form>
        ) }
        { encontrouAlbum && (
          <div>
            { albums.length > 0 ? <p>{`Resultado de álbuns de: ${nomeArtista}`}</p> : (
              <p>Nenhum álbum foi encontrado</p>) }
            <div>
              { albums.map((album) => (
                <AlbumCard key={ album.collectionId } { ...album } />))}
            </div>
          </div>)}
      </div>
    );
  }
}
// A parte de ter no mínimo 02 caracteres é igual a do requisito 02. Olhando lá eu lembrei de tudo como fiz.
export default Search;
