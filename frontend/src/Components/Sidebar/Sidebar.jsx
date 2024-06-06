import { Link } from 'react-router-dom';
import { routes } from '../../routes/routes';
import logo from '../../../public/images/logosolo1.svg';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen w-64 flex flex-col">
      <div className="p-4 flex items-center">
        <Link to={routes.home}>
          <img src={logo} alt="Logo" className="h-8 mr-2" />
        </Link>
      </div>
      <nav className="mt-4 flex flex-col">

        <Link to={routes.productos} className="py-2 px-4 hover:bg-gray-700">
          Productos
        </Link>
        <Link to={routes.permisos} className="py-2 px-4 hover:bg-gray-700">
          Permisos
        </Link>
        <Link to={routes.categorias} className="py-2 px-4 hover:bg-gray-700">
          Categorías
        </Link>
        <Link to={routes.caracteristicas} className="py-2 px-4 hover:bg-gray-700">
          Caracteristicas
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;