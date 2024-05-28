import { useState } from 'react';

const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    images: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct({
      ...product,
      images: files.map(file => file.name)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(product);
    setProduct({
      name: '',
      description: '',
      price: '',
      stock: '',
      images: []
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-1/2">
        <h2 className="text-2xl mb-4">Agregar nuevo producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Descripción</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            ></textarea>
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block mb-1">Precio</label>
              <input
                type="text"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1">Stock</label>
              <input
                type="text"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Imágenes</label>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleImageChange}
              className="w-full border p-2 rounded"
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