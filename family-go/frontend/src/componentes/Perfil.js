import React, { useState, useEffect } from 'react';
import { useUsuario } from '../contextos/UserContext';
import Navbar from '../componentes/Navbar';
import '../css/Perfil.css';

function Perfil() {
  const [usuario, setUsuario] = useState({
    nome: 'Julio César',
    email: 'julio@example.com',
    mascote: 'urso',
    nivel: 1,
    progresso: 45, // em %
    tempoUso: '2h 30min',
  });

  const getMascoteImage = () => {
    switch (usuario.mascote) {
      case 'urso': return '/mascotes/urso.png';
      case 'gato': return '/mascotes/gato.png';
      case 'coelho': return '/mascotes/coelho.png';
      default: return '/mascotes/urso.png';
    }
  };

  return (
    <div className="perfil-container">
      <Navbar />

      <div className="perfil-card">
        <h2 className="perfil-title">Meu Perfil</h2>

        <div className="perfil-header">
          <img src={getMascoteImage()} alt="Mascote" className="perfil-mascote" />
          <div className="perfil-info">
            <h3 className="perfil-nome">{usuario.nome}</h3>
            <p className="perfil-email">{usuario.email}</p>
            <span className="nivel-badge">Nível {usuario.nivel}</span>
          </div>
        </div>

        <div className="perfil-dados">
          <div className="perfil-item">
            <span className="perfil-label">Progresso:</span>
            <div className="progresso-barra">
              <div className="progresso-preenchido" style={{ width: `${usuario.progresso}%` }}></div>
            </div>
            <span className="perfil-valor">{usuario.progresso}%</span>
          </div>

          <div className="perfil-item">
            <span className="perfil-label">Tempo de uso hoje:</span>
            <span className="perfil-valor">{usuario.tempoUso}</span>
          </div>
        </div>

        <div className="perfil-acoes">
          <button className="botao-perfil">Editar Perfil</button>
          <button className="botao-perfil sair">Sair da Conta</button>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
