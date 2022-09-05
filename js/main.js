document.querySelector("button").addEventListener("click", getDrink);

function getDrink() {
  const choice = document.querySelector("input").value;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${choice}`;

  
  function selectedItem(e, drinks) {

    let drinkID = e.target.dataset.drinkid; // which link what clicked on?  whats the drink ID

    // Removed any and all selected drinks
    let toRemove = document.getElementById("selected_drink");

      while (toRemove.firstChild) {
        toRemove.removeChild(toRemove.firstChild);
     }
     //
   
     //loop through all drinks
    drinks.forEach((drink) => {

    
      // find the matching drink by ID
       if(drink.idDrink == drinkID){

        //if theres a match lets create the HTML object
          let li = document.createElement("li");

          let h1 = document.createElement("h1");
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

  }
   // EOF List

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
     // console.log("ALL DRINKS", data.drinks);

     let toRemove = document.getElementById("drinks");

     while (toRemove.firstChild) {
      toRemove.removeChild(toRemove.firstChild);
    }
 
      data.drinks.forEach((obj) => {
        /// console.log(obj.strDrink + obj.strDrinkThumb + obj.strInstructions);
        //Lets make a list

        let li = document.createElement("li");
        let a = document.createElement("a");
        a.setAttribute("data-drinkid", obj.idDrink); // This
        a.textContent = obj.strDrink;
        li.appendChild(a);
        a.addEventListener("click", (e) => selectedItem(e, data.drinks)); // This
        document.getElementById("drinks").appendChild(li);

      });
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}



/// ----- select all li from ul  display none
/// select the li with the id that I chose and show that one
// clear the previous search when enter new input (choice.clear();?)


// add an event listener to idDrink to display selected drink, and hide the other options

      
  
       

