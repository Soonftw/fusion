import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          Cappuccino
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/plants" className="nav-link">
                Plant database
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/plantDB" className="nav-link">
                My baskets
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
