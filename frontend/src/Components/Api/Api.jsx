import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Api = ( endpoint ) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const localHost = "http://localhost:8080/";

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(localHost + endpoint);
        setProductos(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
    }, []);

    return productos;
}
export default Api;