import { useState, useEffect } from 'react';
import axios from '../../axiosConfig'; // Asegúrate de que la ruta sea correcta

const FeatureManagement = () => {
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState({ nombre: '', logoUrl: '' });
  const [editingFeature, setEditingFeature] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await axios.get('/administracion/caracteristicas').then(response => {return response});
        setFeatures(response.data);
      } catch (error) {
        setError('Error al cargar las características.');
      }
    };

    fetchFeatures();
  }, []);

  const handleAddFeature = async () => {
    try {
      const response = await axios.post('/administracion/caracteristicas', newFeature).then(response => {return response});
      setFeatures([...features, response.data]);
      setNewFeature({ nombre: '', logoUrl: '' });
    } catch (error) {
      setError('Error al agregar la característica.');
    }
  };

  const handleDeleteFeature = async (id) => {
    try {
      await axios.delete(`/administracion/caracteristicas/${id}`);
      setFeatures(features.filter(feature => feature.id !== id));
    } catch (error) {
      setError('Error al eliminar la característica.');
    }
  };

  const handleUpdateFeature = async () => {
    try {
      const response = await axios.put(`/administracion/caracteristicas/${editingFeature.id}`, editingFeature);
      setFeatures(features.map(feature => feature.id === editingFeature.id ? response.data : feature));
      setEditingFeature(null);
    } catch (error) {
      setError('Error al actualizar la característica.');
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
              <>
                <span>{feature.nombre}</span>
                <img src={feature.logoUrl} alt={feature.nombre} className="w-8 h-8 ml-2" />
              </>
            )}
            <div>
              {editingFeature && editingFeature.id === feature.id ? (
                <button onClick={handleUpdateFeature} className="px-4 py-2 bg-green-500 text-white rounded">
                  Guardar
                </button>
              ) : (
                <button onClick={() => setEditingFeature(feature)} className="px-4 py-2 bg-green-500 text-white rounded">
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
