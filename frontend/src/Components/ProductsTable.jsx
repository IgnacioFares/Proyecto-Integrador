const ProductsTable = ({ products, onDeleteProduct }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2">Imagen</th>
          <th className="py-2">Nombre</th>
          <th className="py-2">Descripción</th>
          <th className="py-2">Precio</th>
          <th className="py-2">Stock</th>
          <th className="py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 ? (
          <tr>
            <td colSpan="6" className="text-center py-4">
              No hay productos disponibles.
            </td>
          </tr>
        ) : (
          products.map((product, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 text-center">
                <div className="bg-gray-300 w-12 h-12 inline-block">{product.image}</div>
              </td>
              <td className="py-2">{product.name}</td>
              <td className="py-2">{product.description}</td>
              <td className="py-2">{`$${product.price}`}</td>
              <td className="py-2">{product.stock}</td>
              <td className="py-2 text-center">
                <button className="text-blue-500 hover:underline">View</button>
                <button
                  className="text-red-500 hover:underline ml-4"
                  onClick={() => onDeleteProduct(index)}
                >
                  Delete
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



