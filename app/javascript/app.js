import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";

import Home from "./pages/home";
import Boards from "./pages/boards";

class App extends React.Component {
  render() {
    return (
      <>
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
          <div className="navbar-menu">
            <div className="navbar-start">
              <NavLink activeClassName="is-active" className="navbar-item is-tab" exact to="/">
                Home
              </NavLink>
              <NavLink activeClassName="is-active" className="navbar-item is-tab" to="boards">
                Boards
              </NavLink>
            </div>
          </div>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/boards" component={Boards} />
        </Switch>
      </>
    );
  }
}

export default App;
