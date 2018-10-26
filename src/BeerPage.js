import React from "react";
import { Link } from "react-router-dom";

class BeerPage extends React.Component {
  state = {
    beers: []
  };

  componentDidMount() {
    try {
      fetch(`https://api.punkapi.com/v2/beers/random`)
        .then(response => response.json())
        .then(result =>
          this.setState({ beers: this.state.beers.concat(result) })
        );
    } catch (error) {
      console.log(error);
    }
  }

  fetchBeer = () => {
    fetch(`https://api.punkapi.com/v2/beers/random`)
      .then(response => response.json())
      .then(result =>
        this.setState({ beers: result.concat(this.state.beers) })
      );
  };

  render() {
    return (
      <div>
        <button onClick={() => this.fetchBeer()}>BEER ME!</button>
        {this.state.beers.map(beer => {
          return (
            <Link to={`/${beer.id}`} key={beer.id}>
              <div className="beer-card">
                <h2>{beer.name}</h2>
                <h4 className="beer-tagline">{beer.tagline}</h4>
                <p>ABV - {beer.abv}%</p>
                <div>
                  <img src={beer.image_url} className="beer-pic" />
                  <p className="beer-description">{beer.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default BeerPage;
