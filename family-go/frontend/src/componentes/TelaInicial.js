import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/TelaInicial.css';
import logo from '../familyImagens/logo.png';
import ursologo from '../familyImagens/ursologo.png';

function TelaInicial() {
  const navigate = useNavigate();

  const iniciarApp = () => {
    navigate('/login');
  };

  return (
    <div className="tela-cheia tela-centro tela-inicial animada">
      <img src={logo} alt="Logo da aplicação" className="logo animar-logo" />
      
      <div className="mascote-container animar-mascote">
        <img src={ursologo} alt="Mascote Urso" className="mascote-inicial" />
      </div>

      <button className="botao botao-primario botao-grande animar-botao" onClick={iniciarApp}>
        Começar Agora
      </button>
    </div>
  );
}

export default TelaInicial;
