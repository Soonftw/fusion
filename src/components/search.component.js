import React, { Component } from "react";
import axios from "axios";

const TREFLE_TOKEN = process.env.REACT_APP_TREFLE_TOKEN;
const API_URL =
  "https://cors-anywhere.herokuapp.com/http://trefle.io/api/plants/";

class Search extends Component {
  state = {
    query: "",
    results: []
  };

  componentDidMount() {
    console.log(this.props.onSubmit);
  }

  render() {
    return (
      <form
        className="form-inline active-cyan-4"
        onSubmit={this.props.onSubmit}
      >
        <input
          className="form-control form-control-sm mr-3 w-75"
          type="text"
          placeholder={this.props.placeHolder}
          aria-label="Search"
        />
        <i className="fas fa-search" aria-hidden="true"></i>
      </form>
    );
  }
}

export default Search;
