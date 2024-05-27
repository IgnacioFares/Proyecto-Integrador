import { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import AdminHeader from '../Components/AdminHeader';
import ProductsTable from '../Components/ProductsTable';
import AddProductModal from '../Components/AddProductModal';

const Administracion = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
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
      const response = await fetch('/api/products', {
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
      const response = await fetch(`/api/products/${id}`, {
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
      const response = await fetch(`/api/products/${id}`, {
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

  if (isMobile) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-4 bg-white shadow-md rounded">
          <h1 className="text-2xl font-bold mb-4">No disponible en dispositivos móviles</h1>
          <p>Por favor, accede desde un dispositivo con una pantalla más grande.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <AdminHeader onOpenAddProductModal={() => setIsModalOpen(true)} />
        <div className="p-4">
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
      </div>
    </div>
  );
};

export default Administracion;







