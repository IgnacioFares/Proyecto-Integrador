import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const decodeToken = (token) => {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (e) {
    console.error('Error decoding token:', e);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (token) {
      const decodedToken = decodeToken(token);
      setRoles(decodedToken?.roles || []);
    } else {
      setRoles([]);
    }
  }, [token]);

  const login = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    const decodedToken = decodeToken(token);
    setRoles(decodedToken?.roles || []);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setRoles([]);
  };

  return (
    <AuthContext.Provider value={{ token, roles, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export const useAuth = () => useContext(AuthContext);





