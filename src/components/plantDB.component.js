import React, { Component } from "react";
import axios from "axios";
import SearchField from "react-search-field";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";
import "bootstrap/dist/css/bootstrap.css";
import * as loadImage from "../loading";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadImage.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

class PlantDB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      done: undefined,
      basket: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/plants")
      .then(response => {
        this.setState({ done: true, basket: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        {!this.state.done ? (
          <FadeIn>
            <div className="d-flex justify-content-center align-items-center">
              <h1>Browsing the little database ofc</h1>
              <Lottie options={defaultOptions} height={120} width={120} />
            </div>
          </FadeIn>
        ) : (
          <div>
            {this.state.basket.map(plant => (
              <div key={plant.id}>{plant.common_name}</div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default PlantDB;
