import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const cadastrar = async (email, senha) => {
    try {
      const novoUsuario = { email };
      setUser(novoUsuario);
      return novoUsuario;
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      throw new Error('Falha ao cadastrar');
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, cadastrar }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
