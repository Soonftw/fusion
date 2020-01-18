import React, { Component } from "react";
import axios from "axios";
import FadeIn from "react-fade-in"; //Styling for loadingbar
import Lottie from "react-lottie"; //Styling for loadingbar
import * as loadImage from "../loading"; //Styling for loadingbar
import "bootstrap/dist/css/bootstrap.css";
import PlantList from "./plantList.component";
import Search from "./search.component";

//TODO: error handling when no access to network

const TREFLE_TOKEN = process.env.REACT_APP_TREFLE_TOKEN; //Token used to request from trefle API
const API_URL =
  "https://cors-anywhere.herokuapp.com/http://trefle.io/api/plants/";

const defaultOptions = {
  //Options used for formatting the loading bar when fetching API request
  loop: true,
  autoplay: true,
  animationData: loadImage.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

class TrefleBrowser extends Component {
  //Treflebrowser is parent of Search and PlantList
  constructor(props) {
    super(props);

    this.handleOnSubmit = this.handleOnSubmit.bind(this);

    this.state = {
      done: undefined, //Determined whether to show loading bar or plantList component
      plants: []
    };
  }

  componentDidMount() {
    //fetch 20 plants to fill initial view with data
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
    //Gets called when the search form is submitted in the search component
    e.preventDefault(); //Stops the page from refreshing
    let searchString = e.target[0].value; //Get the form value
    this.setState({ done: undefined });
    //Start loading data using the form value as query
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
        <div className="row" id="searchRow">
          <div className="col-md-12">
            <h1>Browse Plants</h1>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Search
                placeHolder="Browse for plants..."
                onSubmit={this.handleOnSubmit}
              />
            </div>
          </div>
        </div>

        <div className="row" id="trefleDataRow">
          <div className="col-md-12">
            {!this.state.done ? ( //If the data is not yet retrieved - show loading bar
              <FadeIn>
                <div className="d-flex justify-content-center align-items-center">
                  <h1>Loading flowers from database</h1>
                  <Lottie options={defaultOptions} height={120} width={120} />
                </div>
              </FadeIn>
            ) : (
              //Else show table of plant data
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
                    <PlantList plants={this.state.plants} />
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default TrefleBrowser;
