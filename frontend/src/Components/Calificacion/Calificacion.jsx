

const TituloDegradado = () => {
    return (
        <div className="bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text font-michroma text-4xl text-center">
            <div>Opiniones de los</div>
            <div>clientes</div>
        </div>
    );
};

const Tarjeta = ({ estrellas, comentario, fotoUsuario, nombreUsuario, bordeColor }) => {
    const defaultUserImage = '/images/icons8-usuario-24.png';
    const userImage = fotoUsuario ? fotoUsuario : defaultUserImage;

    return (
        <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
            <div className={`border-2 ${bordeColor === 'green' ? 'border-green-500' : 'border-blue-500'} rounded-lg p-4 h-full font-montserrat`}>
                <div className="flex items-center mb-4">
                    <div className={`mr-2 ${bordeColor === 'green' ? 'text-green-500' : 'text-blue-500'}`}>{estrellas}</div>
                    <div className="text-gray-500"></div>
                </div>
                <p className="mb-4">{comentario}</p>
                <div className="flex items-center">
                    <img src={userImage} alt="Foto de usuario" className="w-8 h-8 rounded-full mr-2" />
                    <p>{nombreUsuario}</p>
                </div>
            </div>
        </div>
    );
};

const TresTarjetas = () => {
    return (
        <div className="flex flex-col items-center mt-36 mb-44">
            <TituloDegradado />
            <div className="flex flex-wrap justify-center mt-16">
                <Tarjeta estrellas="⭐️⭐️⭐️⭐️" comentario="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare." fotoUsuario="" nombreUsuario="Usuario1" bordeColor="green" />
                <Tarjeta estrellas="⭐️⭐️⭐️" comentario="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare." fotoUsuario="" nombreUsuario="Usuario2" bordeColor="blue" />
                <Tarjeta estrellas="⭐️⭐️⭐️" comentario="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare." fotoUsuario="" nombreUsuario="Usuario3" bordeColor="green" />
            </div>
        </div>
    );
};

export default TresTarjetas;