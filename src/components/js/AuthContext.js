import React, {createContext, useContext, useEffect, useState} from 'react';
import LocalStorageService from "../service/LocalStorageService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
      !!LocalStorageService.get("access_token")
  );

  const login = () => {
    setIsAuthenticated(true);
    // Сохранить состояние в localStorage при успешной аутентификации
    LocalStorageService.save("isAuthenticated", true);
  };
  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    // Удалить сохраненное состояние из localStorage при выходе
    LocalStorageService.clear("isAuthenticated");
  };

  useEffect(() => {
    const storedAuthState = LocalStorageService.get("isAuthenticated");
    if (storedAuthState !== null) {
      setIsAuthenticated(storedAuthState);
    }
  }, []);


  return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
