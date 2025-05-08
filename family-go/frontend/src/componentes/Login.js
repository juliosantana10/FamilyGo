import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contextos/AuthContext.js';
import '../css/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setsenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !senha) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }
    
    try {
      setErro('');
      setCarregando(true);
      
      await login(email, senha);
      
      const usuarioCadastrado = localStorage.getItem('familyGoUsuarioCadastrado');
      
      if (usuarioCadastrado === 'completo') {
        navigate('/dashboard');
      } else {
        navigate('/escolha-mascote');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErro('Falha ao fazer login. Verifique seu email e senha.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="tela-cheia tela-login">
      <div className="logo-container">
        <img src="/assets/images/logo.svg" alt="Family Go" className="logo" />
      </div>
      
      <div className="login-container">
        <form onSubmit={handleSubmit} className="formulario-login">
          <div className="campo-form">
            <label htmlFor="email" className="rotulo">Email</label>
            <input
              type="email"
              id="email"
              className="entrada"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="campo-form">
            <label htmlFor="senha" className="rotulo">Password</label>
            <div className="senha-container">
              <input
                type={mostrarSenha ? "text" : "password"}
                id="senha"
                className="entrada"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setsenha(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="toggle-senha" 
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? "Ocultar" : "Exibir"}
              </button>
            </div>
          </div>
          
          <div className="recuperar-senha">
            <Link to="/recuperar-senha" className="link-recuperar">Esqueceu senha?</Link>
          </div>
          
          {erro && <p className="mensagem-erro">{erro}</p>}
          
          <button 
            type="submit" 
            className="botao botao-secundario botao-grande"
            disabled={carregando}
          >
            {carregando ? "Carregando..." : "Login"}
          </button>
        </form>
        
        <div className="opcoes-login">
          <Link to="/cadastro" className="botao botao-primario botao-grande">
            Cadastro
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;