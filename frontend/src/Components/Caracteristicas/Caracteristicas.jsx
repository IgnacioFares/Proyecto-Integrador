import { useState, useEffect } from 'react';
import axios from '../../axiosConfig';

const Caracteristicas = () => {
    const [features, setFeatures] = useState([]);

    useEffect(() => {
      const fetchFeatures = async () => {
        try {
          const response = await axios.get('/administracion/caracteristicas').then(response => {return response.data});
          setFeatures(response);
        } catch (error) {
          console.error('Error al cargar las características', error);
        }
      };
      fetchFeatures();
    }, []);
  
    return (
      <div className="border-t border-gray-200 mt-4 pt-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">¿Caracteristicas del Lugar?</h3>
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div key={feature.id} className="flex items-center">
              <img src={feature.logoUrl} className="max-w-12"></img>
              <span className="text-sm text-gray-700">{feature.nombre}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Caracteristicas;