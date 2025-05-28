import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../componentes/Navbar';
import '../css/RoletaDesafios.css';
import DetalhesDesafio from '../componentes/DetalhesDesafio';

function RoletaDesafios() {
  const [familiares, setFamiliares] = useState([]);
  const [girando, setGirando] = useState(false);
  const [rotacao, setRotacao] = useState(0);
  const [familiarSelecionado, setFamiliarSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const roletaRef = useRef(null);
  const navigate = useNavigate();

  // Paleta baseada no Family Go
  const cores = [
    '#fa7b17', '#a85c2c', '#229e49', '#6d4c41',
    '#a1887f', '#ff914d', '#f2e9d9', '#8BC34A'
  ];

  useEffect(() => {
    const carregarFamiliares = async () => {
      const dados = localStorage.getItem('familyGoFamiliares');
      if (dados) {
        try {
          setFamiliares(JSON.parse(dados));
        } catch {
          setFamiliares([]);
        }
      }
      setCarregando(false);
    };
    carregarFamiliares();
  }, []);

  const girarRoleta = () => {
    if (girando || familiares.length === 0) return;
    setGirando(true);
    setFamiliarSelecionado(null);

    const voltas = 7 + Math.random() * 5; // 7-12 voltas para mais suspense
    const grausPorVolta = 360;
    const totalSegmentos = familiares.length;
    const grauPorSegmento = 360 / totalSegmentos;

    const sorteado = Math.floor(Math.random() * totalSegmentos);
    const centroSegmento = sorteado * grauPorSegmento;
    const variacao = (Math.random() * 0.8 - 0.4) * grauPorSegmento;

    const rotacaoFinal = voltas * grausPorVolta + centroSegmento + variacao;

    setRotacao(rotacaoFinal);

    setTimeout(() => {
      setGirando(false);
      setFamiliarSelecionado(familiares[sorteado]);
      criarConfetes();
    }, 6500);
  };

  const criarConfetes = () => {
    const container = document.querySelector('.roleta-container');
    if (!container) return;

    const confetes = document.createElement('div');
    confetes.className = 'confetes';
    container.appendChild(confetes);

    const coresConfete = ['#fa7b17', '#a85c2c', '#229e49', '#6d4c41', '#ff914d', '#a1887f', '#f2e9d9', '#F44336'];

    for (let i = 0; i < 120; i++) {
      const c = document.createElement('div');
      c.className = 'confete';
      c.style.left = `${Math.random() * 100}%`;
      c.style.animationDelay = `${Math.random() * 4}s`;
      c.style.setProperty('--cor', coresConfete[Math.floor(Math.random() * coresConfete.length)]);
      confetes.appendChild(c);
    }

    setTimeout(() => {
      confetes.remove();
    }, 7000);
  };

  const abrirDetalhes = () => {
    if (familiarSelecionado) {
      localStorage.setItem('familiarDesafioAtual', JSON.stringify(familiarSelecionado));
      navigate(`/detalhes-desafio/1`);
    }
  };

  const criarSegmentosRoleta = () => {
  if (familiares.length === 0) return null;
  const segmentos = [];
  const grauPorSegmento = 360 / familiares.length;

  familiares.forEach((familiar, i) => {
    const cor = cores[i % cores.length];
    const grauInicio = i * grauPorSegmento;
    const grauFim = grauInicio + grauPorSegmento;

    const x1 = 50 + 40 * Math.cos((grauInicio * Math.PI) / 180);
    const y1 = 50 + 40 * Math.sin((grauInicio * Math.PI) / 180);
    const x2 = 50 + 40 * Math.cos((grauFim * Math.PI) / 180);
    const y2 = 50 + 40 * Math.sin((grauFim * Math.PI) / 180);

    const grande = grauPorSegmento > 180 ? 1 : 0;

    const d = `M 50 50 L ${x1} ${y1} A 40 40 0 ${grande} 1 ${x2} ${y2} Z`;

    // Segurança para nome
    const nome = familiar.nome || 'Sem nome';
    const nomeExibido = nome.length > 12 ? nome.slice(0, 12) + '…' : nome;

    // Calcula posição do texto no meio do segmento
    const grauTexto = grauInicio + grauPorSegmento / 2;
    const xTexto = 50 + 28 * Math.cos((grauTexto * Math.PI) / 180);
    const yTexto = 50 + 28 * Math.sin((grauTexto * Math.PI) / 180);

    segmentos.push(
      <g key={familiar.id || i}>
        <path d={d} fill={cor} stroke="#fff" strokeWidth="0.8" />
        <text
          x={xTexto}
          y={yTexto}
          fill="#333"
          fontSize="7"
          fontWeight="bold"
          textAnchor="middle"
          alignmentBaseline="middle"
          transform={`rotate(${grauTexto}, ${xTexto}, ${yTexto})`}
          className="nome-familiar"
          style={{ userSelect: 'none', pointerEvents: 'none' }}
        >
          {nomeExibido}
        </text>
      </g>
    );
  });

    return segmentos;
  };

  if (carregando) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando roleta...</p>
      </div>
    );
  }

  return (
    <div className="roleta-container" role="main" aria-label="Roleta de desafios Family Go">
      <header className="roleta-header">
        <h1>Family Go</h1>
        <p className="roleta-subtitle">
          Gire a roleta para escolher um familiar
        </p>
      </header>

      <section className="roleta-area">
        {familiares.length === 0 ? (
          <div className="sem-familiares">
            <p>Você precisa adicionar familiares antes de usar a roleta.</p>
            <button className="botao-adicionar" onClick={() => navigate('/adicionar-familiar')}>
              Adicionar Familiares
            </button>
          </div>
        ) : (
          <>
            <div className="roleta-wrapper" aria-live="polite" aria-atomic="true">
              <div className="roleta-indicador" aria-hidden="true" />
              <div
                ref={roletaRef}
                className={`roleta ${girando ? 'girando' : ''}`}
                style={{ transform: `rotate(${rotacao}deg)` }}
              >
                <svg viewBox="0 0 100 100" aria-hidden="true">
                  {criarSegmentosRoleta()}
                </svg>
              </div>
            </div>

            <div className="botoes-area">
              {!familiarSelecionado ? (
                <button
                  className={`botao-girar ${girando ? 'desativado' : ''}`}
                  onClick={girarRoleta}
                  disabled={girando}
                  aria-disabled={girando}
                  aria-live="polite"
                  aria-label="Rodar a roleta"
                >
                  {girando ? 'Girando...' : 'Rodar a Roleta'}
                </button>
              ) : (
                <button
                className="botao-detalhes"
                onClick={abrirDetalhes}
                aria-label={`Ver detalhes do desafio para ${familiarSelecionado.nome}`}
              >
                Ver Detalhes do Desafio
              </button>
              )}
            </div>
          </>
        )}
      </section>

      <Navbar />
    </div>
  );
}

export default RoletaDesafios;
