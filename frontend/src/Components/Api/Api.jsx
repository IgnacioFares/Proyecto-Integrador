import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Api = ( tipo,endpoint,data ) => {
  const localHost = "http://localhost:8080/";
  
  if(tipo === 'GET'){
    const [productos, setProductos] = useState([]);
    useEffect(() => {
      const fetchProductos = async () => {
          const response = tipo === 'GET' ? await axios.get(localHost + endpoint) : await axios.post(localHost + endpoint, data);
          setProductos(response.data);
      };
      fetchProductos();
      }, []);
    return productos;
  }else{
    const response = axios.post(localHost + endpoint, data);
    return response.status;
  }

   
}

const ApiPost = ( tipo,endpoint,data ) => {
  const localHost = "http://localhost:8080/";
  axios.post(localHost + endpoint, data);
}
export default Api;