import React from "react";
import "./BeerDetails.css";
import { uniq } from "lodash";

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
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        {this.state.beer.map(detail => {
          let uniqHops = uniq(detail.ingredients.hops);
          return (
            <div key={detail.id} className="beer-details-card">
              <img
                className="beer-details-pic"
                src={detail.image_url}
                alt="beer"
              />
              <h1>{detail.name}</h1>
              <h2>{detail.tagline}</h2>
              <h3>ABV - {detail.abv}%</h3>
              <h3>{detail.ibu} IBU</h3>

              <p>{detail.description}</p>
              <h3>Food Pairings</h3>
              <ul>
                <li>{detail.food_pairing[0]}</li>
                <li>{detail.food_pairing[1]}</li>
                <li>{detail.food_pairing[2]}</li>
              </ul>

              <h3>Hops brewed with:</h3>
              <ul>
                {uniqHops.map(hop => {
                  return (
                    <div key={hop.name}>
                      <li>{hop.name}</li>
                    </div>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
}

export default BeerDetails;
