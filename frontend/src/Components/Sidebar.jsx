import { Link } from 'react-router-dom';
import { routes } from '../routes/routes';
import logo from '../Assets/logo.png';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen w-64 flex flex-col">
      <div className="p-4">
        <img src={logo} alt="Logo" className="h-8 w-auto" />
      </div>
      <nav className="mt-4 flex-1">
        <ul>
          <li>
            <Link to={routes.productos} className="block py-2.5 px-4 hover:bg-gray-700">Productos</Link>
          </li>
          <li>
            <Link to={routes.permisos} className="block py-2.5 px-4 hover:bg-gray-700">Permisos</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

