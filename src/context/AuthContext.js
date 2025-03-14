import { createContext, useState, useContext, useEffect  } from "react";


const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {

  // const [authData, setAuthData] = useState({ access_token: null, user: null });

  const [authData, setAuthData] = useState(() => {
    const storedAuthData = sessionStorage.getItem("authData");
    return storedAuthData ? JSON.parse(storedAuthData) : { access_token: null, user: null };
  });

  useEffect(() => {
    sessionStorage.setItem("authData", JSON.stringify(authData));
  }, [authData]);


  const saveLoginData = (token, user) => {
    setAuthData({ access_token: token, user: user });
  };


  const saveLogoutData = () => {
    setAuthData({ access_token: null, user: null });
    sessionStorage.removeItem("authData");
  };

  return (
    <AuthContext.Provider value={{ authData, saveLoginData, saveLogoutData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
