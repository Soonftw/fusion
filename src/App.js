import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import TrefleBrowser from "./components/trefleBrowser.component";
import CollectionBrowser from "./components/collectionBrowser.component";
import PlantDetails from "./components/plantDetails.component";
require("dotenv").config();

function App() {
  return (
    <React.Fragment>
      <header className="App-header"></header>
      <Router>
        <div className="container">
          <Navbar />
          <Route path="/" exact component={TrefleBrowser} />
          <Route path="/myCollection/" exact component={CollectionBrowser} />
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
