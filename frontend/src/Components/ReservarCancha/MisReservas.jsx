import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';

const MisReservas = () => {
    const [reservations, setReservations] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const storedReservations = JSON.parse(localStorage.getItem('reservations'));
        if (storedReservations) {
            setReservations(storedReservations);
        }
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get(`/administracion/productos`);
            setProducts(response.data);
        };
        fetchProducts();
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
                                    {product ? (
                                        <>
                                            <h2 className="text-xl font-semibold">{product.nombre}</h2>
                                            <img src="https://recreasport.com/wp-content/uploads/2017/04/SAM_0191-2.jpg" alt={product.nombre} className="w-20 h-20 object-cover rounded-full" />
                                        </>
                                    ) : (
                                        <p className="text-gray-700">Producto no encontrado</p>
                                    )}
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
