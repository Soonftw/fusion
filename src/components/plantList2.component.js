import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Plant = props => (
  <tr>
    <td>
      <Link to={"/plantdetails/" + props.plant.id}>
        {props.plant.scientific_name}
      </Link>
    </td>
    <td>{props.plant.common_name}</td>
    <td>{props.plant.id}</td>
  </tr>
);

{
  /* <img src={props.plant.images[0].url} alt="hej0" height='260' width='260' /> */
}

export default class PlantList2 extends Component {
  constructor(props) {
    super(props);

    this.listPlants = this.listPlants.bind(this);

    this.state = {
      plants: this.props.plants
    };
  }

  listPlants() {
    console.log(this.state.plants);
    return this.state.plants.map(current_plant => {
      return <Plant plant={current_plant} key={current_plant.id} />;
    });
  }

  render() {
    return <React.Fragment>{this.listPlants()}</React.Fragment>;
  }
}
