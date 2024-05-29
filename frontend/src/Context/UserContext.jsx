import React, { createContext, useState } from 'react';

// Crear el contexto del usuario
export const UserContext = createContext();

// Proveedor del contexto del usuario
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Función para actualizar los datos del usuario
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Función para limpiar los datos del usuario (cerrar sesión)
  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;