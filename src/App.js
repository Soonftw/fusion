import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import PlantList from "./components/plantList.component";
import PlantDetails from "./components/plantDetails.component";
// import ExercisesList from "./components/exercises-list.component";
// import EditExercise from "./components/edit-exercise.component";
// import CreateExercise from "./components/create-exercise.component";
// import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />

          <br/>
          <Route path="/plants" exact component={PlantList} />
          <Route path="/plantdetails/:id" component={PlantDetails} />
        </div>
    </Router>
  );
}

// Andra routes
// <Route path="/" exact component={ExercisesList} />
// <Route path="/edit/:id" component={EditExercise} />
// <Route path="/" component={CreateExercise} />
// <Route path="/" component={CreateUser} /> 


export default App;
