import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
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
import { AuthProvider } from './contextos/AuthContext.js';
import { FamiliasProvider } from './contextos/FamiliasContext.js';
import { DesafiosProvider } from './contextos/DesafiosContext.js';

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
      <li><Link to="/roleta-desafios">Roleta Desafios</Link></li>
      <li><Link to="/detalhes-desafio/1">Detalhes Desafio</Link></li>
      <li><Link to="/recompensa-desafio/1">Recompensa Desafio</Link></li>
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
    <AuthProvider>
      <FamiliasProvider>
        <DesafiosProvider>
          <Router>
            <div className="app-container">
              <Routes>
                <Route path="/" element={
                  <>
                    <TelaInicial />
                    <MenuDesenvolvimento />
                  </>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                
                {/* Rotas protegidas */}
                <Route path="/escolha-mascote" element={<RotaProtegida><EscolhaMascote /></RotaProtegida>} />
                <Route path="/selecionar-familiares" element={<RotaProtegida><SelecionarFamiliares /></RotaProtegida>} />
                <Route path="/dashboard" element={<RotaProtegida><Dashboard /></RotaProtegida>} />
                <Route path="/roleta-desafios" element={<RotaProtegida><RoletaDesafios /></RotaProtegida>} />
                <Route path="/detalhes-desafio/:id" element={<RotaProtegida><DetalhesDesafio /></RotaProtegida>} />
                <Route path="/recompensa-desafio/:id" element={<RotaProtegida><RecompensaDesafio /></RotaProtegida>} />
              </Routes>
            </div>
          </Router>
        </DesafiosProvider>
      </FamiliasProvider>
    </AuthProvider>
  );
}

export default App;
