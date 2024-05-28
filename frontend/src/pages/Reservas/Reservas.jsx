
import { FaMapMarkerAlt, FaPhone, FaStar } from 'react-icons/fa';

const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(
            <FaStar key={i} color={i < rating ? '#FFD700' : '#C4C4C4'} />
        );
    }
    return <div className="flex">{stars}</div>;
};

const Reservas = () => {
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mx-4 my-8">
            <div className="md:w-1/2 mt-4 md:mt-0 md:pl-8 md:self-start">
                <img src="/images/cancha1.png" alt="Cancha" className="w-full mb-4 md:mb-0" />
            </div>
            <div className="md:w-1/2 md:pl-4 mr-8">
                <div className="text-2xl md:text-4xl font-bold mb-2">Canchas Don Balón</div>
                <div className="text-gray-700 mb-2">7 Soles PH5</div>
                <div className="flex items-center mb-2">
                    <StarRating rating={4.5} /> {/* Suponiendo que la calificación es 4.5 */}
                    <span className="ml-2">(4.5)</span>
                </div>
                <div className="text-lg font-bold mb-2">$38000</div>
                <div className="text-gray-700 mb-2">
                    Cancha de 7
                    <br />
                    Pasto sintetico
                    <br />
                    Item 1
                    <br />
                    Item 2
                    <br />
                    Item 3
                </div>
                <div className="text-gray-700 mb-2">
                    <span>Fecha y hora de reserva:</span>
                    <br />
                    <span>(Aquí iría la fecha y hora seleccionada)</span>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-lg hover:shadow-xl mb-2 md:mb-0">
                        <FaMapMarkerAlt className="inline-block mr-2" />
                        Ubicación
                    </button>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-lg hover:shadow-xl">
                        <FaPhone className="inline-block mr-2" />
                        Contacto
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reservas;