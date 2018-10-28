import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import BeerPage from "./BeerPage";
import BeerDetails from "./BeerDetails";
import "./App.css";

class App extends React.Component {
  state = {
    activeTab: 0,
    beers: [],
    favorites: [{ name: "tasty", tagline: "drink me" }]
  };

  handleTabChange = index => {
    this.setState({
      activeTab: index
    });
    console.log(this.state.activeTab);
  };

  addToFavorites = i => {
    this.setState(state => {
      const favorited = this.state.beers.map((beer, j) => {
        if (j === i) {
          return beer;
        } else {
          return null;
        }
      });
      console.log(favorited);
      return {
        favorites: [{ ...favorited }, ...this.state.favorites]
      };
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Link to="/">
            <h1 className="page-heading">RANDOM BEERS IN REACT</h1>
          </Link>
          <Switch>
            <Route exact path="/" component={BeerPage} />
            <Route path="/:id" component={BeerDetails} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
