import { useState } from 'react';
import ProductCard from './ProductCard';

const products = [
    { id: 1, name: 'Cancha 1', description: 'Descripción breve 1', category: 'Fútbol', price: 100, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Cancha 2', description: 'Descripción breve 2', category: 'Fútbol', price: 120, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Cancha 3', description: 'Descripción breve 3', category: 'Fútbol', price: 140, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Cancha 4', description: 'Descripción breve 4', category: 'Fútbol', price: 160, image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Cancha 5', description: 'Descripción breve 5', category: 'Fútbol', price: 180, image: 'https://via.placeholder.com/150' },
    { id: 6, name: 'Cancha 6', description: 'Descripción breve 6', category: 'Fútbol', price: 200, image: 'https://via.placeholder.com/150' },
    { id: 7, name: 'Cancha 7', description: 'Descripción breve 7', category: 'Fútbol', price: 220, image: 'https://via.placeholder.com/150' },
    { id: 8, name: 'Cancha 8', description: 'Descripción breve 8', category: 'Fútbol', price: 240, image: 'https://via.placeholder.com/150' },
    { id: 9, name: 'Cancha 9', description: 'Descripción breve 9', category: 'Fútbol', price: 260, image: 'https://via.placeholder.com/150' },
    { id: 10, name: 'Cancha 10', description: 'Descripción breve 10', category: 'Fútbol', price: 280, image: 'https://via.placeholder.com/150' },
];

const ProductList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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


