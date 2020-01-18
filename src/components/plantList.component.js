import React, { Component } from "react";
import { Link } from "react-router-dom";

const Plant = props => (
  //Child of plantList, parent of none
  //props = plant data for one plant
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

export default class PlantList extends Component {
  //Child of TrefleBrowser and collectionBrowser, Parent of Plant
  //Props = a collection of plants with attributes in json

  constructor(props) {
    super(props);

    this.listPlants = this.listPlants.bind(this);

    this.state = {
      plants: this.props.plants
    };
  }

  listPlants() {
    //Maps the elements from props and renders plant objects
    return this.state.plants.map(current_plant => {
      return <Plant plant={current_plant} key={current_plant.id} />;
    });
  }

  render() {
    return <React.Fragment>{this.listPlants()}</React.Fragment>;
  }
}
