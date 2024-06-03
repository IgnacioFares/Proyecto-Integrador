import { useState, useEffect } from 'react';
import axios from '../../axiosConfig'; // Ajusta la ruta si es necesario
import useAuth from '../../context/useAuth'; // Importación correcta

const ProductList = () => {
    const { token } = useAuth(); // Obtener el token del contexto
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    const fetchProductos = async () => {
        try {
            const response = await axios.get('/productos').then(respuesta => { return respuesta});
            setProductos(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    fetchProductos();
    }, [token]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
    <div>
        {productos.map(producto => (
        <div key={producto.id}>
            <h2>{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
        </div>
        ))}
    </div>
    );
};

export default ProductList;
