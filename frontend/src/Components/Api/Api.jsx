import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Api = (tipo, endpoint, data) => {
  const localHost = "http://localhost:8080/";

  if (tipo === 'GET') {
    const [productos, setProductos] = useState([]);
    useEffect(() => {
      const fetchProductos = async () => {
        const response = await axios.get(localHost + endpoint);
        setProductos(response.data);
      };
      fetchProductos();
    }, []);
    return productos;
  } else {
    return axios.post(localHost + endpoint, data)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }
}

export default Api;
