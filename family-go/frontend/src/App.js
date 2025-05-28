import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

import TelaInicial from './componentes/TelaInicial';
import Login from './componentes/Login';
import Cadastro from './componentes/Cadastro';
import EscolhaMascote from './componentes/EscolhaMascote';
import SelecionarFamiliares from './componentes/SelecionarFamiliares';
import Dashboard from './componentes/Dashboard';
import RoletaDesafios from './componentes/RoletaDesafios';
import DetalhesDesafio from './componentes/DetalhesDesafio';
import RecompensaDesafio from './componentes/RecompensaDesafio';
import EsqueceuSenha from './componentes/EsqueceuSenha';
import Perfil from './componentes/Perfil';
import Navbar from './componentes/Navbar';
import CardFamiliar from './componentes/CardFamiliar';
import PainelUsuario from './componentes/PainelUsuario';
import BarraProgresso from './componentes/BarraProgresso';


import { AuthProvider } from './contextos/AuthContext.js';
import { FamiliasProvider } from './contextos/FamiliasContext.js';
import { DesafiosProvider } from './contextos/DesafiosContext.js';
import { UserProvider } from './contextos/UserContext';

const RotaProtegida = ({ children }) => children;

const MenuDesenvolvimento = () => (
  <div className="menu-desenvolvimento">
    <h2>Menu de Desenvolvimento</h2>
    <ul>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/cadastro">Cadastro</Link></li>
      <li><Link to="/escolha-mascote">Escolha Mascote</Link></li>
      <li><Link to="/selecionar-familiares">Selecionar Familiares</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/roleta-desafios/1">Roleta Desafios</Link></li>
      <li><Link to="/detalhes-desafio/1">Detalhes Desafio</Link></li>
      <li><Link to="/recompensa-desafio/1">Recompensa Desafio</Link></li>
      <li><Link to="/esqueceu-senha">Esqueceu Senha</Link></li>
      <li><Link to="/card-familiar">CardFamiliar</Link></li>
      <li><Link to="/painel-usuario">PainelUsuario</Link></li>
      <li><Link to="/barra-progresso">BarraProgresso</Link></li>

    </ul>
  </div>
);

function App() {
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCarregando(false);
    }, 1500);
  }, []);

  if (carregando) {
    return (
      <div className="tela-carregamento">
        <img src="/logo.svg" alt="Family Go Logo" className="logo-carregamento" />
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <UserProvider>
      <AuthProvider>
        <FamiliasProvider>
          <DesafiosProvider>
            <Router>
              <div className="app-container">
                <Routes>
                  {/* Telas sem Navbar */}
                  <Route path="/" element={
                    <>
                      <TelaInicial />
                      <MenuDesenvolvimento />
                    </>
                  } />
                  <Route path="/login" element={<Login />} />
                  <Route path="/cadastro" element={<Cadastro />} />
                  <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />

                  {/* Telas com Navbar */}
                  <Route element={<Navbar />}>
                    <Route path="/dashboard" element={<RotaProtegida><Dashboard /></RotaProtegida>} />
                    <Route path="/perfil" element={<RotaProtegida><Perfil /></RotaProtegida>} />
                    <Route path="/detalhes-desafio/:id" element={<RotaProtegida><DetalhesDesafio /></RotaProtegida>} />
                    <Route path="/card-familiar" element={<RotaProtegida><CardFamiliar /></RotaProtegida>} />
                    <Route path="/roleta-desafios/:id" element={<RotaProtegida><RoletaDesafios /></RotaProtegida>} />
                    <Route path="/recompensa-desafio/:id" element={<RotaProtegida><RecompensaDesafio /></RotaProtegida>} />
                  </Route>

                  {/* Telas fora da Navbar, mas protegidas */}
                  <Route path="/escolha-mascote" element={<RotaProtegida><EscolhaMascote /></RotaProtegida>} />
                  <Route path="/selecionar-familiares" element={<RotaProtegida><SelecionarFamiliares /></RotaProtegida>} />
                  <Route path="/painel-usuario" element={<RotaProtegida><PainelUsuario /></RotaProtegida>} />
                  <Route path="/barra-progresso" element={<RotaProtegida><PainelUsuario /></RotaProtegida>} />

                </Routes>
              </div>
            </Router>
          </DesafiosProvider>
        </FamiliasProvider>
      </AuthProvider>
    </UserProvider>
  );
}

export default App;
