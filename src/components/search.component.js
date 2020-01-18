import React, { Component } from "react";

export default class Search extends Component {
  //Child of trefleBrowser and collectionBrowser
  //Props = placeholder and function that handles submit
  //TODO fix search suggestions

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
