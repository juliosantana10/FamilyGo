import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const BarraNavegacao = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-item">Home</Link>
      <Link to="/login" className="navbar-item">Login</Link>
      <Link to="/cadastro" className="navbar-item">Cadastro</Link>
      <Link to="/dashboard" className="navbar-item">Dashboard</Link>
    </nav>
  );
};

export default BarraNavegacao;