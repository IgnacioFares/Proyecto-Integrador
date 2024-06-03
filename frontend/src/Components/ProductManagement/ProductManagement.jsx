import { useState, useEffect } from 'react';
import instance from '../../axiosConfig'; // Asegúrate de que la ruta sea correcta
import ProductsTable from '../ProductsTable/ProductsTable';
import AddProductModal from '../AddProductModal/AddProductModal';

const ProductManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await instance.get('/productos').then(respuesta => { return respuesta});
        setProducts(response.data);
      } catch (error) {
        setError('Error al cargar los productos.');
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async (product) => {
    try {
      const response = await axios.post('/productos', product).then(respuesta => { return respuesta});
      setProducts([...products, response.data]);
      setError('');
    } catch (error) {
      setError('Error al agregar el producto.');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`/productos/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      setError('Error al eliminar el producto.');
    }
  };

  const handleUpdateProduct = async (id, updates) => {
    try {
      const response = await axios.put(`/productos/${id}`, updates);
      setProducts(products.map(product => (product.id === id ? response.data : product)));
    } catch (error) {
      setError('Error al actualizar el producto.');
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4 shadow-sm py-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Agregar Producto
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
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
