// import Api from "../Api/Api" 
// como ejemplo le pega a la api de productos
export const CardContainer = () => {
  // console.log(Api("productos"));
  // descomentar si se quiere ver si se conecta bien
    return (
      <>
        <div className="">
          <h3 className="flex justify-center text-6xl bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text font-michroma text-4xl md:text-5xl text-left mb-1 py-8">Encuentra tu cancha ideal</h3>
          <p className="flex justify-center">Explora nuestras diferentes locaciones</p>
        </div>
  
        <div className="flex justify-center mt-28 mx-4">
          <Card
            imageUrl="/images/HUHUIHAS.png"
            name="Gran 7"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
          />
          <Card
            imageUrl="/images/huqwjiod.png"
            name="Don Balon"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
          />
          <Card
            imageUrl="/images/Placeholder Image.png"
            name="Futbol Noble"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
          />
        </div>
      </>
    );
  };
  
  const Card = ({ imageUrl, name, description }) => {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg mx-4">
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
  