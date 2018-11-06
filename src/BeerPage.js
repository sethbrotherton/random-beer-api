import React from "react";
import { Link } from "react-router-dom";
import "./BeerPage.css";

class BeerPage extends React.Component {
  state = {
    beers: []
  };

  componentWillMount = () => {
    sessionStorage.getItem("beers") &&
      this.setState({
        beers: JSON.parse(sessionStorage.getItem("beers"))
      });
  };

  // componentDidMount() {
  //   try {
  //     fetch(`https://api.punkapi.com/v2/beers/random`)
  //       .then(response => response.json())
  //       .then(result =>
  //         this.setState({
  //           beers: this.state.beers.concat(result)
  //         })
  //       );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
  };

  render() {
    return (
      <div>
        <button className="beer-me-button" onClick={() => this.fetchBeer()}>
          BEER ME!
        </button>
        <div className="beers-container">
          {this.state.beers.map(beer => {
            return (
              <Link to={`/${beer.id}`} key={beer.id}>
                <div className="beer-card">
                  <h2 className="beer-name">{beer.name}</h2>
                  <h4 className="beer-tagline">{beer.tagline}</h4>
                  <p className="beer-abv">ABV - {beer.abv}%</p>
                  <div>
                    <img src={beer.image_url} className="beer-pic" alt="beer" />
                    <p className="beer-description">{beer.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default BeerPage;
