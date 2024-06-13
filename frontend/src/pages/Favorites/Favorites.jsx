import React from "react";
import ProductCard from "../../Components/PorductCard/ProductCard"; // Asegúrate de que esta ruta sea correcta

const Favorites = ({ favorites, removeFromFavorites }) => {
    if (favorites.length === 0) {
        return <div className="mt-20 ml-20">No hay productos favoritos.</div>;
    }

    return (
        <div className="mt-20 ml-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {favorites.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        removeFromFavorites={removeFromFavorites}
                        isFavorite={true}
                    />
                ))}
            </div>
        </div>
    );
};

export default Favorites;
