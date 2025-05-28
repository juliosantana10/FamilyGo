import React, { useState, useEffect } from 'react';
import PainelUsuario from '../componentes/PainelUsuario';
import '../css/CardFamiliar.css';

const adicionarFoto = (fotosAdicionadas, indice) => {
  const novasFotos = [...fotosAdicionadas];
  novasFotos[indice] = `https://picsum.photos/400/400?random=${Date.now()}`;
  return novasFotos;
};

const CardFamiliar = () => {
  const [fotosAdicionadas, setFotosAdicionadas] = useState([
    'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=400&fit=crop',
    null,
    'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?w=400&h=400&fit=crop',
    null,
    null,
    'https://images.unsplash.com/photo-1484712401471-05c7215830eb?w=400&h=400&fit=crop',
  ]);

  const [usuario, setUsuario] = useState({
    nome: 'Jogador',
    email: '',
    mascote: 'urso',
    nivel: 3,
    progresso: 50,
  });

  const [conquistaIndice, setConquistaIndice] = useState(null);

  useEffect(() => {
    const mascoteSalvo = localStorage.getItem('familyGoMascote');
    const nomeSalvo = localStorage.getItem('familyGoNome');

    setUsuario(prev => ({
      ...prev,
      mascote: mascoteSalvo || prev.mascote,
      nome: nomeSalvo || prev.nome,
    }));
  }, []);

  const handleAdicionarFoto = (indice) => {
    if (fotosAdicionadas[indice]) return;

    const novasFotos = adicionarFoto(fotosAdicionadas, indice);
    setFotosAdicionadas(novasFotos);

    // Mostra animação de conquista só no card clicado
    setConquistaIndice(indice);
    setTimeout(() => setConquistaIndice(null), 1500);
  };

  return (
    <div className="dashboard-container">
      <PainelUsuario
        nome={usuario.nome}
        email={usuario.email}
        mascote={usuario.mascote}
        nivel={usuario.nivel}
        progresso={usuario.progresso}
      />

      <main className="family-members">
        <h2 className="section-title">📚 Álbum de Recordações</h2>
        <p className="section-description">
          Complete os desafios para coletar momentos especiais com sua família!
          Clique em uma figurinha pendente para adicionar uma foto (simulação).
        </p>
        <div className="album-familiar">
          {fotosAdicionadas.map((foto, index) => (
            <div
              key={index}
              className={`card-familiar ${foto ? 'preenchida' : 'pendente'} ${conquistaIndice === index ? 'conquista' : ''}`}
              onClick={() => handleAdicionarFoto(index)}
              style={{ cursor: foto ? 'default' : 'pointer' }}
              title={foto ? `Foto ${index + 1} adicionada!` : 'Clique para adicionar uma foto'}
            >
              <img
                src={
                  foto ||
                  'https://cdn-icons-png.flaticon.com/512/616/616408.png'
                }
                alt={`Foto ${index + 1}`}
                className="foto"
              />
            </div>
          ))}
        </div>
      </main>

      <button className="floating-button">+</button>

      <div className="decoration-dots decoration-dots-1"></div>
      <div className="decoration-dots decoration-dots-2"></div>
    </div>
  );
};

export default CardFamiliar;
