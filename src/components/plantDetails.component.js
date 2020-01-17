import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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

export default class PlantDetails extends Component {
  constructor(props) {
    super(props);

    this.trefleToken = "QXBCaXgzaWtqK3JyRVFaMHBJSnJVUT09"; //Move to environment variables
    this.getgrowth = this.getGrowth.bind(this);

    this.state = {
      done: undefined,
      common_name: "",
      family: "",
      scientific_name: "",
      id: 0,
      image: "",
      data: []
    };
  }
  componentDidMount() {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://trefle.io/api/plants/" +
          this.props.match.params.id +
          "?token=" +
          this.trefleToken
      )
      .then(response => {
        this.setState({
          done: true,
          common_name: response.data.common_name,
          family: response.data.family_common_name,
          scientific_name: response.data.scientific_name,
          id: response.data.id,
          image: response.data.images[0].url,
          data: response.data.main_species.growth
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getGrowth() {
    console.log(this.state.common_name);
    console.log(this.state.family);
    console.log(this.state.scientific_name);
    console.log(this.state.id);
    console.log(this.state.image);
    console.log(Object.keys(this.state.data));

    return Object.keys(this.state.data).map(key => {
      return <td>{JSON.stringify(this.state.data[key])}</td>;
    });

    // return this.state.data.map(current_attribute => {
    //   return <h1>tjosan</h1>;
    // })
  }

  render() {
    return (
      <div>
        {!this.state.done ? (
          <FadeIn>
            <div class="d-flex justify-content-center align-items-center">
              <h1>Loading the little flower ofc</h1>
              <Lottie options={defaultOptions} height={120} width={120} />
            </div>
          </FadeIn>
        ) : (
          <div>
            <div>
              <h3>Plant Details</h3>
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th>Common name</th>
                    <th>Family</th>
                    <th>Scientific name</th>
                    <th>ID</th>
                    <th>image</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{this.state.common_name}</td>
                    <td>{this.state.family}</td>
                    <td>{this.state.scientific_name}</td>
                    <td>{this.state.id}</td>
                    <button>Add to collection</button>
                    <td>
                      <img src={this.state.image} height="260" width="260" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h3>Growth Details</h3>
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th>Temperature mininum</th>
                    <th>Shade tolerance</th>
                    <th>Salinity tolerance</th>
                    <th>root_depth_minimum</th>
                    <th>resprout_ability</th>
                    <th>precipitation_minimum</th>
                    <th>precipitation_maximum</th>
                    <th>planting_density_minimum</th>
                    <th>planting_density_maximum</th>
                    <th>ph_minimum</th>
                    <th>ph_maximum</th>
                    <th>moisture_use</th>
                    <th>hedge_tolerance</th>
                    <th>frost_free_days_minimum</th>
                    <th>fire_tolerance</th>
                    <th>fertility_requirement</th>
                    <th>drought_tolerance</th>
                    <th>cold_stratification_required</th>
                    <th>caco_3_tolerance</th>
                    <th>anaerobic_tolerance</th>
                  </tr>
                </thead>
                <tbody>{this.getGrowth()}</tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }
}

// temperature_minimum: 0,
//         shade_tolerance: 0,
//         salinity_tolerance: 0,
//         root_depth_minimum: 0,
//         resprout_ability: null,
//         precipitation_minimum: null,
//         precipitation_maximum: null,
//         planting_density_minimum: null,
//         planting_density_maximum: null,
//         ph_minimum: null,
//         ph_maximum: null,
//         moisture_use: null,
//         hedge_tolerance: null,
//         frost_free_days_minimum: null,
//         fire_tolerance: null,
//         fertility_requirement: null,
//         drought_tolerance: null,
//         cold_stratification_required: null,
//         caco_3_tolerance: null,
//         anaerobic_tolerance: null

// temperature_minimum: response.data.growth.temperature_minimum,
// shade_tolerance: response.data.growth.shade_tolerance,
// salinity_tolerance: response.data.growth.salinity_tolerance,
// root_depth_minimum: response.data.growth.root_depth_minimum,
// resprout_ability: response.data.growth.resprout_ability,
// precipitation_minimum: response.data.growth.precipitation_minimum,
// precipitation_maximum: response.data.growth.precipitation_maximum,
// planting_density_minimum: response.data.growth.planting_density_minimum,
// planting_density_maximum: response.data.growth.planting_density_maximum,
// ph_minimum: response.data.growth.ph_minimum,
// ph_maximum: response.data.growth.ph_maximum,
// moisture_use: response.data.growth.moisture_use,
// hedge_tolerance: response.data.growth.hedge_tolerance,
// frost_free_days_minimum: response.data.growth.frost_free_days_minimum,
// fire_tolerance: response.data.growth.fire_tolerance,
// fertility_requirement: response.data.growth.fertility_requirement,
// drought_tolerance: response.data.growth.drought_tolerance,
// cold_stratification_required: response.data.growth.cold_stratification_required,
// caco_3_tolerance: response.data.growth.caco_3_tolerance,
// anaerobic_tolerance: response.data.growth.anaerobic_tolerance
