import React from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";

import Home from "./pages/home";
import Boards from "./pages/boards";
import SignUp from "./pages/sign_up";
import LogIn from "./pages/log_in";

class App extends React.Component {
  render() {
    return (
      <>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-menu">
            <div className="navbar-start">
              <NavLink activeClassName="is-active" className="navbar-item is-tab" exact to="/">
                Home
              </NavLink>
              <NavLink activeClassName="is-active" className="navbar-item is-tab" to="boards">
                Boards
              </NavLink>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <Link className="button is-primary" to="/sign-up">
                    <strong>Sign up</strong>
                  </Link>
                  <Link className="button is-light" to="/log-in">
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/boards" component={Boards} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/log-in" component={LogIn} />
        </Switch>
      </>
    );
  }
}

export default App;
