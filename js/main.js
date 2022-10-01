
document.querySelector("button").addEventListener("click", getDrink);
let drinkresults = null;

 //lets get the list of drinks based on the text we typed.
function getDrink() {

    clearSelectedDrink("selected_drink");

    const choice = document.querySelector("input").value;
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${choice}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // If there is another search, clear the first one
        clearSelectedDrink("drinks");

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

            let img = document.createElement("img");
            img.setAttribute("id", "drinkListImg")
            img.src = obj.strDrinkThumb;
            li.appendChild(img);

            // created an element
            let a = document.createElement("a");
            a.setAttribute("data-drinkid", obj.idDrink);
            a.textContent = obj.strDrink;
            li.appendChild(a);
            a.addEventListener("click", (event) => selectedItem(event, data.drinks)); 
        
        });
      })
      .catch((err) => {
        console.log(`error ${err}`);
      });

        // If you choose another drink from the list, 
        // it clears the previous drink display
        function clearSelectedDrink(selector){
          let toRemoveContent = document.getElementById(selector);
          while (toRemoveContent.firstChild) {
            toRemoveContent.removeChild(toRemoveContent.firstChild);
          }
        } 
       
    //When someone clicks on a drink from the list
    // were going to loop through all of the drink data we have
    // find the match and display it
    function selectedItem(event, drinks) {
        let drinkID = event.target.dataset.drinkid; 
        console.dir(event.target);
        clearSelectedDrink("selected_drink");
      

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
      });
    } // EOF List
}

// Execute a function when the user presses a key on the keyboard
let input = document.getElementById("drinkInput");
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        getDrink();
    }
});
