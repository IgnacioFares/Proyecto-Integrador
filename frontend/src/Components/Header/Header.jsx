import { routes } from "../../routes/routes";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { token, roles, logout, user } = useAuth();

  const getInitials = (nombre, apellido) => {
    const nombreInitial = nombre ? nombre.charAt(0).toUpperCase() : '';
    const apellidoInitial = apellido ? apellido.charAt(0).toUpperCase() : '';
    return `${nombreInitial}${apellidoInitial}`;
  };

  console.log('User:', user);

  return (
    <header className="fixed top-0 left-0 w-full shadow-md h-16 bg-white text-green-500 flex items-center justify-between z-10">
      <div className="flex items-center">
        <Link to={routes.home}>
          <img src={"images/logosolo1.png"} alt="Logo" className="h-8 w-150 m-4" />
        </Link>
      </div>

      <nav>
        <div className="flex items-center gap-6">
          <Link to={routes.productList} className="hover:text-green-700 transition duration-300 ease-in-out">
            Reservar
          </Link>
          <Link to={routes.about} className="hover:text-green-700 transition duration-300 ease-in-out">
            Sobre Nosotros
          </Link>
          <Link
            to="/favoritos"
            className="hover:text-green-700 transition duration-300 ease-in-out"
          >
            Favoritos
          </Link>
          {(roles.includes('ROLE_ADMIN') || roles.includes('ROLE_USER')) && (
            <Link to="/MisReservas" className="hover:text-green-700 transition duration-300 ease-in-out">
              Mis Reservas
            </Link>
          )}
        </div>
      </nav>

      <div className="flex items-center gap-5 mr-10">
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