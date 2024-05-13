import React from 'react';

const TituloDegradado = () => {
    return (
        <div className="bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text font-michroma text-4xl text-center">
            <div>Opiniones de los</div>
            <div>Clientes</div>
        </div>
    );
};

const Tarjeta = ({ estrellas, comentario, fotoUsuario, nombreUsuario, bordeColor }) => {
    return (
        <div className="w-64 mx-2">
            <div className={`border-2 ${bordeColor === 'green' ? 'border-green-500' : 'border-blue-500'} rounded-lg p-4 h-full font-montserrat`}>
                <div className="flex items-center mb-4">
                    <div className={`mr-2 ${bordeColor === 'green' ? 'text-green-500' : 'text-blue-500'}`}>{estrellas}</div>
                    <div className="text-gray-500">Calificación</div>
                </div>
                <p className="mb-4">{comentario}</p>
                <div className="flex items-center">
                    <img src={fotoUsuario} alt="Foto de usuario" className="w-8 h-8 rounded-full mr-2" />
                    <p>{nombreUsuario}</p>
                </div>
            </div>
        </div>
    );
};

const TresTarjetas = () => {
    return (
        <div className="flex flex-col items-center">
            <TituloDegradado />
            <div className="flex justify-center">
                <Tarjeta estrellas="⭐️⭐️⭐️⭐️" comentario="Excelente servicio, muy recomendado." fotoUsuario="/images/user1.jpg" nombreUsuario="Usuario1" bordeColor="green" />
                <Tarjeta estrellas="⭐️⭐️⭐️" comentario="Buen servicio, aunque podría mejorar en algunos aspectos." fotoUsuario="/images/user2.jpg" nombreUsuario="Usuario2" bordeColor="blue" />
                <Tarjeta estrellas="⭐️⭐️⭐️" comentario="Servicio aceptable, pero podría ser mejor." fotoUsuario="/images/user3.jpg" nombreUsuario="Usuario3" bordeColor="green" />
            </div>
        </div>
    );
};

export default TresTarjetas;
