

const AdminHeader = () => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <input
        type="text"
        placeholder="Buscar productos..."
        className="border p-2 rounded w-1/3"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Agregar producto</button>
    </header>
  );
};

export default AdminHeader;
