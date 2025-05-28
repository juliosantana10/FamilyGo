import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contextos/AuthContext.js';
import '../css/Cadastro.css';
import logo from '../familyImagens/logo.png';

function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [animarConfetti, setAnimarConfetti] = useState(false);
  const [botaoClicado, setBotaoClicado] = useState(false);

  const { cadastrar } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (animarConfetti) {
      criarConfetti();
      
      const timer = setTimeout(() => {
        navigate('/escolha-mascote');
      }, 1200);
      
      return () => clearTimeout(timer);
    }
  }, [animarConfetti, navigate]);

  const criarConfetti = () => {
    const container = document.querySelector('.cd-tela-cadastro');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'cd-confetti';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animationDuration = `${3 + Math.random() * 2}s`;
      container.appendChild(confetti);
      
      setTimeout(() => {
        if (confetti.parentNode === container) {
          container.removeChild(confetti);
        }
      }, 5000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !senha || !confirmarSenha) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não correspondem.');
      return;
    }

    try {
      setErro('');
      setCarregando(true);
      setBotaoClicado(true);

      await cadastrar(email, senha);
      
      setAnimarConfetti(true);
      
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setErro('Falha ao criar conta. Tente novamente.');
      setBotaoClicado(false);
      setCarregando(false);
    }
  };

  const getDicaDeSenha = () => {
    if (!senha) return "Use uma senha forte";
    
    if (senha.length < 6) {
      return "Senha muito curta";
    } else if (senha.length >= 8 && /[A-Z]/.test(senha) && /[0-9]/.test(senha)) {
      return "Senha forte!";
    } else {
      return "Use letras e números";
    }
  };

  return (
    <div className="cd-tela-cheia cd-tela-cadastro">
      <div className="cd-logo-container">
        <img src={logo} alt="Logo da aplicação" className="cd-logo" />
      </div>

      <div className="cd-cadastro-container">
        <form onSubmit={handleSubmit} className="cd-formulario-cadastro">
          <div className="cd-campo-form" data-tooltip="Use seu melhor email">
            <label htmlFor="email" className="cd-rotulo">Email</label>
            <input
              type="email"
              id="email"
              className="cd-entrada"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="cd-campo-form" data-tooltip={getDicaDeSenha()}>
            <label htmlFor="senha" className="cd-rotulo">Senha</label>
            <div className="cd-senha-container">
              <input
                type={mostrarSenha ? "text" : "password"}
                id="senha"
                className="cd-entrada"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="cd-campo-form" data-tooltip="Confirme sua senha">
            <label htmlFor="confirmarSenha" className="cd-rotulo">Confirme sua senha</label>
            <div className="cd-senha-container">
              <input
                type={mostrarSenha ? "text" : "password"}
                id="confirmarSenha"
                className="cd-entrada"
                placeholder="Confirme a senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
              />
              <div className="cd-opcao-mostrar">
                <input 
                  type="checkbox" 
                  id="mostrarSenha" 
                  checked={mostrarSenha} 
                  onChange={() => setMostrarSenha(!mostrarSenha)} 
                />
                <label htmlFor="mostrarSenha">Exibir</label>
              </div>
            </div>
          </div>

          {erro && <p className="cd-mensagem-erro">{erro}</p>}

          <button
            type="submit"
            className={`cd-botao cd-botao-secundario cd-botao-grande ${botaoClicado && !erro ? 'cd-botao-clicado' : ''}`}
            disabled={carregando}
          >
            {carregando ? "Carregando..." : "Continue"}
          </button>
        </form>

        <div className="cd-opcoes-cadastro">
          <Link to="/login" className="cd-botao cd-botao-primario cd-botao-grande">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;