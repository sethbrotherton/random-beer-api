import React from "react";
import "./Favorites.css";

const Favorites = ({ favorites, deleteFavorite }) => {
  return (
    <div className="beers-container">
      {favorites.length ? (
        favorites.map(favorite => {
          return (
            <div key={favorite.id} className="beer-card">
              <i className="fas fa-heart icons" />
              <h2 className="beer-name">{favorite.name}</h2>
              <h4 className="beer-tagline">{favorite.tagline}</h4>
              <p className="beer-abv">ABV - {favorite.abv}%</p>
              <div>
                <img src={favorite.image_url} className="beer-pic" alt="beer" />
                <p className="beer-description">{favorite.description}</p>
                <button onClick={() => deleteFavorite(favorite.id)}>
                  Remove from favorites
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <h1>YOU DON'T HAVE ANY FAVORITE BEERS YET!</h1>
      )}
    </div>
  );
};

export default Favorites;
