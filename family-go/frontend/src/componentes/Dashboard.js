import React, { useState, useEffect } from 'react';
import PainelUsuario from '../componentes/PainelUsuario';
import '../css/Dashboard.css';

function Dashboard() {
  const [usuario, setUsuario] = useState({
    nome: 'Julio César',
    email: 'julio@example.com',
    mascote: 'urso',
    nivel: 2,
    progresso: 68,
  });

  const [familiares, setFamiliares] = useState([]);

  useEffect(() => {
    // Simula carregamento de familiares salvos
    const dadosSalvos = localStorage.getItem('familyGoFamiliares');
    if (dadosSalvos) {
      setFamiliares(JSON.parse(dadosSalvos));
    } else {
      setFamiliares([
        { nome: 'Mãe', desempenho: 'Excelente' },
        { nome: 'Pai', desempenho: 'Bom' },
        { nome: 'Eu', desempenho: 'Razoável' },
      ]);
    }
  }, []);

  return (
    <div className="dashboard-container">
      <div className="decoration-dots-1" />
      <div className="decoration-dots-2" />

      <PainelUsuario
        nome={usuario.nome}
        email={usuario.email}
        mascote={usuario.mascote}
        nivel={usuario.nivel}
        progresso={usuario.progresso}
      />

      <h3 className="section-title">Família conectada</h3>
      <div className="familiar-list">
        {familiares.map((familiar, index) => (
          <div className="familiar-card" key={index}>
            <span className="familiar-name">{familiar.nome}</span>
            <span className="familiar-performance">
              {familiar.desempenho || 'Desempenho não disponível'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
