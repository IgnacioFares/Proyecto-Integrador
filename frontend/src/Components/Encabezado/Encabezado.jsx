export const Encabezado = () => {
  return (
    <section className="flex box items-center justify-center w-full h-screen bg-cover bg-[url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1893&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="w-5/6 md:w-2/3 lg:w-3/5 p-6">
          <h1 className="text-9xl md:text-7xl text-white">
            ¡Encuentra la cancha de fútbol perfecta!
          </h1>
        </div>

        <div className="w-5/6 md:w-2/3 lg:w-3/5 p-6">
          <p className="text-white">
            Explora nuestra amplia selección de canchas de fútbol y reserva la
            que más te guste. ¡Disfruta del deporte rey con tus amigos!
          </p>
        </div>

        <div className="w-5/6 md:w-2/3 lg:w-3/5 p-6 flex justify-center">
          <form className="bg-white bg-opacity-75 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 flex">
            <div className="mb-4 mr-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ciudad">
                Ciudad:
              </label>
              <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="ciudad" name="ciudad">
                <option value="ciudad1">Ciudad 1</option>
                <option value="ciudad2">Ciudad 2</option>
                <option value="ciudad3">Ciudad 3</option>
                {/* Otras opciones de ciudad */}
              </select>
            </div>
            <div className="mb-4 mr-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deporte">
                Deporte:
              </label>
              <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="deporte" name="deporte">
                <option value="futbol">Fútbol</option>
                <option value="baloncesto">Padel</option>
                <option value="tenis">Tenis</option>
                {/* Otras opciones de deporte */}
              </select>
            </div>
            <div className="mb-4 mr-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha">
                Fecha:
              </label>
              <input className="appearance-none block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="fecha" name="fecha" type="date"/>
            </div>
            <div className="mb-4 mr-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hora">
                Hora:
              </label>
              <input className="appearance-none block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="hora" name="hora" type="time"/>
            </div>
            <div className="flex items-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Buscar Cancha
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
