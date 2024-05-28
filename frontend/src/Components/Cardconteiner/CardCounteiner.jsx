import Api from "../Api/Api" 
export const CardContainer = () => {
    return (
      <>
        <div className="">
          <h3 className="flex justify-center text-6xl bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text font-michroma text-4xl md:text-5xl text-left mb-1 py-8">Encuentra tu cancha ideal</h3>
          <p className="flex justify-center">Explora nuestras diferentes locaciones</p>
        </div>
  
        <div className="flex justify-center mt-28 mx-4">
          {Api("productos").map(item => (
            <Card
            imageUrl="/images/HUHUIHAS.png"
            name={item.nombre}
            description={item.descripcion}
            key={item.id}
            id={item.id}
          />
          ))}
        </div>
      </>
    );
  };
  
  const Card = ({ imageUrl, name, description, id }) => {
    return (
      <div id={id} className="max-w-sm rounded overflow-hidden shadow-lg mx-4">
        <img className="w-full" src={imageUrl} alt={name} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Reservar
          </button>
        </div>
      </div>
    );
  };
  