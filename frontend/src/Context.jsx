/*import React, { createContext, useState } from 'react';
import axios from 'axios';

export const GlobalContext = createContext();

export const GlobalProvider = ( {children} ) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const localHost = "http://localhost:8080/";

    const getApi = ( endpoint ) => {
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
          }, [])
    }
  
    return (
        <GlobalContext.Provider value={{ getApi }}>
            {children}
        </GlobalContext.Provider>
    )
  }*/