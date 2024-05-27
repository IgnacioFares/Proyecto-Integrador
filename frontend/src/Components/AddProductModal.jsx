import { useState } from 'react';

const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
  const [product, setProduct] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    horarioApertura: '',
    horarioCierre: '',
    caracteristicas: '',
    imagenes: [],
    ubicacion: {
      provincia: '',
      ciudad: '',
      direccion: ''
    },
    categoria: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'provincia' || name === 'ciudad' || name === 'direccion') {
      setProduct({
        ...product,
        ubicacion: {
          ...product.ubicacion,
          [name]: value
        }
      });
    } else {
      setProduct({
        ...product,
        [name]: value
      });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct({
      ...product,
      imagenes: files.map(file => file.name)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const categoriasArray = product.categoria.split(',').map(item => item.trim());
    const caracteristicasArray = product.caracteristicas.split(',').map(item => item.trim());

    onAddProduct({
      ...product,
      precio: parseFloat(product.precio),
      categoria: categoriasArray,
      caracteristicas: caracteristicasArray
    });

    setProduct({
      nombre: '',
      descripcion: '',
      precio: '',
      horarioApertura: '',
      horarioCierre: '',
      caracteristicas: '',
      imagenes: [],
      ubicacion: {
        provincia: '',
        ciudad: '',
        direccion: ''
      },
      categoria: ''
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center max-h-80vh overflow-y-auto">
      <div className="bg-white p-6 rounded shadow-md w-1/2">
        <h2 className="text-2xl mb-4">Agregar nuevo producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={product.nombre}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Descripción</label>
            <textarea
              name="descripcion"
              value={product.descripcion}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            ></textarea>
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block mb-1">Precio</label>
              <input
                type="number"
                name="precio"
                value={product.precio}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block mb-1">Horario de Apertura</label>
              <input
                type="time"
                name="horarioApertura"
                value={product.horarioApertura}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1">Horario de Cierre</label>
              <input
                type="time"
                name="horarioCierre"
                value={product.horarioCierre}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Categorías (separadas por comas)</label>
            <input
              type="text"
              name="categoria"
              value={product.categoria}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Características (separadas por comas)</label>
            <input
              type="text"
              name="caracteristicas"
              value={product.caracteristicas}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Imágenes</label>
            <input
              type="file"
              name="imagenes"
              multiple
              onChange={handleImageChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Provincia</label>
            <input
              type="text"
              name="provincia"
              value={product.ubicacion.provincia}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Ciudad</label>
            <input
              type="text"
              name="ciudad"
              value={product.ubicacion.ciudad}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={product.ubicacion.direccion}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-4 px-4 py-2 bg-gray-500 text-white rounded">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
              Crear Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;






