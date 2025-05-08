import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BarraNavegacao from '../componentes/BarraNavegacao';
import BotaoFlutuante from '../componentes/BotaoFlutuante';
import CardFamiliar from '../componentes/CardFamiliar';
import '../css/Dashboard.css';

function Dashboard() {
  const [mascote, setMascote] = useState('urso');
  const [nivel, setNivel] = useState(1);
  const [familiares, setFamiliares] = useState([]);
  const [carregando, setCarregando] = useState(true);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const mascoteSalvo = localStorage.getItem('familyGoMascote') || 'urso';
    const familiaresJSON = localStorage.getItem('familyGoFamiliares');
    
    setMascote(mascoteSalvo);
    
    if (familiaresJSON) {
      try {
        const familiaresData = JSON.parse(familiaresJSON);
        const familiaresComPontos = familiaresData.map(f => ({
          ...f,
          pontos: 0
        }));
        setFamiliares(familiaresComPontos);
      } catch (error) {
        console.error('Erro ao carregar familiares:', error);
      }
    }
    
    setCarregando(false);
  }, []);
  
  const iniciarDesafio = () => {
    navigate('/roleta-desafios');
  };
  
  if (carregando) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Carregando...</p>
      </div>
    );
  }
  
  const getMascoteImage = () => {
    switch(mascote) {
      case 'urso':
        return '/mascotes/urso.png';
      case 'gato':
        return '/mascotes/gato.png';
      case 'coelho':
        return '/mascotes/coelho.png';
      default:
        return '/mascotes/urso.png';
    }
  };
  
  return (
    <div className="dashboard-container">
      <div className="decoration-dots decoration-dots-1"></div>
      <div className="decoration-dots decoration-dots-2"></div>
      
      <div className="dashboard-header">
        <div className="mascot-container">
          <div className="mascot-image">
            <img src={getMascoteImage()} alt={`Mascote ${mascote}`} />
          </div>
          <div className="level-badge">
            Lv {nivel}
          </div>
        </div>
      </div>
      
      <div className="family-members">
        {familiares.length > 0 ? (
          familiares.map((familiar, index) => (
            <div key={familiar.id || index} className="family-member-card">
              <CardFamiliar familiar={familiar} />
            </div>
          ))
        ) : (
          <div className="empty-family">
            <img src="/images/empty-family.png" alt="Nenhum familiar" />
            <p>Nenhum familiar adicionado ainda.</p>
            <p>Adicione familiares para começar!</p>
          </div>
        )}
      </div>
      
      <BarraNavegacao />
      
      <BotaoFlutuante onClick={iniciarDesafio} />
    </div>
  );
}

export default Dashboard;