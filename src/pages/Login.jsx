import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      nomeUsuario: '',
      botaoDesabilitado: true,
      mensagemLoading: false,
      redirecionando: false,
    };
  }

  handleInputChange = ({ target }) => {
    this.setState({ nomeUsuario: target.value }, this.validarBotao);
  }
  // Igual no projeto anterior. Vou setar o estado com o valor que for digitado no target a cada alteração. O nome do usuário vai receber o que for digitado.
  // Além disso, tenho que chamar, a cada interação, a função abaixo, que verifica se pode habilitar o botão ou não.

  validarBotao = () => {
    // lint pede para guardar o número 3 numa constante.
    const { nomeUsuario } = this.state;
    const minimoTres = 3;
    if (nomeUsuario.length >= minimoTres) {
      this.setState({ botaoDesabilitado: false });
    }
    // Se o texto digitado no input tiver 3 ou mais caracteres, seto o estado para o botão não ficar mais desabilitado, mudando para false.
  }

  cliqueLogin = async () => {
    this.setState({ mensagemLoading: true });
    // Seta a mensagem de loading como true para começar. Vai ser renderizada lá no render (?)
    const { nomeUsuario } = this.state;
    await createUser({ name: nomeUsuario });
    // Usando a função que cria usuário para guardar na chave ''name'', o valor do input em nomeUsuario.
    this.setState({ mensagemLoading: false, redirecionando: true });
    // Depois do retorno dessa função de criar usuário, temos que tirar o loading passando false, e redirecionar passando true pro redirecionando.
  }

  render() {
    const { botaoDesabilitado, mensagemLoading, redirecionando } = this.state;

    return (
      <div data-testid="page-login">
        { redirecionando && <Redirect to="/search" />}
        { mensagemLoading ? <Loading /> : (

          <form>
            <input
              type="text"
              data-testid="login-name-input"
              onChange={ this.handleInputChange }
            // Quando mudar algo, chama a função que vai atualizando o valor no nome do usuário. Para acessar, tenho que trazer a const botaoDesabilitado para usar o this.state.
            />
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ botaoDesabilitado }
              // Aqui o botão vai habilitar/desabilitar de acordo com o booleano retornado do valor de botaoDesabilitado.
              onClick={ this.cliqueLogin }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default Login;
