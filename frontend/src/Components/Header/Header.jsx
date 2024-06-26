import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { slide as Menu } from "react-burger-menu";
import { routes } from "../../routes/routes";
import "./Header.css"; // Asegúrate de tener los estilos necesarios para el menú de hamburguesa

const Header = () => {
  const { token, roles, logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const getInitials = (nombre, apellido) => {
    const nombreInitial = nombre ? nombre.charAt(0).toUpperCase() : '';
    const apellidoInitial = apellido ? apellido.charAt(0).toUpperCase() : '';
    return `${nombreInitial}${apellidoInitial}`;
  };

  const handleStateChange = (state) => {
    setIsOpen(state.isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full shadow-md h-16 bg-white text-green-500 flex items-center justify-between z-10">
      <div className="flex items-center">
        <Link to={routes.home}>
          <img src={"images/logosolo1.png"} alt="Logo" className="h-8 w-150 m-4" />
        </Link>
      </div>

      <div className="header-links hidden md:flex items-center gap-6">
        <Link to={routes.productList} className="hover:text-green-700 transition duration-300 ease-in-out">
          Reservar
        </Link>
        <Link to={routes.about} className="hover:text-green-700 transition duration-300 ease-in-out">
          Sobre Nosotros
        </Link>
        <Link to="/favoritos" className="hover:text-green-700 transition duration-300 ease-in-out">
          Favoritos
        </Link>
        {(roles.includes('ROLE_ADMIN') || roles.includes('ROLE_USER')) && (
          <Link to="/MisReservas" className="hover:text-green-700 transition duration-300 ease-in-out">
            Mis Reservas
          </Link>
        )}
      </div>

      <Menu 
        right 
        isOpen={isOpen} 
        onStateChange={(state) => handleStateChange(state)}
      >
        <Link to={routes.productList} onClick={closeMenu} className="menu-item">
          Reservar
        </Link>
        <Link to={routes.about} onClick={closeMenu} className="menu-item">
          Sobre Nosotros
        </Link>
        <Link to="/favoritos" onClick={closeMenu} className="menu-item">
          Favoritos
        </Link>
        {(roles.includes('ROLE_ADMIN') || roles.includes('ROLE_USER')) && (
          <Link to="/MisReservas" onClick={closeMenu} className="menu-item">
            Mis Reservas
          </Link>
        )}
        {!token ? (
          <>
            <Link to={routes.Login} onClick={closeMenu} className="menu-item">
              Iniciar Sesión
            </Link>
            <Link to={routes.Register} onClick={closeMenu} className="menu-item">
              Crear Cuenta
            </Link>
          </>
        ) : (
          <>
            {roles.includes('ROLE_ADMIN') && (
              <Link to={routes.productos} onClick={closeMenu} className="menu-item">
                Panel de Administración
              </Link>
            )}
            <button onClick={() => { logout(); closeMenu(); }} className="menu-item">
              Cerrar Sesión
            </button>
          </>
        )}
      </Menu>

      <div className="menu-items hidden md:flex items-center gap-5 mr-10">
        {!token ? (
          <>
            <Link to={routes.Login} className="bg-white text-green-500 py-2 px-4 rounded-2xl border border-green-500 hover:bg-green-500 hover:text-white">
              Iniciar Sesion
            </Link>
            <Link to={routes.Register} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-2xl border border-text-green-500">
              Crear Cuenta
            </Link>
          </>
        ) : (
          <>
            {roles.includes('ROLE_ADMIN') && (
              <Link to={routes.productos} className="bg-green-400 hover:bg-green-500 text-white py-2 px-4 rounded-2xl border border-text-green-500">
                Panel de Administración
              </Link>
            )}
            <div className="flex items-center gap-3">
              <div className="user-initials-circle">
                {getInitials(user?.nombre, user?.apellido)}
              </div>
              <button onClick={logout} className="bg-white text-green-500 py-2 px-4 rounded-2xl border border-green-500 hover:bg-green-500 hover:text-white">
                Cerrar Sesion
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
