import { createContext, useState } from 'react';

export const DesafiosContext = createContext();

export const DesafiosProvider = ({ children }) => {
  const [desafios, setDesafios] = useState([]);

  return (
    <DesafiosContext.Provider value={{ desafios, setDesafios }}>
      {children}
    </DesafiosContext.Provider>
  );
};
