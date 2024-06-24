import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import { useAuth } from '../../context/AuthContext';

const MisReservas = () => {
    const { token } = useAuth();
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('/bookings/mine', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setReservations(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar las reservas.');
                setLoading(false);
            }
        };
        fetchReservations();
    }, [token]);

    const cancelReservation = async (reservationId) => {
        try {
            await axios.delete(`/bookings/${reservationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setReservations(reservations.filter(reservation => reservation.id !== reservationId));
        } catch (err) {
            setError('Error al cancelar la reserva.');
        }
    };

    const formatTime = (time) => {
        const date = new Date(`1970-01-01T${time}`);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (loading) {
        return <div className="text-center">Cargando...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto my-20 p-5 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4">Mis Reservas</h1>
            {reservations.length === 0 ? (
                <p className="text-gray-700">No tienes reservas.</p>
            ) : (
                <ul>
                    {reservations.map((reservation) => (
                        <li key={reservation.id} className="border-b py-4 flex justify-between items-center">
                            <div className="flex items-center">
                                <img
                                    src={reservation.producto.imagenes[0]?.url || "https://recreasport.com/wp-content/uploads/2017/04/SAM_0191-2.jpg"}
                                    alt={reservation.producto.nombre}
                                    className="w-20 h-20 object-cover rounded-full mr-4"
                                />
                                <div>
                                    <h2 className="text-xl font-semibold">{reservation.producto.nombre}</h2>
                                    <p className="text-gray-700">{reservation.fechaReserva}</p>
                                    <p className="text-gray-700">De {formatTime(reservation.horaInicio)} a {formatTime(reservation.horaFin)}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => cancelReservation(reservation.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Cancelar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MisReservas;
