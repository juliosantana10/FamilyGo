import React from 'react';
import '../App.css';

const CardFamiliar = ({ nome, status }) => {
  const letraInicial = nome?.charAt(0)?.toUpperCase() || '?';

  return (
    <div className="familiar-card animado">
      <div className="familiar-avatar">{letraInicial}</div>
      <div className="familiar-info">
        <div className="familiar-nome">{nome}</div>
        <div className="familiar-status">{status}</div>
      </div>
    </div>
  );
};

export default CardFamiliar;