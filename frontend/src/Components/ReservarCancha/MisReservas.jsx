import React, { useState, useEffect } from 'react';

// Array de productos
const products = [
    {
        id: 1,
        title: 'Estadio Monumental',
        description: 'El Estadio Monumental cuenta con una cancha de césped natural de alta calidad, perfecta para partidos oficiales y eventos de gran escala. Ofrece una experiencia de juego óptima con un césped bien mantenido y una superficie nivelada.',
        price: 100,
        image: 'https://i.pinimg.com/originals/9c/76/c6/9c76c63586c831cb638e9de05f3f0748.jpg'
    },
    {
        id: 2,
        title: 'Complejo Deportivo La Bombonera',
        description: 'El Complejo Deportivo La Bombonera dispone de una cancha de césped sintético de última generación, ideal para partidos y entrenamientos intensivos. Con excelente drenaje y superficie antideslizante, asegura un juego seguro en cualquier clima.',
        price: 120,
        image: 'https://scontent.feze13-1.fna.fbcdn.net/v/t39.30808-6/306775986_467887492021542_685674761761631612_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=5Xxohxoq8Y0Q7kNvgH3KWRG&_nc_ht=scontent.feze13-1.fna&oh=00_AYBuw_xZZ-VOjzucWA_diii-1SvkXmcws3fbgQy-71v4Bw&oe=665D714E'
    },
    {
        id: 3,
        title: 'Estadio Santiago Bernabéu',
        description: 'El Estadio Santiago Bernabéu ofrece una cancha con césped natural, cuidada hasta el más mínimo detalle para ofrecer la mejor experiencia de juego posible. Perfecta para partidos oficiales de alto nivel.',
        price: 140,
        image: 'https://cicadexgreendex.com/wp-content/uploads/2021/03/Proyecto-Cicadex-Greendex-Proquinal-3.jpg'
    },
    {
        id: 4,
        title: 'Cancha Central del Camp Nou',
        description: 'La cancha central del Camp Nou es una de las mejores del mundo, con un césped natural impecable y una superficie de juego de primer nivel. Ideal para partidos y eventos de alta categoría.',
        price: 160,
        image: 'https://www.soho.co/resizer/v2/2IVRXQSL2FHRBKCGKILGUCWTY4.jpg?auth=40962d96da7cdfc0efca0a0d49cc02f29c2d2220964287d486008fa2e679a987&smart=true&quality=75&width=1280&height=720'
    },
    {
        id: 5,
        title: 'Campo de Entrenamiento de Valdebebas',
        description: 'El campo de entrenamiento de Valdebebas está diseñado para sesiones de práctica intensivas, con césped sintético de alta calidad y equipamiento adicional para ejercicios de agilidad y precisión.',
        price: 180,
        image: 'https://www.qhubobogota.com/wp-content/uploads/2023/07/Asi-de-breve-puede-apartar-una-cancha-con-el-distrito.jpg'
    },
    {
        id: 6,
        title: 'Estadio Azteca',
        description: 'El Estadio Azteca cuenta con una cancha de césped natural de primer nivel, ideal para partidos internacionales y eventos de gran envergadura. Ofrece una superficie de juego excepcional.',
        price: 200,
        image: 'https://via.placeholder.com/150'
    },
    {
        id: 7,
        title: 'Cancha de Fútbol Playa Copacabana',
        description: 'La cancha de fútbol playa Copacabana está ubicada en una de las playas más famosas del mundo, con arena fina y un ambiente perfecto para partidos de fútbol playa. Ideal para torneos de verano y eventos al aire libre.',
        price: 220,
        image: 'https://via.placeholder.com/150'
    },
    {
        id: 8,
        title: 'Cancha Infantil de Chiquititas',
        description: 'La cancha infantil de Chiquititas está diseñada para los más pequeños, con césped sintético suave y medidas adaptadas para niños. Perfecta para entrenamientos y partidos de fútbol infantil.',
        price: 240,
        image: 'https://via.placeholder.com/150'
    },
    {
        id: 9,
        title: 'Cancha Urbana del Barrio Chino',
        description: 'Ubicada en el corazón del Barrio Chino, esta cancha urbana es ideal para partidos rápidos y dinámicos. Con un diseño moderno y una superficie sintética resistente, es perfecta para jugadores urbanos.',
        price: 260,
        image: 'https://via.placeholder.com/150'
    },
    {
        id: 10,
        title: 'Campo de Fútbol Municipal',
        description: 'El campo de fútbol municipal es una instalación pública con una cancha de césped natural bien cuidada, perfecta para ligas locales y entrenamientos. Ofrece una superficie de juego cómoda y segura.',
        price: 280,
        image: 'https://via.placeholder.com/150'
    },
];

const MisReservas = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const storedReservations = JSON.parse(localStorage.getItem('reservations'));
        if (storedReservations) {
            setReservations(storedReservations);
        }
    }, []);

    const cancelReservation = (index) => {
        const updatedReservations = reservations.filter((_, i) => i !== index);
        setReservations(updatedReservations);
        localStorage.setItem('reservations', JSON.stringify(updatedReservations));
    };

    return (
        <div className="container mx-auto my-20 p-5 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4">Mis Reservas</h1>
            {reservations.length === 0 ? (
                <p className="text-gray-700">No tienes reservas.</p>
            ) : (
                <ul>
                    {reservations.map((reservation, index) => {
                        // Encontrar el producto correspondiente a la reserva
                        const product = products.find(product => product.id === reservation.productId);
                        return (
                            <li key={index} className="border-b py-2 flex justify-between items-center">
                                <div>
                                    {/* Mostrar el nombre de la cancha y su foto */}
                                    <h2 className="text-xl font-semibold">{product.title}</h2>
                                    <img src={product.image} alt={product.title} className="w-20 h-20 object-cover rounded-full" />
                                    <p className="text-gray-700">{reservation.date}</p>
                                    <p className="text-gray-700">De {new Date(reservation.startTime).toLocaleTimeString()} a {new Date(reservation.endTime).toLocaleTimeString()}</p>
                                </div>
                                <button
                                    onClick={() => cancelReservation(index)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Cancelar
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default MisReservas;
