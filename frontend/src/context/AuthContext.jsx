import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState({ nombre: '', apellido: '' });

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        console.log('Decoded Token:', decodedToken);
        setRoles(decodedToken.roles || []);
        setUser({ nombre: decodedToken.nombre, apellido: decodedToken.apellido });
      } catch (e) {
        console.error('Error decoding token:', e);
      }
    } else {
      setRoles([]);
      setUser({ nombre: '', apellido: '' });
    }
  }, [token]);

  const login = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      console.log('Decoded Token on login:', decodedToken);
      setRoles(decodedToken.roles || []);
      setUser({ nombre: decodedToken.nombre, apellido: decodedToken.apellido });
    } catch (e) {
      console.error('Error decoding token:', e);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setRoles([]);
    setUser({ nombre: '', apellido: '' });
  };

  return (
    <AuthContext.Provider value={{ token, roles, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export const useAuth = () => useContext(AuthContext);
