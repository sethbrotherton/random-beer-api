import React from "react";
import BeerPage from "./BeerPage";

class BeerDetails extends React.Component {
  state = {
    beer: []
  };

  async componentDidMount() {
    try {
      const res = await fetch(
        `https://api.punkapi.com/v2/beers/${this.props.match.params.id}`
      );
      const beer = await res.json();
      this.setState({
        beer: beer
      });
      console.log(this.state);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        {this.state.beer.map(detail => {
          return (
            <div>
              <h1>{detail.name}</h1>
              <h2>{detail.tagline}</h2>
              <h3>ABV - {detail.abv}%</h3>
              <img src={detail.image_url} alt="beer" />
              <p>{detail.description}</p>
              <ul>
                <h3>Food Pairings</h3>
                <li>{detail.food_pairing[0]}</li>
                <li>{detail.food_pairing[1]}</li>
                <li>{detail.food_pairing[2]}</li>
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
}

export default BeerDetails;
