import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token'));

    useEffect(() => {
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
    }, [token]);

    const login = (newToken) => {
    setToken(newToken);
    };

    const logout = () => {
    setToken(null);
    };

    return (
    <AuthContext.Provider value={{ token, login, logout }}>
        {children}
    </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
