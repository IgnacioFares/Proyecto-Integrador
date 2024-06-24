import { useState, useEffect } from 'react';
import axios from '../../axiosConfig'; // Asegúrate de que la ruta sea correcta

const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
  const [product, setProduct] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    horarioApertura: '',
    horarioCierre: '',
    caracteristicas: [],
    imagenes: [],
    ubicacion: {
      provincia: '',
      ciudad: '',
      direccion: ''
    },
    categoria: {
      id: '',
      nombre: ''
    }
  });

  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [provinces, setProvinces] = useState([
    'Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán'
  ]);
  const [imageUrls, setImageUrls] = useState(['']); // Añadido para gestionar las URLs de las imágenes

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/categorias').then(response => response.data);
        setCategories(response);
      } catch (error) {
        console.error('Error al cargar las categorías', error);
      }
    };

    const fetchFeatures = async () => {
      try {
        const response = await axios.get('/administracion/caracteristicas').then(response => response.data);
        setFeatures(response);
      } catch (error) {
        console.error('Error al cargar las características', error);
      }
    };

    fetchCategories();
    fetchFeatures();
  }, []);

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

  const handleFeatureChange = (e) => {
    const selectedFeatures = Array.from(e.target.selectedOptions, option => {
      const feature = features.find(f => f.nombre === option.value);
      return { id: feature.id, nombre: feature.nombre };
    });
    setProduct({
      ...product,
      caracteristicas: selectedFeatures
    });
  };

  const handleImageUrlChange = (index, value) => {
    const updatedUrls = [...imageUrls];
    updatedUrls[index] = value;
    setImageUrls(updatedUrls);
  };

  const handleAddImageUrl = () => {
    if (imageUrls.length < 5) {
      setImageUrls([...imageUrls, '']);
    } else {
      alert('Solo puedes agregar hasta 5 URLs de imágenes.');
    }
  };

  const handleCategoryChange = (e) => {
    const category = categories.find(cat => cat.nombre === e.target.value);
    setProduct({
      ...product,
      categoria: {
        id: category.id,
        nombre: category.nombre
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const addedProduct = await onAddProduct({
        ...product,
        precio: parseFloat(product.precio),
        imagenes: imageUrls.map(url => ({ url })) // Añadido para enviar las URLs de las imágenes
      });

      setProduct({
        nombre: '',
        descripcion: '',
        precio: '',
        horarioApertura: '',
        horarioCierre: '',
        caracteristicas: [],
        imagenes: [],
        ubicacion: {
          provincia: '',
          ciudad: '',
          direccion: ''
        },
        categoria: {
          id: '',
          nombre: ''
        }
      });

      setImageUrls(['']); // Restablecer las URLs de las imágenes
      onClose();
    } catch (error) {
      console.error('Error al agregar el producto', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-1/2 max-h-full overflow-y-auto">
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
            />
          </div>
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
            <label className="block mb-1">Provincia</label>
            <select
              name="provincia"
              value={product.ubicacion.provincia}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required>
              <option value="">Seleccione una provincia</option>
              {provinces.map((provincia, index) => (
                <option key={index} value={provincia}>{provincia}</option>
              ))}
            </select>
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
          <div className="mb-4">
            <label className="block mb-1">Categoría</label>
            <select
              name="categoria"
              value={product.categoria.nombre}
              onChange={handleCategoryChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Seleccione una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.nombre}>{category.nombre}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Características</label>
            <select
              multiple
              name="caracteristicas"
              value={product.caracteristicas.map(feature => feature.nombre)}
              onChange={handleFeatureChange}
              className="w-full border p-2 rounded"
              required
            >
              {features.map((feature) => (
                <option key={feature.id} value={feature.nombre}>{feature.nombre}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">URLs de Imágenes</label>
            {imageUrls.map((url, index) => (
              <input
                key={index}
                type="text"
                value={url}
                onChange={(e) => handleImageUrlChange(index, e.target.value)}
                className="w-full border p-2 rounded mb-2"
                placeholder="Ingrese la URL de la imagen"
                required
              />
            ))}
            {imageUrls.length < 5 && (
              <button type="button" onClick={handleAddImageUrl} className="text-blue-500">
                Agregar otra URL
              </button>
            )}
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-4 px-4 py-2 bg-gray-500 text-white rounded">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
