import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/EsqueceuSenha.css';
import logo from '../familyImagens/logo.png';

function RecuperarSenha() {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const enviarLinkRecuperacao = async (e) => {
    e.preventDefault();

    if (!email) {
      setErro('Por favor, insira seu email.');
      return;
    }

    try {
      setErro('');
      setMensagem('');
      setCarregando(true);

      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula envio

      setMensagem('Um link de redefinição foi enviado para seu email.');
    } catch (err) {
      console.error(err);
      setErro('Erro ao tentar recuperar senha. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="tela-recuperar-senha">
      <div className="recuperar-senha-container">
        <div className="logo-container">
          <img src={logo} alt="Logo Family Go" className="logo" />
        </div>

        <form className="formulario-recuperar" onSubmit={enviarLinkRecuperacao}>
          <div className="campo-form">
            <label htmlFor="email" className="rotulo">Email</label>
            <input
              type="email"
              id="email"
              className="entrada"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {erro && <p className="mensagem-erro">{erro}</p>}
          {mensagem && <p className="mensagem-sucesso">{mensagem}</p>}

          <button
            type="submit"
            className="botao-recuperar"
            disabled={carregando}
          >
            {carregando ? 'Enviando...' : 'Enviar Link'}
          </button>
        </form>

        <Link to="/login" className="link-voltar">Voltar ao login</Link>
      </div>
    </div>
  );
}

export default RecuperarSenha;
