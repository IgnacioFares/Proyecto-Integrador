import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Api = ( tipo, endpoint, data ) => {
  // el tipo define la funcion que va a realizar el axios, enviar con mayusculas
  // el endpoint es el nombre al que hay que apuntar para conseguir los datos ej: productos
  // enviar data en forma de objeto
  // const [productos, setProductos] = useState([]);
  const localHost = "http://localhost:8080/";

  // useEffect(() => {
  //   const fetchProductos = async () => {
        const response = tipo == 'GET' ?  axios.get(localHost + endpoint) :  axios.post(localHost + endpoint, data);
    //     setProductos(response.data);
    // };

    // fetchProductos();
    // }, []);

    return response.data;
}
export default Api;