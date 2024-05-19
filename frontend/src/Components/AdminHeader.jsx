

const AdminHeader = ({ onOpenAddProductModal }) => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">VisualStudio Service</h1>
      <button
        onClick={onOpenAddProductModal}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Agregar Producto
      </button>
    </header>
  );
};

export default AdminHeader;

