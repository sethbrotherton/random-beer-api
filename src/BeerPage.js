import React from "react";
import { Link } from "react-router-dom";
import "./BeerPage.css";
import Favorites from "./Favorites";
import { uniq } from "lodash";

class BeerPage extends React.Component {
  state = {
    beers: [],
    favorites: [],
    showFavorites: false
  };

  componentWillMount = () => {
    sessionStorage.getItem("beers") &&
      this.setState({
        beers: JSON.parse(sessionStorage.getItem("beers")),
        favorites: JSON.parse(sessionStorage.getItem("favorites"))
      });
  };

  componentDidMount() {
    if (!this.state.beers.length) {
      this.fetchBeer();
    }
  }

  fetchBeer = () => {
    try {
      fetch(`https://api.punkapi.com/v2/beers/random`)
        .then(response => response.json())
        .then(result =>
          this.setState({
            beers: result.concat(this.state.beers)
          })
        );
    } catch (error) {
      console.log(error);
    }
  };

  componentWillUpdate = (nextProps, nextState) => {
    sessionStorage.setItem("beers", JSON.stringify(nextState.beers));
    sessionStorage.setItem("favorites", JSON.stringify(nextState.favorites));
  };

  addToFavorites = id => {
    var selected = this.state.beers.filter(beer => beer.id === id);
    console.log(selected);
    let favoritesCopy = [...this.state.favorites];
    let uniqFavorites = uniq(selected.concat(favoritesCopy));

    this.setState({
      favorites: uniqFavorites
    });
    console.log(this.state.favorites);
  };

  toggleFavorites = () => {
    this.setState({
      showFavorites: !this.state.showFavorites
    });
  };

  deleteFavorite = id => {
    var newFavorites = this.state.favorites.filter(beer => beer.id !== id);
    this.setState({
      favorites: newFavorites
    });
  };

  render() {
    return (
      <div>
        <button className="beer-me-button" onClick={() => this.fetchBeer()}>
          BEER ME!
        </button>
        <button className="which-beers" onClick={() => this.toggleFavorites()}>
          SHOW{" "}
          {this.state.showFavorites
            ? "MY RANDOM BEERS"
            : "THE BEERS I WANT TO TRY"}
        </button>
        {this.state.showFavorites ? (
          <Favorites
            favorites={this.state.favorites}
            deleteFavorite={this.deleteFavorite}
          />
        ) : (
          <div className="beers-container">
            {this.state.beers.map(beer => {
              return (
                <div className="beer-card">
                  <Link to={`/${beer.id}`} key={beer.id}>
                    <h2 className="beer-name">{beer.name}</h2>
                    <h4 className="beer-tagline">{beer.tagline}</h4>
                    <p className="beer-abv">ABV - {beer.abv}%</p>
                    <div>
                      <img
                        src={beer.image_url}
                        className="beer-pic"
                        alt="beer"
                      />
                      <p className="beer-description">{beer.description}</p>
                    </div>
                  </Link>
                  <button
                    className="favorite-button"
                    onClick={() => this.addToFavorites(beer.id)}
                  >
                    Add to favorites
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default BeerPage;
