import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      pesquisaMusica: '',
      botaoPesquisaMusica: true,
    };
    // Ele tem que começar como true, pois o método, lá quando boto no botão no render,
    // é DISABLED, que significa desabilitado. Logo, desabilitado: true vai iniciar com
    // o botão desabilitado.
  }

  handleInputChange = ({ target }) => {
    this.setState({ pesquisaMusica: target.value }, this.validarBotao);
  }

  validarBotao = () => {
    const { pesquisaMusica } = this.state;
    const minimoDois = 2;
    // lint pede para guardar o número 2 numa constante.
    if (pesquisaMusica.length >= minimoDois) {
      this.setState({ botaoPesquisaMusica: false });
    }
    // Se o texto digitado no input tiver 2 ou mais caracteres, seto o estado para o botão não ficar mais desabilitado.
  }

  render() {
    const { botaoPesquisaMusica } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleInputChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ botaoPesquisaMusica }
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}
// A parte de ter no mínimo 02 caracteres é igual a do requisito 02. Olhando lá eu lembrei de tudo como fiz.
export default Search;
