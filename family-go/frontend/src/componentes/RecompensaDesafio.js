import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUsuario } from '../contextos/UserContext';
import Navbar from '../componentes/Navbar';
import '../css/RecompensaDesafio.css';

const desafiosDisponiveis = [
  {
    id: 1,
    titulo: 'Convocar a família para ir à praia',
    descricao: 'Organize um passeio à praia com toda a família.',
    pontos: 50,
    prazo: '20/05/2025',
    categoria: 'Lazer'
  },
  {
    id: 2,
    titulo: 'Preparar um jantar em família',
    descricao: 'Cozinhe um jantar especial para todos na família.',
    pontos: 40,
    prazo: '18/05/2025',
    categoria: 'Culinária'
  },
  {
    id: 3,
    titulo: 'Noite de jogos de tabuleiro',
    descricao: 'Organize uma noite de jogos com toda a família.',
    pontos: 35,
    prazo: '22/05/2025',
    categoria: 'Diversão'
  }
];

function RecompensaDesafio() {
  const [desafio, setDesafio] = useState(null);
  const [fotos, setFotos] = useState([null, null]);
  const [carregando, setCarregando] = useState(true);
  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const desafioEncontrado = desafiosDisponiveis.find(d => d.id === parseInt(id)) || desafiosDisponiveis[0];
    setDesafio(desafioEncontrado);
    setCarregando(false);
  }, [id]);

  const handleFotoChange = (index) => {
    const novasFotos = [...fotos];
    novasFotos[index] = `/assets/images/placeholder-foto.jpg`;
    setFotos(novasFotos);
  };

  const compartilharMomento = () => {
    navigate('/compartilhar-reels');
  };

  if (carregando || !desafio) {
    return (
      <div className="tela-carregamento">
        <img src="/assets/images/logo.svg" alt="Family Go Logo" className="logo-carregamento" />
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="tela-cheia tela-recompensa">
      <div className="logo-container">
        <img src="/assets/images/logo.svg" alt="Family Go" className="logo-pequena" />
      </div>
      
      <div className="cabecalho-recompensa">
        <h1 className="titulo-recompensa">
          {desafio.titulo}
        </h1>
      </div>
      
      <div className="card-recompensa">
        <div className="secao-pontos">
          <h2>Recompensa</h2>
          <div className="pontos-container">
            <span className="pontos-valor">{desafio.pontos} Pontos</span>
            <button className="botao-editar">
              <i className="icone-editar">✏️</i>
            </button>
          </div>
        </div>
        
        <div className="secao-fotos">
          <p>Envie duas fotos do momento</p>
          
          <div className="grade-fotos">
            {fotos.map((foto, index) => (
              <div key={index} className="slot-foto">
                {foto ? (
                  <img src={foto} alt={`Foto ${index + 1}`} className="foto-preview" />
                ) : (
                  <button 
                    className="botao-adicionar-foto"
                    onClick={() => handleFotoChange(index)}
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="secao-prazo">
          <p>Prazo: 23:59 / {desafio.prazo}</p>
        </div>
      </div>
      
      <button 
        className="botao botao-primario botao-grande"
        onClick={compartilharMomento}
        disabled={!fotos.every(foto => foto !== null)}
      >
        Compartilhar Momento
      </button>
      
      <Navbar paginaAtiva="home" />
    </div>
  );
}

export default RecompensaDesafio;