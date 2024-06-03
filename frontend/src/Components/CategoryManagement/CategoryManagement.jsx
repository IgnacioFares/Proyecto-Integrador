import { useState, useEffect } from 'react';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/administracion/categorias');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setError('Error al cargar las categorías.');
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    try {
      const response = await fetch('/administracion/categorias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: newCategory }),
      });

      if (!response.ok) {
        throw new Error('Error al agregar la categoría.');
      }

      const newCategoryData = await response.json();
      setCategories([...categories, newCategoryData]);
      setNewCategory('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const response = await fetch(`/administracion/categorias/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la categoría.');
      }

      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateCategory = async () => {
    try {
      const response = await fetch(`/administracion/categorias/${editingCategory.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingCategory),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la categoría.');
      }

      const updatedCategory = await response.json();
      setCategories(categories.map(category => (category.id === editingCategory.id ? updatedCategory : category)));
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
                <button onClick={handleUpdateCategory} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
                  Guardar
                </button>
              ) : (
                <button onClick={() => setEditingCategory(category)} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
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
