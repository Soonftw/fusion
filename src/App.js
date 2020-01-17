import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import PlantList from "./components/plantList.component";
import PlantDetails from "./components/plantDetails.component";
import PlantDB from "./components/plantDB.component";
import Search from "./components/search.component";
import TrefleBrowser from "./components/trefleBrowser.component";
require("dotenv").config();

function App() {
  return (
    <React.Fragment>
      <header className="App-header"></header>

      <Router>
        <div className="container">
          <Navbar />
          <Route path="/" exact component={TrefleBrowser} />
          <Route path="/plants" exact component={PlantList} />
          <Route path="/plantDB/" exact component={PlantDB} />
          <Route path="/plantdetails/:id" component={PlantDetails} />
        </div>
      </Router>
    </React.Fragment>
  );
}

// Andra routes
// <Route path="/" exact component={ExercisesList} />
// <Route path="/edit/:id" component={EditExercise} />
// <Route path="/" component={CreateExercise} />
// <Route path="/" component={CreateUser} />

export default App;
