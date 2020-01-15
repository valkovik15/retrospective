import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from "react-apollo";

import App from "../app";
import { createCache, createClient } from "../utils/apollo";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <ApolloProvider client={createClient(createCache())}>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </ApolloProvider>,
    document.querySelector("#root")
  );
});
