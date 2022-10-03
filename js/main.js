/* Eddie: make sure you get rid of all the console.logs or comment them out in final code
*/


/* eddie : comment is good but should be more desriptive
example: On initial load we have to hide the scrollbar since the list is empty
for this we are hiding the entire ul container
*/

/* Eddie: also better yet. instead of using JS, use css that way there is no delay in hiding it on page load
since css loads before js
*/
const drinksListUl = document.querySelector('ul');
drinksListUl.style.display="none"; //hides the scrollbar at the beginning.

document.querySelector("button").addEventListener("click", getDrink);

/* Eddie: this variable is not being used anywhere.
 can you remember why we put it here?*/
let drinkresults = null;

 //Get the list of drinks based on the text we typed.
function getDrink() {
    clearSelectedDrink("selected_drink");

    /* Eddie: I would rename this variable to something else. 
     choice to me suggests something we picked, as opposed to something we searched for
     and since the second step of this app is to actrually pick a recipe choice, this might be confusing  
    */
    const choice = document.querySelector("input").value;
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${choice}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // If there is another search, clear the previous one
        clearSelectedDrink("drinks");

        /* Eddie: this variable is not being used anywhere.
        can you remember why we put it here?*/
        // gives all the cocktails with the inputted drink name(example: for 'Gin'; gin fizz, gin smash... etc.),
        drinkresults = data.drinks;
        console.log(data.drinks);

        // for each cocktail result pull the data for all the cocktails, 
        // assign them onto the elements which will created
        /* Eddie: also need this comment to be more descriptive
          example: create a list item for each that we will attach to the existing ul dom element
        */
        data.drinks.forEach((obj) => {
            let li = document.createElement("li");
            li.setAttribute("id", "drinkList");
            document.getElementById("drinks").appendChild(li);

            let img = document.createElement("img");
            img.setAttribute("id", "drinkListImg")
            img.src = obj.strDrinkThumb;
            li.appendChild(img);

            let a = document.createElement("a");
            a.setAttribute("data-drinkid", obj.idDrink);
            a.textContent = obj.strDrink;
            li.appendChild(a);
            a.addEventListener("click", (event) => selectedItem(event, data.drinks)); 
        
            /* Eddie: This should not be here, its being called everytime you loop through an item
            it should only be called once when youre all done creating the li elements
            */
            drinksListUl.style.display = '';
        });
      })
      .catch((err) => {
        console.log(`error ${err}`);
    });

    /*Eddie:  The following two methods should be declared outside of this getDrink method
    otherwise what is happening is everytime someone does a search these methods get re-declared
    which is uneccesary, although the process is fast and uses very little memory its still not a good practice
    */

    // If you choose another drink from the list,it clears the previous drink display
    /* Eddie: since we changed this method so that we can use it for different elements
    we should change the comment to reflect that
    */
    function clearSelectedDrink(selector){
      let toRemoveContent = document.getElementById(selector);
      while (toRemoveContent.firstChild) {
        toRemoveContent.removeChild(toRemoveContent.firstChild);
      }
    } 
       
    // When someone clicks on a drink from the list, loop through all of the drink data
    // find the match and display it
    function selectedItem(event, drinks) {
        let drinkID = event.target.dataset.drinkid; 
        console.dir(event.target);
        clearSelectedDrink("selected_drink");
      

      drinks.forEach((drink) => {
        // if the selected drink id matches with the api drink id, display that drink
        if (drink.idDrink == drinkID) {

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
