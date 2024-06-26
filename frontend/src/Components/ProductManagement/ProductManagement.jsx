import { useState, useEffect } from 'react';
import axios from '../../axiosConfig'; // Asegúrate de que la ruta sea correcta
import ProductsTable from '../ProductsTable/ProductsTable';
import AddProductModal from '../AddProductModal/AddProductModal';

const ProductManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // Estado para el mensaje de éxito

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/productos');
        setProducts(response.data);
      } catch (error) {
        setError('Error al cargar los productos.');
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async (product) => {
    try {
      const response = await axios.post('/administracion/productos', product);
      setProducts([...products, response.data]);
      setError('');
      setSuccess('Producto agregado con éxito.'); // Mensaje de éxito
    } catch (error) {
      setError('Error al agregar el producto.');
      setSuccess(''); // Limpiar el mensaje de éxito en caso de error
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`/administracion/productos/${id}`);
      setProducts(products.filter(product => product.id !== id));
      setError('');
      setSuccess('Producto eliminado con éxito.'); // Mensaje de éxito
    } catch (error) {
      setError('Error al eliminar el producto.');
      setSuccess(''); // Limpiar el mensaje de éxito en caso de error
    }
  };

  const handleUpdateProduct = async (id, updates) => {
    try {
      const response = await axios.put(`/administracion/productos/${id}`, updates);
      setProducts(products.map(product => (product.id === id ? response.data : product)));
      setError('');
      setSuccess('Producto actualizado con éxito.'); // Mensaje de éxito
    } catch (error) {
      setError('Error al actualizar el producto.');
      setSuccess(''); // Limpiar el mensaje de éxito en caso de error
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4 shadow-sm py-2">
        <h1 className="text-2xl font-bold mb-4">Administración de Productos</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Agregar Producto
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}
      <ProductsTable
        products={products}
        onDeleteProduct={handleDeleteProduct}
        onUpdateProduct={handleUpdateProduct}
      />
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
};

export default ProductManagement;
