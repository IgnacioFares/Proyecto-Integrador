import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    return (
        <div className="transform scale-90 max-w-xs rounded overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img className="w-full" src={product.image} alt={product.name} />
            <div className="px-4 py-2">
                <div className="font-bold text-lg mb-2">{product.name}</div>
                <p className="text-gray-700 text-base">
                    {product.description}
                </p>
            </div>
            <div className="px-4 pt-2 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{product.category}</span>
                <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${product.price}</span>
            </div>
            <div className="px-4 py-5">
                <Link to={`/detalle/${product.id}`} className="link-card">Ver detalle</Link>
            </div>
        </div>
    );
}

export default ProductCard;