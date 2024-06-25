import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";
import SearchBar from "../Buscador/SearchBar";

export const Encabezado = () => {
  return (
    <section className="flex items-center justify-center w-full h-screen bg-cover bg-[url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1893&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
      <div className="flex flex-col items-center justify-center text-center px-4 md:px-6 lg:px-8">
        <div className="w-full md:w-4/5 lg:w-3/5 p-2 md:p-4 lg:p-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl text-white font-bold leading-tight" style={{ textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000' }}>
            ¡Encuentra la cancha de fútbol perfecta!
          </h1>
        </div>

        <div className="w-full md:w-4/5 lg:w-3/5 p-2 md:p-4 lg:p-6">
          <p className="text-xs md:text-sm lg:text-base text-white">
            Explora nuestra amplia selección de canchas de fútbol y reserva la
            que más te guste. ¡Disfruta del deporte rey con tus amigos!
          </p>
        </div>

        <Link 
          to={routes.productList} 
          className="bg-gradient-to-r from-blue-500 to-green-400 text-white py-2 px-4 md:py-2 md:px-5 text-xs md:text-sm lg:text-base rounded-md shadow-lg hover:shadow-xl transform transition-transform duration-300 ease-in-out hover:scale-110 hover:opacity-80 mt-4"
        >
          Reservar Cancha
        </Link>

        <div className="w-full md:w-4/5 lg:w-3/5 mt-4">
          <SearchBar />
        </div>
      </div>
    </section>
  );
};
