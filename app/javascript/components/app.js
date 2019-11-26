import React from "react";
import { Link, Route, Switch } from "react-router-dom";

import Home from "./home";
import Boards from "./boards";

class App extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <Link to="boards">Boards</Link>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/boards" component={Boards} />
        </Switch>
      </div>
    );
  }
}

export default App;
