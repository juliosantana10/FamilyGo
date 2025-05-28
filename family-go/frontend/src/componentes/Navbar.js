import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaHome, FaDice, FaUser, FaPlus, FaTrophy } from 'react-icons/fa';
import '../css/Navbar.css';

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <FaHome className="icon" />
          Painel
        </NavLink>

        <NavLink to="/detalhes-desafio/1" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <FaDice className="icon" />
          Desafio
        </NavLink>

        <NavLink to="/recompensa-desafio/1" className="nav-center-btn">
          <FaPlus className="plus-icon" />
        </NavLink>

        <NavLink to="/card-familiar" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <FaTrophy className="icon" />
          Galeria
        </NavLink>

        <NavLink to="/perfil" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <FaUser className="icon" />
          Perfil
        </NavLink>
      </nav>

      <Outlet />
    </>
  );
}

export default Navbar;