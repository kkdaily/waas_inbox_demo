// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from "react";
import { render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "../components/App";
import { BrowserRouter as Router } from "react-router-dom";
import ProvideAuth from "../components/ProvideAuth";

document.addEventListener("DOMContentLoaded", () => {
  render(
    <React.StrictMode>
      <ProvideAuth>
        <Router>
          <App />
        </Router>
      </ProvideAuth>
    </React.StrictMode>,
    document.body.appendChild(document.createElement("div"))
  );
});
