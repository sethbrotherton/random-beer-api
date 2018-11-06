import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import BeerPage from "./BeerPage";
import BeerDetails from "./BeerDetails";
import "./App.css";

class App extends React.Component {
  state = {
    beers: []
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
