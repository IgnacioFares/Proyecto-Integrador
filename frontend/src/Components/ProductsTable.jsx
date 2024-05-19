const ProductsTable = () => {
  const products = [
    {
      name: 'Cancha Sintetica',
      description: 'Cancha para futbol con pasto sintetico',
      price: '$30',
      stock: '4'
    },
    {
      name: 'Cancha Profesional 2',
      description: 'Cancha profesional con iluminacion y pasto real ',
      price: '$100',
      stock: '2'
    },
    {
      name: 'Cancha Profesional 3',
      description: 'Cancha profesional con iluminacion y pasto real en nuestra zona principal',
      price: '$150',
      stock: '1'
    },
  ];

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
        {products.map((product, index) => (
          <tr key={index} className="border-t">
            <td className="py-2 text-center"><div className="bg-gray-300 w-12 h-12 inline-block"></div></td>
            <td className="py-2">{product.name}</td>
            <td className="py-2">{product.description}</td>
            <td className="py-2">{product.price}</td>
            <td className="py-2">{product.stock}</td>
            <td className="py-2 text-center">
              <button className="text-blue-500 hover:underline">View</button>
              <button className="text-red-500 hover:underline ml-4">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
