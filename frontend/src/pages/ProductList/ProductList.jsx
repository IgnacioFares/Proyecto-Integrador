import { useState, useEffect } from 'react';
import axios from '../../axiosConfig'
import ProductCard from '../../Components/PorductCard/ProductCard';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const productsPerPage = 8;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/productos').then(respuesta => { return respuesta});
                setProducts(response.data);
            } catch (err) {
                setError('Error fetching products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="mt-20 ml-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <div className="flex justify-center mt-4">
                {[...Array(totalPages).keys()].map(number => (
                    <button
                        key={number + 1}
                        onClick={() => paginate(number + 1)}
                        className={`mx-1 mb-5 px-3 py-1 rounded ${currentPage === number + 1 ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
                    >
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
