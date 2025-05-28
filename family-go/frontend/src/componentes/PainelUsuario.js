import React from 'react';
import '../css/PainelUsuario.css';
import { useUsuario } from '../contextos/UserContext';

function PainelUsuario({ nome, email, mascote, nivel, progresso }) {
  const getMascoteImage = () => {
    switch (mascote) {
      case 'urso': return '/mascotes/urso.png';
      case 'gato': return '/mascotes/gato.png';
      case 'coelho': return '/mascotes/coelho.png';
      default: return '/mascotes/urso.png';
    }
  };

  return (
    <div className="painel-usuario">
      <div className="painel-topo">
        <img src={getMascoteImage()} alt="Mascote" className="painel-mascote" />
      </div>

      <div className="painel-infos">
        <h3 className="painel-nome">{nome}</h3>
        <p className="painel-email">{email}</p>
        <span className="painel-nivel">Nível {nivel}</span>

        <div className="painel-progresso">
          <div className="progresso-preenchido" style={{ width: `${progresso}%` }}></div>
        </div>
        <p className="painel-progresso-texto">{progresso}% de progresso</p>
      </div>
    </div>
  );
}

export default PainelUsuario;
