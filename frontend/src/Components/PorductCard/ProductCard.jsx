import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    return (
        <div className="transform scale-90 max-w-xs rounded overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img className="w-full" src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" alt={product.nombre} />
            <div className="px-4 py-2">
                <div className="font-bold text-lg mb-2">{product.nombre}</div>
                <p className="text-gray-700 text-base">
                    {product.descripcion}
                </p>
            </div>
            <div className="px-4 pt-2 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{product.categoria}</span>
                <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${product.precio}</span>
            </div>
            <div className="px-4 py-5">
                <Link to={`/detalle/${product.id}`} className="link-card">Ver detalle</Link>
            </div>
        </div>
    );
}

export default ProductCard;