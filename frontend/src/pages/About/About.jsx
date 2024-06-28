import React from 'react';

const About = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-400 min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">Sobre Nosotros</h1>
        <p className="text-gray-700 mb-4">
          Bienvenidos a <span className="font-semibold text-blue-500">EASYSCORE</span>, su plataforma de confianza para el alquiler de canchas de fútbol. Nuestra misión es proporcionar una solución integral y eficiente para la reserva de canchas, adaptada a las necesidades tanto de jugadores aficionados como de equipos profesionales.
        </p>
        <p className="text-gray-700 mb-4">
          En <span className="font-semibold text-blue-500">EASYSCORE</span>, hemos desarrollado una aplicación intuitiva y fácil de usar que permite a los usuarios buscar y reservar canchas de manera rápida y segura. Con solo unos clics, puede verificar la disponibilidad y asegurar su reserva, todo desde la comodidad de su hogar o mientras está en movimiento.
        </p>
        <p className="text-gray-700 mb-4">
          Nos enorgullecemos de nuestro compromiso con la calidad y la satisfacción del cliente. Todas nuestras canchas asociadas están cuidadosamente seleccionadas y mantenidas para garantizar una experiencia de juego óptima. Además, nuestro equipo de soporte está siempre disponible para ayudarle con cualquier consulta o necesidad especial que pueda tener.
        </p>
        <p className="text-gray-700 mb-4">
          Gracias por elegir <span className="font-semibold text-blue-500">EASYSCORE</span> como su socio en el deporte. Esperamos seguir apoyando su pasión por el fútbol y facilitando el acceso a las mejores instalaciones deportivas. ¡Nos vemos en la cancha!
        </p>
      </div>
    </div>
  );
};

export default About;
