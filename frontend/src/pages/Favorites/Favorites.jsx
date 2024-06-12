import React from 'react';
import ProductCard from '../../Components/PorductCard/ProductCard';

const Favorites = ({ favorites, removeFromFavorites }) => {
  return (
    <div className="mt-20 ml-20">
      <h2>Favoritos</h2>
      {favorites.length === 0 ? (
        <p>No tienes favoritos aún.</p>
      ) : (
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
      )}
    </div>
  );
};

export default Favorites;
