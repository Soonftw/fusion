import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    constructor(props){
        super(props);

        this.state{

        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
    }

    render(){
        return(
            <div class="col-sm-3" style="margin-bottom:25px;padding:0px">
                <button id ="'+this.dish.id+'"style="background: url(https://spoonacular.com/recipeImages/'+this.dish.image+');height:120px;width:140px;background-size: cover;">
                </button> 
                <div style="font-size:14px; margin:0px">'+this.dish.title+'</div>    
            </div>
        )
    }

}