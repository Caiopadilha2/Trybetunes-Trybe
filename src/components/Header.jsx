import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      nomeUsuario: '',
      mensagemLoading: true,
    };
  }

  async componentDidMount() {
    const objetoUsuario = await getUser();
    // Vou pegar o objeto que vem lá da função getUser, que já está pronta.
    this.setState({ nomeUsuario: objetoUsuario.name, mensagemLoading: false });
    // Após o retorno do getUser, vou setar o nome do usuário no estado e tirar a mensagem de loading.
  }

  render() {
    const { nomeUsuario, mensagemLoading } = this.state;
    return (
      <header data-testid="header-component">
        { mensagemLoading ? <Loading />
          : <p data-testid="header-user-name">{ nomeUsuario }</p>}

        <nav>
          <Link to="/search" data-testid="link-to-search">Procurar</Link>

          <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>

          <Link to="/profile" data-testid="link-to-profile">Meu Perfil</Link>
        </nav>
      </header>
    );
  }
}
// Uma renderização condicional, que vai verificar: se a mensagem de loading for true, renderiza o componente Loading.
// Caso não, renderiza o valor do nomeUsiario.
// Aula dia 12.2 minuto 00:23 até 00:26 do Cestari para criação dos links entre páginas.

export default Header;
