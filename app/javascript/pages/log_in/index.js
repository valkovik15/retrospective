import React, { memo } from "react";
import { Link } from "react-router-dom";

const LogIn = () => {
  return (
    <section className="section">
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="is-active">
            <a href="#" aria-current="page">
              Log in
            </a>
          </li>
        </ul>
      </nav>
      <h1 className="title">Log in</h1>
      <div className="field">
        <p className="control has-icons-left has-icons-right">
          <input className="input" type="email" placeholder="Email" />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-check"></i>
          </span>
        </p>
      </div>
      <div className="field">
        <p className="control has-icons-left">
          <input className="input" type="password" placeholder="Password" />
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <div className="field">
        <label className="checkbox">
          <input type="checkbox" /> Remember me
        </label>
      </div>
      <div className="field">
        <p className="control">
          <button className="button is-success">Log in</button>
        </p>
      </div>
    </section>
  );
};

export default memo(LogIn);
