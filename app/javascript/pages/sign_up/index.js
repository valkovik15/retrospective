import React, { memo } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <section className="section">
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="is-active">
            <a href="#" aria-current="page">
              Sign up
            </a>
          </li>
        </ul>
      </nav>
      <h1 className="title">Sign up</h1>
      <div className="field">
        <p className="control has-icons-left">
          <input className="input" type="email" placeholder="Email" />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
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
        <p className="control has-icons-left">
          <input className="input" type="password" placeholder="Password confirmation" />
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <div className="field">
        <p className="control">
          <button className="button is-success">Sign up</button>
        </p>
      </div>
    </section>
  );
};

export default memo(SignUp);
