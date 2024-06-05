import { useState, useEffect } from 'react';
import axios from '../../axiosConfig'; // Ajusta la ruta si es necesario

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/administracion/categorias');
      setCategories(response.data);
    } catch (error) {
      setError('Error al cargar las categorías.');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    try {
      await axios.post('/administracion/categorias/create', { nombre: newCategory });
      fetchCategories(); // Actualiza las categorías después de agregar una nueva
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`/administracion/categorias/delete/${id}`);
      fetchCategories(); // Actualiza las categorías después de eliminar una
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateCategory = async () => {
    try {
      await axios.put(`/administracion/categorias/update/${editingCategory.id}`, editingCategory);
      fetchCategories(); // Actualiza las categorías después de actualizar una
      setEditingCategory(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Administración de Categorías</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border p-2 rounded"
          placeholder="Nueva categoría"
        />
        <button onClick={handleAddCategory} className="ml-2 px-4 py-2 bg-green-500 text-white rounded">
          Agregar
        </button>
      </div>
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="mb-2 flex justify-between items-center">
            {editingCategory && editingCategory.id === category.id ? (
              <input
                type="text"
                value={editingCategory.nombre}
                onChange={(e) => setEditingCategory({ ...editingCategory, nombre: e.target.value })}
                className="border p-2 rounded"
              />
            ) : (
              <span>{category.nombre}</span>
            )}
            <div>
              {editingCategory && editingCategory.id === category.id ? (
                <button onClick={handleUpdateCategory} className="ml-2 px-4 py-2 bg-green-500 text-white rounded">
                  Guardar
                </button>
              ) : (
                <button onClick={() => setEditingCategory(category)} className="ml-2 px-4 py-2 bg-green-500 text-white rounded">
                  Editar
                </button>
              )}
              <button onClick={() => handleDeleteCategory(category.id)} className="ml-2 px-4 py-2 bg-red-500 text-white rounded">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManagement;
