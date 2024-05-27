import { useState } from 'react';

const ProductsTable = ({ products, onDeleteProduct, onUpdateProduct }) => {
  const [editingProductId, setEditingProductId] = useState(null);
  const [newCategory, setNewCategory] = useState('');
  const [newFeatures, setNewFeatures] = useState('');

  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setNewCategory(product.category.join(', '));
    setNewFeatures(product.features.join(', '));
  };

  const handleSaveClick = (product) => {
    const categoriesArray = newCategory.split(',').map(item => item.trim());
    const featuresArray = newFeatures.split(',').map(item => item.trim());
    onUpdateProduct(product.id, { category: categoriesArray, features: featuresArray });
    setEditingProductId(null);
  };

  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmDelete) {
      onDeleteProduct(id);
    }
  };

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2">Imagen</th>
          <th className="py-2">Nombre</th>
          <th className="py-2">Descripción</th>
          <th className="py-2">Precio</th>
          <th className="py-2">Stock</th>
          <th className="py-2">Categorías</th>
          <th className="py-2">Características</th>
          <th className="py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 ? (
          <tr>
            <td colSpan="8" className="text-center py-4">
              No hay productos disponibles.
            </td>
          </tr>
        ) : (
          products.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="py-2 text-center">
                <div className="bg-gray-300 w-12 h-12 inline-block">{product.images[0]}</div>
              </td>
              <td className="py-2">{product.name}</td>
              <td className="py-2">{product.description}</td>
              <td className="py-2">{`$${product.price}`}</td>
              <td className="py-2">{product.stock}</td>
              <td className="py-2">
                {editingProductId === product.id ? (
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="border p-2 rounded"
                  />
                ) : (
                  product.category.join(', ')
                )}
              </td>
              <td className="py-2">
                {editingProductId === product.id ? (
                  <input
                    type="text"
                    value={newFeatures}
                    onChange={(e) => setNewFeatures(e.target.value)}
                    className="border p-2 rounded"
                  />
                ) : (
                  product.features.join(', ')
                )}
              </td>
              <td className="py-2 text-center">
                {editingProductId === product.id ? (
                  <button className="text-green-500 hover:underline mr-4" onClick={() => handleSaveClick(product)}>
                    Guardar
                  </button>
                ) : (
                  <button className="text-blue-500 hover:underline mr-4" onClick={() => handleEditClick(product)}>
                    Editar
                  </button>
                )}
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDeleteClick(product.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default ProductsTable;









