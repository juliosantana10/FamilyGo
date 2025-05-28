import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contextos/AuthContext.js';
import '../css/Login.css';
import logo from '../familyImagens/logo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [botaoClicado, setBotaoClicado] = useState(false);
  const [loginSucesso, setLoginSucesso] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Efeito para animação de confetti após login bem-sucedido
  useEffect(() => {
    if (loginSucesso) {
      criarConfetti();
      
      // Navegar após a animação de sucesso
      const timer = setTimeout(() => {
        const usuarioCadastrado = localStorage.getItem('familyGoUsuarioCadastrado');
        if (usuarioCadastrado === 'completo') {
          navigate('/dashboard'); 
        } else {
          navigate('/escolha-mascote');
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [loginSucesso, navigate]);

  // Função para criar o efeito de confetti
  const criarConfetti = () => {
    const container = document.querySelector('.lg-tela-login');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'lg-confetti';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animationDuration = `${3 + Math.random() * 2}s`;
      container.appendChild(confetti);
      
      // Remover após a animação
      setTimeout(() => {
        if (confetti.parentNode === container) {
          container.removeChild(confetti);
        }
      }, 5000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    try {
      setErro('');
      setCarregando(true);
      setBotaoClicado(true);

      await login(email, senha);
      
      // Indicar sucesso do login
      setLoginSucesso(true);
      
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErro('Falha ao fazer login. Verifique seu email e senha.');
      setBotaoClicado(false);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="lg-tela-cheia lg-tela-login">
      <div className="lg-logo-container">
        <img src={logo} alt="Family Go" className="lg-logo" />
      </div>

      <div className="lg-login-container">
        <form onSubmit={handleSubmit} className="lg-formulario-login">
          <div className="lg-campo-form">
            <label htmlFor="email" className="lg-rotulo">Email</label>
            <input
              type="email"
              id="email"
              className="lg-entrada"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="lg-campo-form">
            <label htmlFor="senha" className="lg-rotulo">Password</label>
            <div className="lg-senha-container">
              <input
                type={mostrarSenha ? "text" : "password"}
                id="senha"
                className="lg-entrada"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <button
                type="button"
                className="lg-toggle-senha"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? "Ocultar" : "Exibir"}
              </button>
            </div>
          </div>

          <div className="lg-recuperar-senha">
            <Link to="/esqueceu-senha" className="lg-link-recuperar">Esqueceu senha?</Link>
          </div>

          {erro && <p className="lg-mensagem-erro">{erro}</p>}

          <button
            type="submit"
            className={`lg-botao lg-botao-secundario lg-botao-grande ${botaoClicado && !erro ? 'lg-botao-clicado' : ''}`}
            disabled={carregando}
          >
            {carregando ? "Carregando..." : "Login"}
          </button>
        </form>

        <div className="lg-opcoes-login">
          <Link to="/cadastro" className="lg-botao lg-botao-primario lg-botao-grande">
            Cadastro
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;