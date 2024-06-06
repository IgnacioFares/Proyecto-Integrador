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
      const response = await axios.post('/administracion/caracteristicas/create', newFeature).then(response => {return response});
      setFeatures([...features, response.data]);
      setNewFeature({ nombre: '', logoUrl: '' });
    } catch (error) {
      setError('Error al agregar la característica.');
    }
  };

  const handleDeleteFeature = async (id) => {
    try {
      await axios.delete(`/administracion/caracteristicas/delete/${id}`);
      setFeatures(features.filter(feature => feature.id !== id));
    } catch (error) {
      setError('Error al eliminar la característica.');
    }
  };

  const handleUpdateFeature = async () => {
    try {
      const response = await axios.put(`/administracion/caracteristicas/update/${editingFeature.id}`, editingFeature);
      setFeatures(features.map(feature => feature.id === editingFeature.id ? response.data : feature));
      setEditingFeature(null);
    } catch (error) {
      setError('Error al actualizar la característica.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Administración de Características</h1>
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
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-t">
            <th className="p-2">Nombre</th>
            <th className="p-2">Logo</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature) => (
            <tr className="border-t" key={feature.id}>
              {editingFeature && editingFeature.id === feature.id ? (
                <td className="text-center">
                  <input
                    type="text"
                    value={editingFeature.nombre}
                    onChange={(e) => setEditingFeature({ ...editingFeature, nombre: e.target.value })}
                    className="p-2 rounded"
                  />
                </td>
              ) : (
                <td className="text-center text-center">{feature.nombre}</td>
              )}
              {editingFeature && editingFeature.id === feature.id ? (
                <td className="p-2 text-center">
                  <input
                    type="text"
                    value={editingFeature.logoUrl}
                    onChange={(e) => setEditingFeature({ ...editingFeature, logoUrl: e.target.value })}
                    className="p-2 rounded"
                  />
                </td>
              ) : (
                <td className="p-2 flex justify-center">
                  <img src={feature.logoUrl} alt={feature.nombre} className="w-8 h-8" />
                </td>
              )}
              <td className="text-center">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );  
};

export default FeatureManagement;
