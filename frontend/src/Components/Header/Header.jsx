import { routes } from "../../routes/routes";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full shadow-md h-16 bg-white text-green-500 flex items-center justify-between z-10">
      <div className="flex items-center">
        <Link to={routes.home}>
          <img src={"../../public/images/logosolo1.png"} alt="Logo" className="h-8 w-150 m-4" />
        </Link>
      </div>

      <nav>
        <div className="flex items-center gap-6 ">
          <Link
            to={routes.reserva}
            className="hover:text-green-700 transition duration-300 ease-in-out"
          >
            Reservar
          </Link>
          <Link
            to={routes.about}
            className="hover:text-green-700 transition duration-300 ease-in-out"
          >
            Sobre Nosotros
          </Link>
        </div>
      </nav>

      <div className="flex items-center gap-5 mr-10">
        <button className="bg-white  text-green-500 py-2 px-4 rounded-2xl border border-green-500">
          Iniciar Sesion
        </button>
        <button className="bg-green-400 hover:bg-green-500 text-white py-2 px-4 rounded-2xl border border-text-green-500">
          Crear Cuenta
        </button>
      </div>
    </header>
  );
};

export default Header;
