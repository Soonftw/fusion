//PlantModel Object constructor

var PlantModel = function() {
    var numberOfGuests = 1;
    var selectedDish = [];
    var currentDish = "1";
    var observers = [];
    var currentFilter = "";
    var currentType = "";


    this.getTrivia = function () {
            // console.log(id);
            var getString = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/trivia/random';

            return fetch(getString,{
                headers:{
                    'X-Mashape-Key': '3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767'
                }
          }).then(handleHTTPError)
            .then(response => response.json())
            // .then(console.log)
            // .then(data => data.results)
        }

    this.setFilter = function(filter){
        currentFilter = filter;
    }
    this.getFilter = function(){
        return currentFilter;
    }
    this.setType = function(type){
        currentType = type;
        this.notifyObservers("search");
    }
    this.getType = function(){
        return currentType;
    }
    this.resetChosenDishes = function(){
        selectedDish = [];
        this.notifyObservers();
    }
    this.setCurrentDish = function(id){
        //Sets  the id of the customer's chosen dish
        // console.log(id);

        var a = this.getDish(id).then(current => {

            currentDish = current;
            // console.log("Current dish is now: " + currentDish.title)
            this.notifyObservers("newDish");

        }).catch( error => {
          console.log(error)
            alert("Lost connection to server");
            currentDish = "-";
        });


    }

    this.getCurrentDish = function(){
        //returns the id of the dish the customer currently has clicked
        return currentDish;
    }

    this.addCurrentDish = function(){
        //Adds the selected dish to the menu
        this.addDishToMenu(currentDish);
        this.notifyObservers();
    }

    this.addObserver = function(o){
        //Adds observers to the model
        observers.push(o);
    }

    this.notifyObservers = function(arg){
        //Notifies the observers of changes in the model

        for (let o of observers) {
            o.update(arg);
        }}

	this.setNumberOfGuests = function(num) {
        //Sets the number of guests
		numberOfGuests = num;
        this.notifyObservers("changedGuests");
	}

	this.getNumberOfGuests = function() {
        //Returns the number of guests
	   return numberOfGuests;
	}

  this.getChosenDishes = function() {
      //Returns the
      return selectedDish;
  }

	//Returns all the dishes on the menu.
	var getFullMenu = function() {
        var fetchList = function() {
            for (var i = 0; i < selectedDish.length; i++) {
                var getString = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/{id}/information'.replace('{id}',selectedDish[i]);
                return fetch(getString,{
                    headers:{
                        'X-Mashape-Key': '3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767'
                    }
                }).then(handleHTTPError)
                .then(response => response.json());
            }
        }

        var menuList = fetchList().then(menuList => {
            return menuList;

        }).catch( error => {
            console.log(error);
            /* do something with the error */
        });
	}

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
  //Add remove if duplicate dish type
	this.addDishToMenu = function(id) {

        selectedDish.push(id);
	}

	//Removes dish from menu
	this.removeDishFromMenu = function(id) {

    for(var i = selectedDish.length - 1; i >= 0; i--) {
      // console.log(Number(selectedDish[i].id));
      // console.log(Number(id));
    if(Number(selectedDish[i].id) === Number(id)) {

       selectedDish.splice(i, 1);
    }
}

    this.notifyObservers();

	}

	//function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned
	this.getAllDishes = function (type,filter) {
        var getString = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=100'

        if (filter) {
            var query = filter.replace(" ", "+");
            getString += '&query='+query
        }
        if (type) {
            // var newType = type.replace(" ", "+");
            getString += '&type='+type
        }

        return fetch(getString,{
            headers:{
                'X-Mashape-Key': '3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767'
            }
      }).then(handleHTTPError)
        .then(response => response.json())
        .then(data => data.results)
        // .then(console.log)
    }




	//function that returns a dish of specific ID
	this.getDish = function (id) {
        // console.log(id);
        var getString = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/{id}/information'.replace('{id}',id);
        return fetch(getString,{
            headers:{
                'X-Mashape-Key': '3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767'
            }
      }).then(handleHTTPError)
        .then(response => response.json())
        // .then(console.log)
        // .then(data => data.results)
    }

    var handleHTTPError = function(response) {

        if(response.ok)
            // console.log(response);
            return response;
        else {
            console.log("lakjhsdlfkjhasdf");

            throw Error(response.statusText);
        }
    }

}
