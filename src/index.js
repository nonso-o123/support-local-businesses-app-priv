import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import Step2 from "./components/Step2";
import Thankyou from "./components/Thankyou";
import * as serviceWorker from "./serviceWorker";

import "bootstrap/dist/js/bootstrap.bundle.min";

const routing = (
  <Router>
    <div>
      <Link to="/App"></Link>
      <Link to="/Step2"></Link>
      <Link to="/Thankyou"></Link>
      <Route path="/App" component={App} />
      <Route path="/Step2" component={Step2} />
      <Route path="/Thankyou" component={Thankyou} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
