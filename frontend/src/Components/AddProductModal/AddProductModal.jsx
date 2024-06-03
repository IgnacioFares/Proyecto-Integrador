import { useState, useEffect } from 'react';

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
    categoria: ''
  });

  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/administracion/categorias');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error al cargar las categorías', error);
      }
    };

    const fetchFeatures = async () => {
      try {
        const response = await fetch('/administracion/caracteristicas');
        const data = await response.json();
        setFeatures(data);
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
    const selectedFeatures = Array.from(e.target.selectedOptions, option => option.value);
    setProduct({
      ...product,
      caracteristicas: selectedFeatures
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct({
      ...product,
      imagenes: files.map(file => file.name)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const addedProduct = await onAddProduct({
        ...product,
        precio: parseFloat(product.precio),
      });

      const categoriaSeleccionada = categories.find(category => category.nombre === product.categoria);

      if (categoriaSeleccionada) {
        await fetch(`/administracion/productos/${addedProduct.id}/categoria/${categoriaSeleccionada.id}`, {
          method: 'PUT',
        });
      }

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
        categoria: ''
      });

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
            <label className="block mb-1">Ubicación</label>
            <input
              type="text"
              name="provincia"
              value={product.ubicacion.provincia}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Provincia"
              required
            />
            <input
              type="text"
              name="ciudad"
              value={product.ubicacion.ciudad}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Ciudad"
              required
            />
            <input
              type="text"
              name="direccion"
              value={product.ubicacion.direccion}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Dirección"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Categoría</label>
            <select
              name="categoria"
              value={product.categoria}
              onChange={handleChange}
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
              value={product.caracteristicas}
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
            <label className="block mb-1">Imágenes</label>
            <input
              type="file"
              name="imagenes"
              onChange={handleImageChange}
              className="w-full border p-2 rounded"
              multiple
              required
            />
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