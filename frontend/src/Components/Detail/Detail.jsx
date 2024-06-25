import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from '../../axiosConfig';
import Caracteristicas from '../Caracteristicas/Caracteristicas';
import { useAuth } from '../../context/AuthContext';
import { routes } from '../../routes/routes';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';


Modal.setAppElement('#root');

const Detail = ({ addToFavorites, removeFromFavorites, favorites }) => {
    const { id } = useParams();
    const { token } = useAuth();
    const [productSelected, setProductSelected] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [authModalIsOpen, setAuthModalIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [reservations, setReservations] = useState(JSON.parse(localStorage.getItem('reservations')) || []);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [reservationSuccess, setReservationSuccess] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/productos/${id}`);
                setProductSelected(response.data);
            } catch (err) {
                console.error('Error fetching product:', err);
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        const fetchAvailableTimes = async () => {
            if (selectedDate) {
                try {
                    const response = await axios.get(`/bookings/available-times/${id}/${selectedDate.toISOString().split('T')[0]}`);
                    setAvailableTimes(response.data.map(time => new Date(`${selectedDate.toISOString().split('T')[0]}T${time}`)));
                } catch (err) {
                    console.error('Error fetching available times:', err);
                }
            }
        };

        fetchAvailableTimes();
    }, [selectedDate, id]);

    const openModal = () => {
        if (token) {
            setModalIsOpen(true);
        } else {
            setAuthModalIsOpen(true);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const closeAuthModal = () => {
        setAuthModalIsOpen(false);
    };

    const handleReserve = async () => {
        if (!selectedDate || !startTime || !endTime) return;

        const newReservation = {
            producto: { id: productSelected.id },
            fechaReserva: selectedDate.toISOString().split('T')[0],
            horaInicio: startTime.toTimeString().split(' ')[0],
            horaFin: endTime.toTimeString().split(' ')[0],
        };

        try {
            const response = await axios.post('/bookings', newReservation, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setReservations([...reservations, response.data]);
            localStorage.setItem('reservations', JSON.stringify([...reservations, response.data]));
            setReservationSuccess(true);
            closeModal();
        } catch (err) {
            console.error('Error al realizar la reserva:', err);
        }
    };

    const isFavorite = productSelected && favorites.some(fav => fav.id === productSelected.id);

    if (!productSelected) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                    <h2 className="text-center text-xl font-semibold">Cargando...</h2>
                </div>
            </div>
        );
    }

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleShowImageModal = () => setShowImageModal(true);
    const handleCloseImageModal = () => setShowImageModal(false);

    return (
        <div className="container mx-auto my-20 p-5 bg-white rounded-lg shadow-lg">
            {reservationSuccess && <div className="text-green-500 alert alert-success">Reserva confirmada</div>}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div 
                    className="flex justify-center relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img
                        src={productSelected.imagenes[0].url}
                        alt={productSelected.nombre}
                        className="w-64 h-64 object-cover rounded-lg"
                    />
                    {isHovered && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={handleShowImageModal}
                            >
                                Ver más
                            </button>
                        </div>
                    )}
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-4">{productSelected.nombre}</h1>
                    <p className="text-gray-700 text-lg mb-4">{productSelected.descripcion}</p>
                    <div className="text-2xl font-semibold text-green-600 mb-4">${productSelected.precio}</div>
                    <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition-all duration-300">
                       Reservar Cancha
                    </button>
                    <div className="mt-4">
                        {isFavorite ? (
                            <button 
                                onClick={() => removeFromFavorites(productSelected)} 
                                className="text-red-500 px-4 py-2 rounded shadow hover:bg-red-600 transition-all duration-300"
                            >
                                <FontAwesomeIcon icon={faHeart} /> Eliminar de Favoritos
                            </button>
                        ) : (
                            <button 
                                onClick={() => addToFavorites(productSelected)} 
                                className="text-gray-500 px-4 py-2 rounded shadow hover:bg-gray-600 transition-all duration-300"
                            >
                                <FontAwesomeIcon icon={faHeart} /> Agregar a Favoritos
                            </button>
                        )}
                    </div>
                    <div className="mt-2">
                            <a href="https://w.app/XzC4hM" target="_blank" rel="noopener noreferrer" className="flex items-center bg-green-500 text-white px-4 py-2 text-base rounded shadow hover:bg-green-600 transition-all duration-300 max-w-max">
                                <FontAwesomeIcon icon={faWhatsapp} className="w-4 h-4 mr-2" />
                                WhatsApp
                            </a>
                    </div>
                </div>
            </div>
            <Caracteristicas caracteristicas={productSelected.caracteristicas} />

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Reservar Cancha"
                className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto my-20"
                overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center"
            >
                <h2 className="text-2xl font-bold mb-4">Reservar Cancha</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Seleccionar Fecha:</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        dateFormat="yyyy/MM/dd"
                        className="w-full px-3 py-2 border rounded"
                        minDate={new Date()}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Hora de Inicio:</label>
                    <DatePicker
                        selected={startTime}
                        onChange={time => setStartTime(time)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={60}
                        timeCaption="Hora de Inicio"
                        dateFormat="h:mm aa"
                        className="w-full px-3 py-2 border rounded"
                        includeTimes={availableTimes}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Hora de Fin:</label>
                    <DatePicker
                        selected={endTime}
                        onChange={time => setEndTime(time)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={60}
                        timeCaption="Hora de Fin"
                        dateFormat="h:mm aa"
                        className="w-full px-3 py-2 border rounded"
                        includeTimes={availableTimes.map(time => new Date(time.getTime() + 60 * 60 * 1000))}
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleReserve}
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        disabled={!selectedDate || !startTime || !endTime}
                    >
                        Confirmar Reserva
                    </button>
                    <button
                        onClick={closeModal}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancelar
                    </button>
                </div>
            </Modal>

            <Modal
                isOpen={authModalIsOpen}
                onRequestClose={closeAuthModal}
                contentLabel="Iniciar Sesión"
                className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto my-20"
                overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center"
            >
                <h2 className="text-2xl font-bold mb-4">Debes iniciar sesión para reservar</h2>
                <div className="flex justify-around mt-4">
                    <Link to={routes.Login} className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition-all duration-300">
                        Iniciar Sesión
                    </Link>
                    <Link to={routes.Register} className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition-all duration-300">
                        Crear Cuenta
                    </Link>
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={closeAuthModal}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancelar
                    </button>
                </div>
            </Modal>

            <Modal
                isOpen={showImageModal}
                onRequestClose={handleCloseImageModal}
                contentLabel="Galería de Imágenes"
                className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto my-20"
                overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center"
            >
                <div className="flex justify-center items-center h-full">
                    <div className="grid grid-cols-3 gap-4 h-96 bg-white p-4 rounded">
                        <div className="col-span-1 flex items-center">
                            <img src={productSelected.imagenes[0].url} alt="Principal" className="w-full h-64 object-cover rounded bg-transparent" />
                        </div>
                        <div className="col-span-2 grid grid-cols-2 gap-4">
                            {productSelected.imagenes.slice(1).map((image, index) => (
                                <div key={index} className="flex justify-center items-center overflow-hidden">
                                    <img src={image.url} alt={`Gallery image ${index + 2}`} className="w-64 h-full object-cover rounded bg-transparent" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Detail;
