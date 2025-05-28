import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../componentes/Navbar';
import '../css/DetalhesDesafio.css';

function DetalhesDesafio() {
  const [familiar, setFamiliar] = useState(null);
  const [desafio, setDesafio] = useState(null);
  const [pontos, setPontos] = useState(100);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  const listaDesafios = [/* abner - mesma listagem*/];

  useEffect(() => {
    const familiarJSON = localStorage.getItem('familiarDesafioAtual');

    if (familiarJSON) {
      try {
        const familiarData = JSON.parse(familiarJSON);
        setFamiliar(familiarData);
        const desafioAleatorio = listaDesafios[Math.floor(Math.random() * listaDesafios.length)];
        setDesafio(desafioAleatorio);
        setPontos(desafioAleatorio.pontos);
      } catch (error) {
        console.error('Erro ao carregar familiar para o desafio:', error);
      }
    } else {
      navigate('/roleta-desafios');
    }

    setCarregando(false);
  }, [navigate]);

  const concluirDesafio = () => { /* abner - colocar igual*/};
  const pularDesafio = () => navigate('/roleta-desafios');
  const criarConfetes = () => { /* abner - colocar igual*/ };

  if (carregando) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Carregando desafio...</p>
      </div>
    );
  }

  return (
    <div className="desafio-container">
      <div className="desafio-header">
        <h1>Family Go</h1>
        <p className="desafio-subtitle">Desafio da Semana</p>
      </div>

      <div className="card-desafio">
        {familiar && desafio ? (
          <>
            <div className="desafio-familiar">
              <h2>{familiar.nome}</h2>
              <div className="desafio-avatar">
                <span className="desafio-emoji">{familiar.emoji || '👤'}</span>
              </div>
            </div>

            <div className="desafio-conteudo">
              <div className="desafio-icone">{desafio.icone}</div>
              <h3>{desafio.titulo}</h3>
              <p>{desafio.descricao}</p>

              <div className="desafio-pontos">
                <span className="pontos-valor">{desafio.pontos}</span>
                <span className="pontos-texto">pontos</span>
              </div>
            </div>

            <div className="desafio-acoes">
              <button className="botao-concluir" onClick={concluirDesafio}>
                Desafio Concluído! 🎉
              </button>
              <button className="botao-pular" onClick={pularDesafio}>
                Escolher Outro Desafio
              </button>
            </div>
          </>
        ) : (
          <div className="sem-desafio">
            <p>Nenhum desafio disponível.</p>
            <button className="botao-voltar" onClick={() => navigate('/roleta-desafios/1')}>
              Voltar para a Roleta
            </button>
          </div>
        )}
      </div>

      <Navbar />
    </div>
  );
}

export default DetalhesDesafio;
