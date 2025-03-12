import { createContext, useState, useContext } from "react";

// Crear el contexto
const AuthContext = createContext(null);

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({ access_token: null, user: null });

  // Guardar datos de autenticación
  const saveLoginData = (token, user) => {
    setAuthData({ access_token: token, user });
  };

  // Cerrar sesión
  const saveLogoutData = () => {
    setAuthData({ access_token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ authData, saveLoginData, saveLogoutData }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder al contexto
export const useAuth = () => useContext(AuthContext);
