document.querySelector("button").addEventListener("click", getDrink);

function getDrink() {
  const choice = document.querySelector("input").value;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${choice}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log("ALL DRINKS", data.drinks);

      data.drinks.forEach((obj) => {
        /// console.log(obj.strDrink + obj.strDrinkThumb + obj.strInstructions);

        //  <li><a>
        //   <h1>{NAME}</h1>
        //   <img></img>
        //   <p></p>
        //  </a></li>

        // Insert hidden element
        let li = document.createElement("li");
        li.setAttribute("id", obj.idDrink);
        


        //Lets make a list
        // li = document.createElement("li"); 

        let a = document.createElement("a");
        a.setAttribute("data-src", obj.idDrink);
        a.textContent = obj.strDrink;
        li.appendChild(a);

        document.getElementById("drinks").appendChild(li);

        
        

        document.querySelector('#drinks').addEventListener ('click', selectedItem)

        function selectedItem(){


          document.getElementById("selected_drink").appendChild(li)

          

          // how to just show the selected drink and hide the others.
          // this shows all the options with the name,img and inst.
          for (let i = 0; i < 30; i++) {
          
          let h1 = document.createElement("h1");
          h1.textContent = `obj.strDrink${i}`;
          li.appendChild(h1);

          let img = document.createElement("img");
          img.src = obj.strDrinkThumb;
          li.appendChild(img);

          let p = document.createElement("p");
          p.textContent = obj.strInstructions;
          li.appendChild(p);


          document.querySelector('a').style.display = "none"
          }
        }

        
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

      
  
       

