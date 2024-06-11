import  { useEffect, useState } from 'react';
import axios from '../../axiosConfig'; // Ajusta la ruta si es necesario

const Api = (endpoint) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(endpoint);
        setProductos(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [endpoint]);

  return { productos, loading, error };
}

export default Api;
