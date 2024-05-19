import { Link } from "react-router-dom";
import { routes } from "../routes/routes";
import logo from "../Assets/logo.png";


const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen w-64 p-4">
      <div className="flex items-center">
      <Link to={routes.home}>
        <img src={logo} alt="Logo" className="h-8 w-150 m-4" />
        </Link>
      </div>
      <nav>
        <a href="#" className="block py-2 px-4 hover:bg-gray-700">Inicio</a>
        <a href="#" className="block py-2 px-4 hover:bg-gray-700">Clientes</a>
        <a href="#" className="block py-2 px-4 hover:bg-gray-700">Reservas</a>
        <a href="#" className="block py-2 px-4 hover:bg-gray-700">Productos</a>

      </nav>
    </div>
  );
};

export default Sidebar;
