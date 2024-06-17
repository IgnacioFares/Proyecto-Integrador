import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../../Components/PorductCard/ProductCard';

const SearchResults = () => {
  const location = useLocation();
  const results = location.state?.results || [];
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = results.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(results.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mt-20 ml-20">
      {results.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center text-xl text-gray-500 border border-gray-300 rounded p-4">
            No se ha encontrado tu búsqueda.
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default SearchResults;
