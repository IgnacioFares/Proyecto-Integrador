import { useState, useEffect } from 'react';

const FeatureManagement = () => {
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState({ nombre: '', logoUrl: '' });
  const [editingFeature, setEditingFeature] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch('/administracion/caracteristicas');
        const data = await response.json();
        setFeatures(data);
      } catch (error) {
        setError('Error al cargar las características.');
      }
    };

    fetchFeatures();
  }, []);

  const handleAddFeature = async () => {
    try {
      const response = await fetch('/administracion/caracteristicas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFeature),
      });

      if (!response.ok) {
        throw new Error('Error al agregar la característica.');
      }

      const newFeatureData = await response.json();
      setFeatures([...features, newFeatureData]);
      setNewFeature({ nombre: '', logoUrl: '' });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteFeature = async (id) => {
    try {
      const response = await fetch(`/administracion/caracteristicas/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la característica.');
      }

      setFeatures(features.filter(feature => feature.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateFeature = async () => {
    try {
      const response = await fetch(`/administracion/caracteristicas/${editingFeature.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingFeature),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la característica.');
      }

      const updatedFeature = await response.json();
      setFeatures(features.map(feature => (feature.id === editingFeature.id ? updatedFeature : feature)));
      setEditingFeature(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Administración de Características</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-4">
        <input
          type="text"
          value={newFeature.nombre}
          onChange={(e) => setNewFeature({ ...newFeature, nombre: e.target.value })}
          className="border p-2 rounded"
          placeholder="Nueva característica"
        />
        <input
          type="text"
          value={newFeature.logoUrl}
          onChange={(e) => setNewFeature({ ...newFeature, logoUrl: e.target.value })}
          className="border p-2 rounded"
          placeholder="URL del logo"
        />
        <button onClick={handleAddFeature} className="ml-2 px-4 py-2 bg-green-500 text-white rounded">
          Agregar
        </button>
      </div>
      <ul>
        {features.map((feature) => (
          <li key={feature.id} className="mb-2 flex justify-between items-center">
            {editingFeature && editingFeature.id === feature.id ? (
              <div>
                <input
                  type="text"
                  value={editingFeature.nombre}
                  onChange={(e) => setEditingFeature({ ...editingFeature, nombre: e.target.value })}
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  value={editingFeature.logoUrl}
                  onChange={(e) => setEditingFeature({ ...editingFeature, logoUrl: e.target.value })}
                  className="border p-2 rounded"
                />
              </div>
            ) : (
              <div>
                <span>{feature.nombre}</span>
                <img src={feature.logoUrl} alt={feature.nombre} className="h-8 ml-2" />
              </div>
            )}
            <div>
              {editingFeature && editingFeature.id === feature.id ? (
                <button onClick={handleUpdateFeature} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
                  Guardar
                </button>
              ) : (
                <button onClick={() => setEditingFeature(feature)} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
                  Editar
                </button>
              )}
              <button onClick={() => handleDeleteFeature(feature.id)} className="ml-2 px-4 py-2 bg-red-500 text-white rounded">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureManagement;