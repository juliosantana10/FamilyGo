import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function SelecionarFamiliares() {
  const [familiares, setFamiliares] = useState([
    { id: 1, nome: '', relacao: '' },
    { id: 2, nome: '', relacao: '' }
  ]);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  
  const navigate = useNavigate();

  const atualizarFamiliar = (id, campo, valor) => {
    setFamiliares(familiares.map(familiar => 
      familiar.id === id ? { ...familiar, [campo]: valor } : familiar
    ));
  };

  const addFamiliar = () => {
    const novoId = Math.max(...familiares.map(f => f.id)) + 1;
    setFamiliares([...familiares, { id: novoId, nome: '', relacao: '' }]);
  };

  const removerFamiliar = (id) => {
    if (familiares.length > 2) {
      setFamiliares(familiares.filter(f => f.id !== id));
    }
  };

  const handleSubmit = async () => {
    const incompletos = familiares.some(f => !f.nome || !f.relacao);
    
    if (incompletos) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }
    
    try {
      setErro('');
      setCarregando(true);
      
      localStorage.setItem('familyGoFamiliares', JSON.stringify(familiares));
      
      localStorage.setItem('familyGoUsuarioCadastrado', 'completo');
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao salvar familiares:', error);
      setErro('Ocorreu um erro. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="tela-cheia tela-familiares">
      <div className="logo-container">
        <img src="/assets/images/logo.svg" alt="Family Go" className="logo-pequena" />
      </div>
      
      <h1 className="titulo-familiares">
        Quais familiares participarão da disputa?
      </h1>
      
      <div className="lista-familiares">
        {familiares.map((familiar, index) => (
          <div key={familiar.id} className="familiar-form">
            <h2 className="subtitulo-familiar">Pessoa {index + 1}</h2>
            
            <div className="campo-form">
              <input
                type="text"
                className="entrada"
                placeholder="Familiar"
                value={familiar.nome}
                onChange={(e) => atualizarFamiliar(familiar.id, 'nome', e.target.value)}
              />
            </div>
            
            <div className="campo-form">
              <input
                type="text"
                className="entrada"
                placeholder="Grau de Relação"
                value={familiar.relacao}
                onChange={(e) => atualizarFamiliar(familiar.id, 'relacao', e.target.value)}
              />
            </div>
            
            {familiares.length > 2 && (
              <button 
                type="button" 
                className="botao-remover" 
                onClick={() => removerFamiliar(familiar.id)}
              >
                Remover
              </button>
            )}
          </div>
        ))}
      </div>
      
      {erro && <p className="mensagem-erro">{erro}</p>}
      
      <div className="barra-progresso">
        <div className="progresso" style={{ width: '66%' }}></div>
      </div>
      
      <div className="acoes-familiares">
        <button 
          className="botao botao-primario botao-grande"
          onClick={handleSubmit}
          disabled={carregando}
        >
          {carregando ? "Processando..." : "Continuar"}
        </button>
      </div>
    </div>
  );
}

export default SelecionarFamiliares;