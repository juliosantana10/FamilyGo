import { createContext, useContext, useState } from 'react';

const FamiliasContext = createContext();

export const FamiliasProvider = ({ children }) => {
  const [familias, setFamilias] = useState([]);

  const adicionarFamilia = (familia) => {
    setFamilias((prevFamilias) => [...prevFamilias, familia]);
  };

  const removerFamilia = (id) => {
    setFamilias((prevFamilias) => prevFamilias.filter(familia => familia.id !== id));
  };

  const editarFamilia = (id, novosDados) => {
    setFamilias((prevFamilias) =>
      prevFamilias.map(familia =>
        familia.id === id ? { ...familia, ...novosDados } : familia
      )
    );
  };

  const limparFamilias = () => {
    setFamilias([]);
  };

  return (
    <FamiliasContext.Provider value={{ familias, setFamilias, adicionarFamilia, removerFamilia, editarFamilia, limparFamilias }}>
      {children}
    </FamiliasContext.Provider>
  );
};

export const useFamilias = () => {
  return useContext(FamiliasContext);
};
