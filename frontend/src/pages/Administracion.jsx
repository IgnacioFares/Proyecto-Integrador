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

  const handleAddProduct = (product) => {
    const duplicate = products.find(p => p.name === product.name);
    if (duplicate) {
      setError('El producto ya existe.');
      return;
    }
    setProducts([...products, product]);
    setError('');
  };

  const handleDeleteProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
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
          <ProductsTable products={products} onDeleteProduct={handleDeleteProduct} />
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



