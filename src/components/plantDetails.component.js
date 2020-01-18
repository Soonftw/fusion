import React, { Component } from "react";
import axios from "axios";
import FadeIn from "react-fade-in"; //Styling for loadingBar
import Lottie from "react-lottie"; //Styling for loadingBar
import * as loadImage from "../loading"; //Styling for loadingBar
import "bootstrap/dist/css/bootstrap.css";
import Swal from "sweetalert2";

const TREFLE_TOKEN = process.env.REACT_APP_TREFLE_TOKEN; //Token used to request from trefle API
const API_URL =
  "https://cors-anywhere.herokuapp.com/http://trefle.io/api/plants/";

const DB_API_URL = "http://localhost:4000/plants";

const defaultOptions = {
  //Options used for styling loadingBar
  loop: true,
  autoplay: true,
  animationData: loadImage.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

export default class PlantDetails extends Component {
  //Child of App, parent of plantList
  //Props = id of a plant

  constructor(props) {
    super(props);

    this.getgrowth = this.getGrowth.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);

    this.state = {
      done: undefined, //Keeps track if data is fetched
      common_name: "",
      family: "",
      scientific_name: "",
      id: 0,
      image: "",
      data: [] //Stores additional data about the plant, such as optimum humidity or irrigation
    };
  }

  componentDidMount() {
    //Load plants from psql database
    axios
      .get(API_URL + this.props.match.params.id + "?token=" + TREFLE_TOKEN)
      .then(response => {
        let imageUrl = "";
        if (!response.data.images.hasOwnProperty("0")) {
          imageUrl = "http://placekitten.com/200/300";
        } else {
          imageUrl = response.data.images[0].url;
        }

        this.setState({
          done: true,
          common_name: response.data.common_name,
          family: response.data.family_common_name,
          scientific_name: response.data.scientific_name,
          id: response.data.id,
          image: imageUrl,
          data: response.data.main_species.growth //Growth is an object that sometimes has additional data about the plant
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getGrowth() {
    //Gets the keys from the objects in data[] (Irrigation, ph etc.)
    //Then returns the data with that key
    //TODO fix smarter solution. Also need to handle keys with nested keys, like {height: {cm: bla}, {inches: bla}}

    return Object.entries(this.state.data).map(entry => {
      return (
        <tr key={entry[0]}>
          <th>{entry[0]}</th>
          <td>{JSON.stringify(entry[1])}</td>
        </tr>
      );
    });
  }

  handleOnClick(e) {
    // console.log(e);
    // console.log(this.state);
    // window.location = "/";
    this.addToDatabase();

    Swal.fire({
      icon: "success",
      title: "Nice :)",
      text: "Plant added to collection!",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ok :)"
    }).then(result => {
      if (result.value) {
        window.location = "/";
      }
    });
  }

  addToDatabase() {
    // console.log(this.state.id);
    // console.log(this.state.common_name);
    // console.log(this.state.scientific_name);
    // console.log(this.state.family);
    // console.log(this.state.image);
    axios
      .post(DB_API_URL, {
        id: this.state.id,
        common_name: this.state.common_name,
        scientific_name: this.state.scientific_name,
        family: this.state.family,
        image_url: this.state.image
      })
      .then(response => {
        console.log(response);
      })
      .catch(function(error) {
        Swal.fire({
          icon: "error",
          title: "Not nice :(",
          text: "Something went wrong..."
        });
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container">
        {!this.state.done ? ( //If not done render loading bar
          <div className="row">
            <div className="col-12-md">
              <FadeIn>
                <div
                  className="d-flex justify-content-center align-items-center"
                  id="loadingBar"
                >
                  <h1>Loading plant</h1>
                  <Lottie options={defaultOptions} height={120} width={120} />
                </div>
              </FadeIn>
            </div>
          </div>
        ) : (
          //Else render the collection of plants
          <div className="row">
            <div className="col-md-12">
              <h3>Plant Details</h3>
              <div className="row">
                <div className="col-md-8">
                  <table className="table">
                    <thead className="thead-light">
                      <tr>
                        <th>Common name</th>
                        <th>Family</th>
                        <th>Scientific name</th>
                        <th>ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{this.state.common_name}</td>
                        <td>{this.state.family}</td>
                        <td>{this.state.scientific_name}</td>
                        <td>{this.state.id}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                  <button onClick={this.handleOnClick}>
                    Add to collection
                  </button>
                </div>
                <div className="col-md-4">
                  <img
                    src={this.state.image}
                    height="260"
                    width="260"
                    alt="plant"
                  />
                </div>
              </div>

              <div className="row">
                <h3>Growth Details</h3>
                <div className="col-md-12">
                  <table className="table">
                    <thead className="thead-light">
                      <tr></tr>
                    </thead>
                    <tbody>{this.getGrowth()}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

// <tr>
// <th>Temperature mininum</th>
// <td>my ass</td>
// </tr>
// <tr>
// <th>Shade tolerance</th>
// </tr>
// <tr>
// <th>Salinity tolerance</th>
// </tr>
// <tr>
// <th>root_depth_minimum</th>
// </tr>
// <tr>
// <th>resprout_ability</th>
// </tr>
// <tr>
// <th>precipitation_minimum</th>
// </tr>
// <tr>
// <th>precipitation_maximum</th>
// </tr>
// <tr>
// <th>planting_density_minimum</th>
// </tr>
// <tr>
// <th>planting_density_maximum</th>
// </tr>
// <tr>
// <th>ph_minimum</th>
// </tr>

// <th>ph_maximum</th>
// <th>moisture_use</th>
// <th>hedge_tolerance</th>
// <th>frost_free_days_minimum</th>
// <th>fire_tolerance</th>
// <th>fertility_requirement</th>
// <th>drought_tolerance</th>
// <th>cold_stratification_required</th>
// <th>caco_3_tolerance</th>
// <th>anaerobic_tolerance</th>
