import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  //Child of App component. Renders navigation bar at top of screen

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          Plant database
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/myCollection" className="nav-link">
                My collections
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
