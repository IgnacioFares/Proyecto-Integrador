import { useState } from 'react';

const ProductsTable = ({ products, onDeleteProduct, onUpdateProduct }) => {
  const [editingProductId, setEditingProductId] = useState(null);
  const [editableProduct, setEditableProduct] = useState({});

  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setEditableProduct({
      ...product,
    });
  };

  const handleSaveClick = () => {
    onUpdateProduct(editingProductId, {
      ...editableProduct
    });
    setEditingProductId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'provincia' || name === 'ciudad' || name === 'direccion') {
      setEditableProduct({
        ...editableProduct,
        ubicacion: {
          ...editableProduct.ubicacion,
          [name]: value
        }
      });
    } else {
      setEditableProduct({
        ...editableProduct,
        [name]: value
      });
    }
  };

  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmDelete) {
      onDeleteProduct(id);
    }
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  };

  const resolveArray = (array) => {
    return array[0] == undefined || 
      (array.length > 1 
        ? array.map((caracteristica) => (
        <img className="max-w-6" src={caracteristica.logoUrl}></img>
      )) 
        : <img className="max-w-6" src={array[0].logoUrl}></img>);
  }

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2">Nombre</th>
          <th className="py-2">Descripción</th>
          <th className="py-2">Precio</th>
          <th className="py-2">Apertura</th>
          <th className="py-2">Cierre</th>
          <th className="py-2">Características</th>
          <th className="py-2">Categorías</th>
          <th className="py-2">Ubicación</th>
          <th className="py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 ? (
          <tr>
            <td colSpan="10" className="text-center py-4">
              No hay productos disponibles.
            </td>
          </tr>
        ) : (
          products.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="py-2 text-center">
                {editingProductId === product.id ? (
                  <input
                    type="text"
                    name="nombre"
                    value={editableProduct.nombre}
                    onChange={handleChange}
                    className="border p-1 rounded"
                  />
                ) : (
                  product.nombre
                )}
              </td>
              <td className="py-2 text-center">
                {editingProductId === product.id ? (
                  <textarea
                    name="descripcion"
                    value={editableProduct.descripcion}
                    onChange={handleChange}
                    className="border p-1 rounded"
                  />
                ) : (
                  product.descripcion
                )}
              </td>
              <td className="py-2 text-center">
                {editingProductId === product.id ? (
                  <input
                    type="number"
                    name="precio"
                    value={editableProduct.precio}
                    onChange={handleChange}
                    className="border p-1 rounded"
                  />
                ) : (
                  `$${product.precio}`
                )}
              </td>
              <td className="py-2 text-center">
                {editingProductId === product.id ? (
                  <input
                    type="time"
                    name="horarioApertura"
                    value={formatTime(editableProduct.horarioApertura)}
                    onChange={handleChange}
                    className="border p-1 rounded"
                  />
                ) : (
                  formatTime(product.horarioApertura)
                )}
              </td>
              <td className="py-2 text-center">
                {editingProductId === product.id ? (
                  <input
                    type="time"
                    name="horarioCierre"
                    value={formatTime(editableProduct.horarioCierre)}
                    onChange={handleChange}
                    className="border p-1 rounded"
                  />
                ) : (
                  formatTime(product.horarioCierre)
                )}
              </td>
              <td className="py-2 flex justify-center">
                {resolveArray(product.caracteristicas)}
              </td>
              <td className="py-2 text-center">
                {product.categoria == null || product.categoria.nombre}
              </td>
              <td className="py-2 text-center">
                {editingProductId === product.id ? (
                  <div>
                    <input
                      type="text"
                      name="provincia"
                      value={editableProduct.ubicacion.provincia}
                      onChange={handleChange}
                      className="border p-1 rounded mb-1"
                      placeholder="Provincia"
                    />
                    <input
                      type="text"
                      name="ciudad"
                      value={editableProduct.ubicacion.ciudad}
                      onChange={handleChange}
                      className="border p-1 rounded mb-1"
                      placeholder="Ciudad"
                    />
                    <input
                      type="text"
                      name="direccion"
                      value={editableProduct.ubicacion.direccion}
                      onChange={handleChange}
                      className="border p-1 rounded"
                      placeholder="Dirección"
                    />
                  </div>
                ) : (
                  `${product.ubicacion.provincia}, ${product.ubicacion.ciudad}, ${product.ubicacion.direccion}`
                )}
              </td>
              <td className="py-2 text-center text-center">
                {editingProductId === product.id ? (
                  <button
                    className="text-green-500 hover:underline"
                    onClick={handleSaveClick}
                  >
                    Guardar
                  </button>
                ) : (
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleEditClick(product)}
                  >
                    Editar
                  </button>
                )}
                <button
                  className="text-red-500 hover:underline ml-4"
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