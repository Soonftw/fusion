import React, { Component } from "react";
import axios from "axios";
import SearchField from "react-search-field";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";
import "bootstrap/dist/css/bootstrap.css";
import * as loadImage from "../loading.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadImage.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const Plant = props => (
  <tr>
    <td>
      <Link to={"/plantdetails/" + props.plant.id}>
        {props.plant.common_name}
      </Link>
    </td>
    <td>{props.plant.scientific_name}</td>
    <td>{props.plant.id}</td>
  </tr>
);

{
  /* <img src={props.plant.images[0].url} alt="hej0" height='260' width='260' /> */
}

export default class PlantList extends Component {
  constructor(props) {
    super(props);

    this.trefleToken = "QXBCaXgzaWtqK3JyRVFaMHBJSnJVUT09"; //Move to environment variables

    this.onEnter = this.onEnter.bind(this);

    this.state = {
      done: undefined,
      plants: []
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://trefle.io/api/plants/?token=" +
          this.trefleToken +
          "&page_size=20&q=japanese"
      )
      .then(response => {
        this.setState({ done: true, plants: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  listPlants() {
    console.log(this.state.plants[0]);
    return this.state.plants.map(current_plant => {
      return <Plant plant={current_plant} key={current_plant.id} />;
    });
  }

  onEnter(e) {
    this.setState({
      searchString: e.target.value
    });
    console.log(e.target.value);
  }

  render() {
    return (
      <div>
        <div>
          <h1>Search</h1>
        </div>
        <div>
          <SearchField placeHolder="Search..." onSearchClick={this.onEnter} />
        </div>

        <div>
          {!this.state.done ? (
            <FadeIn>
              <div class="d-flex justify-content-center align-items-center">
                <h1>Browsing the little flowers ofc</h1>
                <Lottie options={defaultOptions} height={120} width={120} />
              </div>
            </FadeIn>
          ) : (
            <div>
              <h3>Plants</h3>
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th>Common name</th>
                    <th>Scientific name</th>
                    <th>id</th>
                  </tr>
                </thead>
                <tbody>{this.listPlants()}</tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
}
