import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BarraNavegacao from '../componentes/BarraNavegacao';
import '../css/RoletaDesafios.css';

function RoletaDesafios() {
  const [familiares, setFamiliares] = useState([]);
  const [girando, setGirando] = useState(false);
  const [grauAtual, setGrauAtual] = useState(0);
  const [familiarSelecionado, setFamiliarSelecionado] = useState(null);
  const roletaRef = useRef(null);
  const navigate = useNavigate();

  const cores = ['#4CAF50', '#FF9800', '#2196F3', '#9C27B0', '#FF5722', '#8BC34A', '#03A9F4', '#E91E63'];

  useEffect(() => {
    const familiaresJSON = localStorage.getItem('familyGoFamiliares');
    
    if (familiaresJSON) {
      try {
        const familiaresData = JSON.parse(familiaresJSON);
        setFamiliares(familiaresData);
      } catch (error) {
        console.error('Erro ao carregar familiares:', error);
        setFamiliares([]);
      }
    }
  }, []);

  const girarRoleta = () => {
    if (girando || familiares.length === 0) return;
        setGirando(true);
    
    const voltas = 5 + Math.random() * 5;
    const grausPorVolta = 360;
    const rotacaoBase = voltas * grausPorVolta;
    
    const totalSegmentos = familiares.length;
    const grauPorSegmento = 360 / totalSegmentos;
    
    const segmentoSorteado = Math.floor(Math.random() * totalSegmentos);
    const centroSegmento = segmentoSorteado * grauPorSegmento;
    const variacaoAleatoria = (Math.random() * 0.8 - 0.4) * grauPorSegmento;
    const rotacaoFinal = rotacaoBase + centroSegmento + variacaoAleatoria;
    
    setGrauAtual(rotacaoFinal);
    
    setTimeout(() => {
      setGirando(false);
      setFamiliarSelecionado(familiares[segmentoSorteado]);
    }, 5000); 
  };

  const iniciarDesafio = () => {
    if (familiarSelecionado) {
      localStorage.setItem('familiarDesafioAtual', JSON.stringify(familiarSelecionado));
      
      navigate('/desafio');
    }
  };

  const criarSegmentosRoleta = () => {
    if (familiares.length === 0) return [];
    
    const segmentos = [];
    const grauPorSegmento = 360 / familiares.length;
    
    familiares.forEach((familiar, index) => {
      const corIndex = index % cores.length;
      const cor = cores[corIndex];
      
      const grauInicio = index * grauPorSegmento;
      const grauFim = (index + 1) * grauPorSegmento;
      
      const x1 = 50 + 40 * Math.cos((grauInicio * Math.PI) / 180);
      const y1 = 50 + 40 * Math.sin((grauInicio * Math.PI) / 180);
      
      const x2 = 50 + 40 * Math.cos((grauFim * Math.PI) / 180);
      const y2 = 50 + 40 * Math.sin((grauFim * Math.PI) / 180);
      
      const grande = (grauFim - grauInicio) > 180 ? 1 : 0;
      
      const d = `M 50 50 L ${x1} ${y1} A 40 40 0 ${grande} 1 ${x2} ${y2} Z`;
      
      segmentos.push(
        <g key={index}>
          <path 
            d={d} 
            fill={cor} 
            stroke="#fff"
            strokeWidth="0.5"
          />
          <text 
            x="50" 
            y="50" 
            fontSize="8"
            fontWeight="bold"
            fill="#fff"
            textAnchor="middle"
            transform={`rotate(${grauInicio + grauPorSegmento/2}, 50, 50) translate(0, -30)`}
          >
            {familiar.nome}
          </text>
        </g>
      );
    });
    
    return segmentos;
  };

  return (
    <div className="roleta-container">
      <div className="roleta-header">
        <h1>Family Go</h1>
        <p className="roleta-subtitle">
          {familiarSelecionado 
            ? `${familiarSelecionado.nome} foi escolhido(a) da semana!` 
            : 'O familiar escolhido da semana foi:'}
        </p>
      </div>

      <div className="roleta-area">
        {familiares.length > 0 ? (
          <>
            <div className="roleta-wrapper">
              {/* caio - colocar o indicador (seta) */}
              <div className="roleta-indicador"></div>
              
              {/* caio aqui é a seta em si*/}
              <div 
                ref={roletaRef}
                className={`roleta ${girando ? 'girando' : ''}`}
                style={{ transform: `rotate(${grauAtual}deg)` }}
              >
                <svg viewBox="0 0 100 100">
                  {criarSegmentosRoleta()}
                </svg>
              </div>
            </div>
            
            {familiarSelecionado ? (
              <div className="familiar-selecionado">
                <h2>{familiarSelecionado.nome}</h2>
                <button 
                  className="botao-iniciar-desafio"
                  onClick={iniciarDesafio}
                >
                  Ver o Desafio
                </button>
              </div>
            ) : (
              <button 
                className={`botao-girar ${girando ? 'desativado' : ''}`}
                onClick={girarRoleta}
                disabled={girando}
              >
                {girando ? 'Girando...' : 'Rodar a Roleta'}
              </button>
            )}
          </>
        ) : (
          <div className="sem-familiares">
            <p>Você precisa adicionar familiares antes de usar a roleta.</p>
            <button 
              className="botao-adicionar"
              onClick={() => navigate('/adicionar-familiar')}
            >
              Adicionar Familiares
            </button>
          </div>
        )}
      </div>

      <BarraNavegacao />
    </div>
  );
}

export default RoletaDesafios;