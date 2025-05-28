import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState({
    nome: 'Julio César',
    email: 'julio@example.com',
    mascote: 'urso',
    nivel: 1,
    progresso: 0,
  });

  const atualizarProgresso = (pontos) => {
    setUsuario(prev => {
      const novoProgresso = prev.progresso + pontos;
      const nivelUp = novoProgresso >= 100;
      return {
        ...prev,
        progresso: nivelUp ? novoProgresso - 100 : novoProgresso,
        nivel: nivelUp ? prev.nivel + 1 : prev.nivel,
      };
    });
  };

  return (
    <UserContext.Provider value={{ usuario, atualizarProgresso }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsuario = () => useContext(UserContext);
