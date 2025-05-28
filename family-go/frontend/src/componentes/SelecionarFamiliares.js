import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/SelecionarFamiliares.css';
import logo from '../familyImagens/logo.png';

function SelecionarFamiliares() {
  const [familiares, setFamiliares] = useState([{ id: 1, nome: '', relacao: '' }]);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  const atualizarFamiliar = (id, campo, valor) => {
    setFamiliares(familiares.map(f =>
      f.id === id ? { ...f, [campo]: valor } : f
    ));
  };

  const addFamiliar = () => {
    if (familiares.length >= 10) return;
    const novoId = Math.max(...familiares.map(f => f.id)) + 1;
    setFamiliares([...familiares, { id: novoId, nome: '', relacao: '' }]);
  };

  const removerFamiliar = (id) => {
    if (familiares.length > 1) {
      setFamiliares(familiares.filter(f => f.id !== id));
    }
  };

  const handleSubmit = () => {
    const incompletos = familiares.some(f => !f.nome || !f.relacao);
    if (incompletos) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    try {
      setCarregando(true);
      setErro('');
      localStorage.setItem('familyGoFamiliares', JSON.stringify(familiares));
      localStorage.setItem('familyGoUsuarioCadastrado', 'completo');
      navigate('/dashboard');
    } catch (err) {
      setErro('Ocorreu um erro. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="sf-tela-familiares">
      <img src={logo} alt="Logo Family Go" className="sf-logo" />
      <h1 className="sf-titulo">Monte sua Equipe Familiar!</h1>

      <div className="sf-lista">
        {familiares.map((f, index) => (
          <div className="sf-card-familiar cd-jump" key={f.id}>
            <h2 className="sf-subtitulo">Familiar {index + 1}</h2>
            <input
              className="sf-input"
              type="text"
              placeholder="Nome"
              value={f.nome}
              onChange={e => atualizarFamiliar(f.id, 'nome', e.target.value)}
            />
            <input
              className="sf-input"
              type="text"
              placeholder="Grau de Parentesco"
              value={f.relacao}
              onChange={e => atualizarFamiliar(f.id, 'relacao', e.target.value)}
            />
            {familiares.length > 1 && (
              <button
                className="sf-remover"
                onClick={() => removerFamiliar(f.id)}
              >
                Remover
              </button>
            )}
          </div>
        ))}
        {familiares.length < 10 && (
          <button className="sf-adicionar" onClick={addFamiliar}>
            + Adicionar Familiar
          </button>
        )}
      </div>

      {erro && <p className="sf-erro">{erro}</p>}

      <div className="sf-barra">
        <div
          className="sf-progresso"
          style={{ width: `${familiares.length * 10}%` }}
        />
      </div>

      <button
        className="cd-botao"
        onClick={handleSubmit}
        disabled={carregando}
      >
        {carregando ? 'Processando...' : 'Começar Jornada!'}
      </button>
    </div>
  );
}

export default SelecionarFamiliares;
