import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <div>
        <nav>

          <Link to="/search" data-testid="link-to-search">Procurar</Link>

          <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>

          <Link to="/profile" data-testid="link-to-profile"> Meu Perfil</Link>

        </nav>
      </div>
    );
  }
}
// Aula dia 12.2 minuto 00:23 até 00:26 do Cestari.

export default Header;
