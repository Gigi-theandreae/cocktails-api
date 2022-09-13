

document.querySelector("button").addEventListener("click", getDrink);
//store the list of drinks in a global variable
let drinkresults = null;

 //lets get the list of drinks based on the text we typed.
function getDrink() {
  // grab the value(drink name) from the input and pull the related data from the api
  const choice = document.querySelector("input").value;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${choice}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      
      // If there is another search, clear the first one
      let toRemoveList = document.getElementById("drinks");
      while (toRemoveList.firstChild) {
        toRemoveList.removeChild(toRemoveList.firstChild);
      }

      // gives all the drink options with the inputted drink name
      drinkresults = data.drinks;
      console.log(data.drinks);

      // for each of that drink result, pull the data of those drinks, 
      // assign them onto the 'a' elements which we will create
      data.drinks.forEach((obj) => {
        //Lets make a list
        let li = document.createElement("li");
        li.setAttribute("id", "drinkList");
        document.getElementById("drinks").appendChild(li);

        // created an element
        let a = document.createElement("a");
        // we set a data and add the idDrink number on that
        a.setAttribute("data-drinkid", obj.idDrink);
        // displayed the drink name on the element
        a.textContent = obj.strDrink;
        // appended the element to the list
        li.appendChild(a);

        // created an event listener and a local function for the drinks list. 
        a.addEventListener("click", (event) => selectedItem(event, data.drinks)); 
       
      });
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });

  //When someone clicks on a drink from the list
  // were going to loop through all of the drink data we have
  // find the match and display it
  function selectedItem(event, drinks) {
    // we set all the drinks data and assigned the drink id to that
    let drinkID = event.target.dataset.drinkid; 
    console.dir(event.target);

    // If you choose and other drink from the given options, 
    // it clears the previous drink display
    let toRemoveDrink = document.getElementById("selected_drink");
    while (toRemoveDrink.firstChild) {
      toRemoveDrink.removeChild(toRemoveDrink.firstChild);
    }
    

    //loop through all drinks list to display the selected drink
    drinks.forEach((drink) => {
      // if the clicked drink id matches with the api drink id, 
      // That's the selected one. display that drink
      if (drink.idDrink == drinkID) {
        //if theres a match lets create the HTML object
        let li = document.createElement("li");
        li.setAttribute("id", "selectedDrink");
        let h1 = document.createElement("h1");
        h1.setAttribute("id", "selectedDrinkTitle");
        h1.textContent = drink.strDrink;
        li.appendChild(h1);

        let img = document.createElement("img");
        img.src = drink.strDrinkThumb;
        li.appendChild(img);

        let p = document.createElement("p");
        p.textContent = drink.strInstructions;
        li.appendChild(p);

        document.getElementById("selected_drink").appendChild(li);
      }

      //Whenever new search is made to the input, the previous drink display is deleted
      document.querySelector("button").addEventListener("click", clearList);
      function clearList() {
        document.querySelector("ul").innerHTML = "";
      }
    });
  }
  // EOF List
}

// Get the input field
let input = document.getElementById("drinkInput");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard

  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();

    getDrink();
  }
});
