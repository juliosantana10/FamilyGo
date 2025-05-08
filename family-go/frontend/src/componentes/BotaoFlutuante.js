import React from 'react';
import '../App.css';

const BotaoFlutuante = ({ onClick }) => {
  return (
    <button className="fab" onClick={onClick}>
      <i className="fas fa-plus"></i> {/*julio coloca o icone do botão */}
    </button>
  );
};

export default BotaoFlutuante;