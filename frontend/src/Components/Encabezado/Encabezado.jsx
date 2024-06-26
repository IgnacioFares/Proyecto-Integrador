import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";
import SearchBar from "../Buscador/SearchBar";

export const Encabezado = () => {
  return (
    <section className="flex box items-center justify-center w-full h-screen bg-cover bg-[url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1893&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="w-5/6 md:w-2/3 lg:w-3/5 p-6">
          <h1 className="text-9xl md:text-7xl text-white" style={{ textShadow: '3px 3px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000' }}>
            ¡Encuentra la cancha de fútbol perfecta!
          </h1>
        </div>

        <div className="w-5/6 md:w-2/3 lg:w-3/5 p-6">
          <p className="text-white">
            Explora nuestra amplia selección de canchas de fútbol y reserva la
            que más te guste. ¡Disfruta del deporte rey con tus amigos!
          </p>
        </div>

        <Link to={routes.productList} className="bg-gradient-to-r from-blue-500 to-green-400 text-white py-3 px-6 text-lg rounded-md shadow-lg hover:shadow-xl transform transition-transform duration-300 ease-in-out hover:scale-110 hover:opacity-80">Reservar Cancha</Link>

        <SearchBar />
      </div>
      
    </section>
  );
};
