import { Link } from 'react-router-dom';
import { routes } from '../routes/routes';

const Navbar = () => {
  return (
    <nav>
      <div className="flex items-center gap-6 ">
        <Link to={routes.reserva} className="hover:text-green-700 transition duration-300 ease-in-out">Reservar</Link>
        <Link to={routes.about} className="hover:text-green-700 transition duration-300 ease-in-out">Sobre Nosotros</Link>
      </div>
    </nav>
  );
};

export default Navbar;