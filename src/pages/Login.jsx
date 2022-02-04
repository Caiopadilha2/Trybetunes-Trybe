import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      nomeUsuario: '',
      botaoDesabilitado: true,
    };
  }

  handleInputChange = ({ target }) => {
    this.setState({ nomeUsuario: target.value }, this.validarBotao);
  }
  // Igual no projeto anterior. Vou setar o estado com o valor que for digitado no target a cada alteração. O nome do usuário vai receber o que for digitado.
  // Além disso, tenho que chamar, a cada interação, a função abaixo, que verifica se pode habilitar o botão ou não.

  validarBotao = () => {
    // lint pede para guardar o número 3 numa constante.
    const minimoTres = 3;
    const { nomeUsuario } = this.state;
    if (nomeUsuario.length >= minimoTres) {
      this.setState({ botaoDesabilitado: false });
    }
    // Se o texto digitado no input tiver 3 ou mais caracteres, seto o estado para o botão não ficar mais desabilitado, mudando para false.
  }

  render() {
    const { botaoDesabilitado } = this.state;

    return (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            onChange={ this.handleInputChange }
            // Quando mudar algo, chama a função que vai atualizando o valor no nome do usuário. Para acessar, tenho que trazer a const botao
            // Desabilitado para usar o this.state.
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ botaoDesabilitado }
            // Aqui o botão vai habilitar/desabilitar de acordo com o booleano retornado do valor de botaoDesabilitado.
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
