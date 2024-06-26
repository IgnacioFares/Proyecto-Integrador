import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig'; // Asegúrate de que la ruta sea correcta
import { Link, useNavigate } from 'react-router-dom';

export const CardContainer = () => {
  const [products, setProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/productos');
        setProducts(response.data);

        // Seleccionar 3 productos aleatorios
        const shuffled = response.data.sort(() => 0.5 - Math.random());
        setRandomProducts(shuffled.slice(0, 3));
      } catch (err) {
        console.error('Error fetching products', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="">
        <h3 className="flex justify-center text-6xl bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text font-michroma text-4xl md:text-5xl text-left mb-1 py-8">
          Encuentra tu cancha ideal
        </h3>
        <p className="flex justify-center">Explora nuestras diferentes locaciones</p>
      </div>

      <div className="flex justify-center mt-28 mx-4">
        {randomProducts.map((product) => (
          <Card
            key={product.id}
            product={product}
            imageUrl={product.imagenes[0]?.url}
            name={product.nombre}
            description={product.descripcion}
            images={product.imagenes.map((img) => img.url)}
          />
        ))}
      </div>
    </>
  );
};

const Card = ({ product, imageUrl, name, description, images }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleReserve = () => navigate(`/detalle/${product.id}`);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mx-4">
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img className="w-full h-64 object-cover" src={imageUrl || 'placeholder.jpg'} alt={name} />
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleShowModal}
            >
              Ver más
            </button>
          </div>
        )}
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          onClick={handleReserve}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Reservar
        </button>
      </div>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <ImageGallery images={images} />
        </Modal>
      )}
    </div>
  );
};

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
      <div className="bg-white p-8 rounded shadow-lg relative">
        <button className="absolute top-0 right-0 m-4 text-black" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

const ImageGallery = ({ images }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="grid grid-cols-3 gap-4 h-96 bg-white p-4 rounded"> {/* Ajusta la altura y añade un fondo blanco y padding */}
        <div className="col-span-1 flex items-center">
          <img src={images[0]} alt="Main image" className="w-full h-64 object-cover rounded bg-transparent" />
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-4">
          {images.slice(1).map((image, index) => (
        <div key={index} className="flex justify-center items-center overflow-hidden"> {/* Centrado añadido */}
          <img src={image} alt={`Gallery image ${index + 2}`} className="w-64 h-full object-cover rounded bg-transparent" />
        </div>
      ))}
    </div>
  </div>
</div>


  );
};

export default CardContainer;
