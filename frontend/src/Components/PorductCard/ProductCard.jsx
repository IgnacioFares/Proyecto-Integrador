import { Link } from "react-router-dom";
import resolveArray from "../../Utils/FeaturesManager";
import { faHeart } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProductCard = ({ product, addToFavorites, removeFromFavorites, isFavorite }) => {
    // Usa la primera imagen de la lista, o una imagen de respaldo si no está disponible
    const productImage = product.imagenes && product.imagenes.length > 0
        ? product.imagenes[0].url
        : "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg";

    return (
        <div className="transform scale-90 max-w-xs rounded overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img className="w-full h-64 object-cover" src={productImage} alt={product.nombre} />
            <div className="px-4 py-2">
                <div className="font-bold text-lg mb-2">{product.nombre}</div>
                <p className="text-gray-700 text-base">
                    {product.descripcion}
                </p>
            </div>
            <div className="px-4 pt-2 pb-2 flex items-center">
                {product.caracteristicas.length > 0 && (
                    <div className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm mr-2 mb-2 inline-flex">
                        {resolveArray(product.caracteristicas)}
                    </div>
                )}
                <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${product.precio}</span>
            </div>
            <div className="px-4 py-5 flex justify-between items-center">
                <Link to={`/detalle/${product.id}`} className="inline-block bg-green-500 text-white text-center px-4 py-2 rounded-full hover:bg-green-700 transition duration-200">
                    Ver más
                </Link>
                {isFavorite ? (
                    <button 
                        onClick={() => removeFromFavorites(product)} 
                        className="text-red-500"
                    >
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                ) : (
                    <button 
                        onClick={() => addToFavorites(product)} 
                        className="text-gray-500"
                    >
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
