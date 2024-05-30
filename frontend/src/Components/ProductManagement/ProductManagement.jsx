import { useState, useEffect } from 'react';
import ProductsTable from '../ProductsTable/ProductsTable';
import AddProductModal from '../AddProductModal/AddProductModal';

const ProductManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/productos');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError('Error al cargar los productos.');
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async (product) => {
    try {
      const response = await fetch('/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      
      if (!response.ok) {
        throw new Error('Error al agregar el producto.');
      }

      const newProduct = await response.json();
      setProducts([...products, newProduct]);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`/productos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el producto.');
      }

      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateProduct = async (id, updates) => {
    try {
      const response = await fetch(`/productos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el producto.');
      }

      const updatedProduct = await response.json();
      setProducts(products.map(product => (product.id === id ? updatedProduct : product)));
    } catch (error) {
      setError(error.message);
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