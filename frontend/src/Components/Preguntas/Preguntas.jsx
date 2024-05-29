

const Preguntas = () => {
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mx-4 my-8 mt-40">
            <div className="md:w-2/5 mt-4 md:mt-0 md:pl-8 md:self-start">
                <div className="text-black font-michroma text-4xl md:text-5xl text-left mb-1 py-8 md:bg-gradient-to-r md:from-blue-500 md:to-green-400 md:text-transparent md:bg-clip-text">
                    Preguntas frecuentes
                </div>
                <p className="text-gray-700 mb-2">
                    Encuentra respuestas a las preguntas más frecuentes sobre reservas de canchas, tipos disponibles y proceso de pago.
                </p>
                <button className="hidden md:block bg-gradient-to-r from-blue-500 to-green-400 text-white py-2 px-4 rounded-md shadow-lg hover:shadow-xl">
                    Contacto
                </button>
            </div>

            <div className="md:w-2/5 md:pl-4 mr-8">
                <button className="md:hidden bg-white text-black border border-black py-2 px-4 rounded-md shadow-lg hover:shadow-xl mx-auto mb-4">
                    Contacto
                </button>
                <div className="mb-8">
                    <div className="hidden md:block text-black font-michroma text-2xl md:text-3xl bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text">
                        ¿Cómo reservo una cancha?
                    </div>
                    <div className="md:hidden font-bold text-2xl text-black mb-2">
                        ¿Cómo reservo una cancha?
                    </div>
                    <p className="text-gray-700">
                        Para reservar una cancha, simplemente utiliza nuestro buscador para encontrar la cancha que deseas, selecciona la fecha y hora de tu preferencia, y completa el proceso de pago.
                    </p>
                </div>
                <div className="mb-8">
                    <div className="hidden md:block text-black font-michroma text-2xl md:text-3xl bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text">
                        ¿Qué tipos de canchas están disponibles?
                    </div>
                    <div className="md:hidden font-bold text-2xl text-black mb-2">
                        ¿Qué tipos de canchas están disponibles?
                    </div>
                    <p className="text-gray-700">
                        Disponemos de una amplia variedad de canchas, incluyendo canchas de césped natural, césped sintético y canchas cubiertas. Puedes filtrar tus resultados según tus preferencias.
                    </p>
                </div>
                <div className="mb-8">
                    <div className="hidden md:block text-black font-michroma text-2xl md:text-3xl bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text">
                        ¿Cuál es el proceso de pago?
                    </div>
                    <div className="md:hidden font-bold text-2xl text-black mb-2">
                        ¿Cuál es el proceso de pago?
                    </div>
                    <p className="text-gray-700">
                        El proceso de pago es rápido y seguro. Aceptamos diferentes métodos de pago, incluyendo tarjetas de crédito y transferencias bancarias. Una vez realizado el pago, recibirás la confirmación de tu reserva por correo electrónico.
                    </p>
                </div>
                <div className="mb-8">
                    <div className="hidden md:block text-black font-michroma text-2xl md:text-3xl bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text">
                        ¿Cómo puedo cancelar una reserva?
                    </div>
                    <div className="md:hidden font-bold text-2xl text-black mb-2">
                        ¿Cómo puedo cancelar una reserva?
                    </div>
                    <p className="text-gray-700">
                        Para cancelar una reserva, simplemente comunícate con nuestro equipo de atención al cliente y ellos te ayudarán a gestionar la cancelación. Ten en cuenta que pueden aplicarse cargos por cancelaciones tardías.
                    </p>
                </div>
                <div>
                    <div className="hidden md:block text-black font-michroma text-2xl md:text-3xl bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text">
                        ¿Puedo modificar una reserva existente?
                    </div>
                    <div className="md:hidden font-bold text-2xl text-black mb-2">
                        ¿Puedo modificar una reserva existente?
                    </div>
                    <p className="text-gray-700">
                        Sí, puedes modificar una reserva existente siempre y cuando haya disponibilidad. Para hacerlo, comunícate con nuestro equipo de atención al cliente y ellos te guiarán en el proceso.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Preguntas;
