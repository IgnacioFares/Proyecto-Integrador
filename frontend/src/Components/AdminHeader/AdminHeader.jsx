const AdminHeader = ({ onOpenAddProductModal }) => {
    return (
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="border p-2 rounded w-1/3"
        />
        <button
          onClick={onOpenAddProductModal}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Agregar Producto
        </button>
      </header>
    );
  };
  
  export default AdminHeader;