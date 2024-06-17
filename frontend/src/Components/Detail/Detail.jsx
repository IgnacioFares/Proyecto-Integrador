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
import { routes } from '../../routes/routes'; // Importa las rutas

Modal.setAppElement('#root'); // Necesario para accesibilidad

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

    const handleReserve = () => {
        if (!selectedDate || !startTime || !endTime) return;

        const newReservation = {
            productId: productSelected.id,
            date: selectedDate.toISOString().split('T')[0],
            startTime: startTime.getTime(),
            endTime: endTime.getTime()
        };

        const updatedReservations = [...reservations, newReservation];
        setReservations(updatedReservations);
        localStorage.setItem('reservations', JSON.stringify(updatedReservations));
        closeModal();
    };

    const isReserved = (date, start, end) => {
        return reservations.some(reservation => {
            return (
                reservation.productId === productSelected.id &&
                reservation.date === date.toISOString().split('T')[0] &&
                (
                    (start >= reservation.startTime && start < reservation.endTime) ||
                    (end > reservation.startTime && end <= reservation.endTime) ||
                    (start <= reservation.startTime && end >= reservation.endTime)
                )
            );
        });
    };

    const filterTime = (time) => {
        if (!selectedDate || !startTime) return false;

        const date = selectedDate.toISOString().split('T')[0];
        const start = startTime.getTime();
        const end = time.getTime();
        return isReserved(new Date(date), start, end);
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
                        timeIntervals={30}
                        timeCaption="Hora de Inicio"
                        dateFormat="h:mm aa"
                        className="w-full px-3 py-2 border rounded"
                        excludeTimes={reservations.filter(r => r.date === selectedDate?.toISOString().split('T')[0]).map(r => new Date(r.startTime))}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Hora de Fin:</label>
                    <DatePicker
                        selected={endTime}
                        onChange={time => setEndTime(time)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        timeCaption="Hora de Fin"
                        dateFormat="h:mm aa"
                        className="w-full px-3 py-2 border rounded"
                        excludeTimes={reservations.filter(r => r.date === selectedDate?.toISOString().split('T')[0]).map(r => new Date(r.endTime))}
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleReserve}
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        disabled={!selectedDate || !startTime || !endTime || filterTime(endTime)}
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
