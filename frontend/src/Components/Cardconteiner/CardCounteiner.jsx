import React, { useState } from 'react';

export const CardContainer = () => {
  return (
    <>
      <div className="">
        <h3 className="flex justify-center text-6xl bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text font-michroma text-4xl md:text-5xl text-left mb-1 py-8">
          Encuentra tu cancha ideal
        </h3>
        <p className="flex justify-center">Explora nuestras diferentes locaciones</p>
      </div>

      <div className="flex justify-center mt-28 mx-4">
        <Card
          imageUrl="/images/HUHUIHAS.png"
          name="Gran 7"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
          images={[
            "/images/HUHUIHAS.png",
            "/images/cancha1.jpg",
            "/images/cancha2.jpg",
            "/images/cancha3.jpg",
            "/images/cancha4.jpg",
            "/images/cancha5.png"
          ]}
        />
        <Card
          imageUrl="/images/huqwjiod.png"
          name="Don Balon"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
          images={[
            "/images/huqwjiod.png",
            "/images/cancha1.jpg",
            "/images/cancha2.jpg",
            "/images/cancha3.jpg",
            "/images/cancha4.jpg",
            "/images/cancha5.png"
          ]}
        />
        <Card
          imageUrl="/images/Placeholder Image.png"
          name="Futbol Noble"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
          images={[
            "/images/Placeholder Image.png",
            "/images/cancha1.jpg",
            "/images/cancha2.jpg",
            "/images/cancha3.jpg",
            "/images/cancha4.jpg",
            "/images/cancha5.png"
          ]}
        />
      </div>
    </>
  );
};

const Card = ({ imageUrl, name, description, images }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mx-4">
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img className="w-full" src={imageUrl} alt={name} />
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
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
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
      <div className="grid grid-cols-3 gap-4">
        {images.slice(0, 3).map((image, index) => (
          <img key={index} src={image} alt={`Gallery image ${index + 1}`} className="w-64 h-64 object-cover rounded" />
        ))}
        {images.slice(3).map((image, index) => (
          <img key={index} src={image} alt={`Gallery image ${index + 4}`} className="w-64 h-64 object-cover rounded" />
        ))}
      </div>
    </div>
  );
};







export default CardContainer;