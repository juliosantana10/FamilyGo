import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/EscolhaMascote.css';
import ursinhoMascote from '../familyImagens/ursinhoMascote.png';
import girafa from '../familyImagens/girafa.jpg';
import hipopotamo from '../familyImagens/hipopotamo.jpg';

function EscolhaMascote() {
  const [mascoteSelecionado, setMascoteSelecionado] = useState(null);
  const [nomeFamilia, setNomeFamilia] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  
  const navigate = useNavigate();

  const mascotes = [
    { id: 'urso', nome: 'Urso', imagem: ursinhoMascote },
    { id: 'girafa', nome: 'Girafa', imagem: girafa},
    { id: 'hipopotamo', nome: 'Hipopótamo', imagem: hipopotamo }
  ];

  const selecionarMascote = (id) => {
    setMascoteSelecionado(id);
  };

  const handleSubmit = async () => {
    if (!mascoteSelecionado) {
      setErro('Por favor, selecione um mascote.');
      return;
    }
    
    if (!nomeFamilia.trim()) {
      setErro('Por favor, informe o nome da sua família.');
      return;
    }
    
    try {
      setErro('');
      setCarregando(true);
      
      localStorage.setItem('familyGoMascote', mascoteSelecionado);
      localStorage.setItem('familyGoNomeFamilia', nomeFamilia);
      
      navigate('/selecionar-familiares');
    } catch (error) {
      console.error('Erro ao salvar mascote:', error);
      setErro('Ocorreu um erro. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="tela-cheia tela-mascote">
      <div className="logo-container">
        <img src="/assets/images/logo.svg" alt="Family Go" className="logo-pequena" />
      </div>
      
      <h1 className="titulo-mascote">
        Escolha o mascote que a sua família criará:
      </h1>
      
      <div className="opcoes-mascote">
        {mascotes.map(mascote => (
          <div 
            key={mascote.id}
            className={`opcao-mascote ${mascoteSelecionado === mascote.id ? 'selecionado' : ''}`}
            onClick={() => selecionarMascote(mascote.id)}
          >
            <img src={mascote.imagem} alt={mascote.nome} />
          </div>
        ))}
      </div>
      
      <div className="campo-form campo-nome-familia">
        <input
          type="text"
          className="entrada entrada-nome-familia"
          placeholder="Nome da Família"
          value={nomeFamilia}
          onChange={(e) => setNomeFamilia(e.target.value)}
        />
      </div>
      
      {erro && <p className="mensagem-erro">{erro}</p>}
      
      <div className="barra-progresso">
        <div className="progresso" style={{ width: '33%' }}></div>
      </div>
      
      <button 
        className="botao botao-primario botao-grande"
        onClick={handleSubmit}
        disabled={carregando}
      >
        {carregando ? "Processando..." : "Continuar"}
      </button>
    </div>
  );
}

export default EscolhaMascote;