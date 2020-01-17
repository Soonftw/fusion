import React, { Component } from "react";
import axios from "axios";
import SearchField from "react-search-field";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";
import "bootstrap/dist/css/bootstrap.css";
import * as loadImage from "../loading";
import PlantList2 from "./plantList2.component";
import Search from "./search.component";

const TREFLE_TOKEN = process.env.REACT_APP_TREFLE_TOKEN;
const API_URL =
  "https://cors-anywhere.herokuapp.com/http://trefle.io/api/plants/";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadImage.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

class TrefleBrowser extends Component {
  constructor(props) {
    super(props);

    this.handleOnSubmit = this.handleOnSubmit.bind(this);

    this.state = {
      done: undefined,
      plants: []
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://trefle.io/api/plants/?token=" +
          TREFLE_TOKEN +
          "&page_size=20&q="
      )
      .then(response => {
        this.setState({ done: true, plants: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleOnSubmit(e) {
    e.preventDefault();
    let searchString = e.target[0].value;
    this.setState({ done: undefined });
    axios
      .get(`${API_URL}?token=${TREFLE_TOKEN}&q=${searchString}&page_size=7`)
      .then(({ data }) => {
        this.setState({
          plants: data,
          done: true
        });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Browse Plants</h1>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Search
                placeHolder="Search the little plants ofc"
                onSubmit={this.handleOnSubmit}
              />
            </div>
          </div>
        </div>

        <div className="row">
          {!this.state.done ? (
            <FadeIn>
              <div className="d-flex justify-content-center align-items-center">
                <h1>Browsing the little flowers ofc</h1>
                <Lottie options={defaultOptions} height={120} width={120} />
              </div>
            </FadeIn>
          ) : (
            <div className="col-md-12">
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th>Scientific name</th>
                    <th>Common name</th>
                    <th>id</th>
                  </tr>
                </thead>
                <tbody>
                  <PlantList2 plants={this.state.plants} />
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TrefleBrowser;
