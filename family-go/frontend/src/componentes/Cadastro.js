import React, { useState } from 'react';
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
  
  const { cadastrar } = useAuth();
  const navigate = useNavigate();

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
      
      await cadastrar(email, senha);
      
      navigate('/escolha-mascote');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setErro('Falha ao criar conta. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="tela-cheia tela-cadastro">
      <div className="logo-container"> 
      <img src={logo} alt="Logo da aplicação" className="logo" />
      </div>
      
      <div className="cadastro-container">
        <form onSubmit={handleSubmit} className="formulario-cadastro">
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
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="campo-form">
            <label htmlFor="confirmarSenha" className="rotulo">Password</label>
            <div className="senha-container">
              <input
                type={mostrarSenha ? "text" : "password"}
                id="confirmarSenha"
                className="entrada"
                placeholder="Confirme a senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
              />
              <div className="opcao-mostrar">
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
          
          {erro && <p className="mensagem-erro">{erro}</p>}
          
          <button 
            type="submit" 
            className="botao botao-secundario botao-grande"
            disabled={carregando}
          >
            {carregando ? "Carregando..." : "Continue"}
          </button>
        </form>
        
        <div className="opcoes-cadastro">
          <Link to="/login" className="botao botao-primario botao-grande">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;