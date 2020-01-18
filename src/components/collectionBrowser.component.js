import React, { Component } from "react";
import axios from "axios";
import FadeIn from "react-fade-in"; //Styling for loading bar
import Lottie from "react-lottie"; //Styling for loading bar
import * as loadImage from "../loading"; //Styling for loading bar
import "bootstrap/dist/css/bootstrap.css";
import PlantList from "./plantList.component";

const API_URL = "http://localhost:4000/plants/";

const defaultOptions = {
  //Options used for formatting loading bar
  loop: true,
  autoplay: true,
  animationData: loadImage.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

export default class CollectionBrowser extends Component {
  //Component used for browsing collections of plants stored in the psql database

  constructor(props) {
    super(props);

    this.state = {
      done: undefined, //Used for notifying when fetch from psql API is complete
      collection: [] //Stores collection of plants
    };
  }
  componentDidMount() {
    axios
      .get(API_URL)
      .then(response => {
        this.setState({ done: true, collection: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className="row" id="collectionDataRow">
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
                    <PlantList plants={this.state.collection} />
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
