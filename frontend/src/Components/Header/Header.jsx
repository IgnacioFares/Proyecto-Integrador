import { useState } from "react";
import { routes } from "../../routes/routes";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Bars3Icon, XMarkIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const { token, roles, logout, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const getInitials = (nombre, apellido) => {
    const nombreInitial = nombre ? nombre.charAt(0).toUpperCase() : '';
    const apellidoInitial = apellido ? apellido.charAt(0).toUpperCase() : '';
    return `${nombreInitial}${apellidoInitial}`;
  };

  return (
    <header className="fixed top-0 left-0 w-full shadow-md h-16 bg-white text-green-500 flex items-center justify-between z-10 px-4 sm:px-8">
      <div className="flex items-center">
        <Link to={routes.home}>
          <img src={"images/logosolo1.png"} alt="Logo" className="h-8 w-auto m-4" />
        </Link>
      </div>

      <nav className="hidden lg:flex">
        <div className="flex items-center gap-6">
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
      </nav>

      <div className="hidden lg:flex items-center gap-5 mr-2 sm:mr-10">
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
              <div className="user-initials-circle bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center">
                {getInitials(user?.nombre, user?.apellido)}
              </div>
              <button onClick={logout} className="bg-white text-green-500 py-2 px-4 rounded-2xl border border-green-500 hover:bg-green-500 hover:text-white">
                Cerrar Sesion
              </button>
            </div>
          </>
        )}
      </div>

      <div className="lg:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6 text-green-500" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-green-500" />
          )}
        </button>
      </div>

      <div className={`lg:hidden fixed inset-0 bg-white transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={() => setMenuOpen(false)} className="focus:outline-none">
            <ChevronLeftIcon className="h-6 w-6 text-green-500" />
          </button>
        </div>
        <div className="flex flex-col items-center space-y-6 p-4">
          <Link to={routes.productList} className="text-green-500 hover:text-green-700 text-lg" onClick={() => setMenuOpen(false)}>
            Reservar
          </Link>
          <Link to={routes.about} className="text-green-500 hover:text-green-700 text-lg" onClick={() => setMenuOpen(false)}>
            Sobre Nosotros
          </Link>
          <Link to="/favoritos" className="text-green-500 hover:text-green-700 text-lg" onClick={() => setMenuOpen(false)}>
            Favoritos
          </Link>
          {(roles.includes('ROLE_ADMIN') || roles.includes('ROLE_USER')) && (
            <Link to="/MisReservas" className="text-green-500 hover:text-green-700 text-lg" onClick={() => setMenuOpen(false)}>
              Mis Reservas
            </Link>
          )}
          {!token ? (
            <>
              <Link to={routes.Login} className="bg-white text-green-500 py-2 px-4 rounded-2xl border border-green-500 hover:bg-green-500 hover:text-white" onClick={() => setMenuOpen(false)}>
                Iniciar Sesion
              </Link>
              <Link to={routes.Register} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-2xl border border-text-green-500" onClick={() => setMenuOpen(false)}>
                Crear Cuenta
              </Link>
            </>
          ) : (
            <>
              {roles.includes('ROLE_ADMIN') && (
                <Link to={routes.productos} className="bg-green-400 hover:bg-green-500 text-white py-2 px-4 rounded-2xl border border-text-green-500" onClick={() => setMenuOpen(false)}>
                  Panel de Administración
                </Link>
              )}
              <div className="flex items-center gap-3">
                <div className="user-initials-circle bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center">
                  {getInitials(user?.nombre, user?.apellido)}
                </div>
                <button onClick={() => { logout(); setMenuOpen(false); }} className="bg-white text-green-500 py-2 px-4 rounded-2xl border border-green-500 hover:bg-green-500 hover:text-white" onClick={() => setMenuOpen(false)}>
                  Cerrar Sesion
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;