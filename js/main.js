
document.querySelector('button').addEventListener ('click', getDrink)


function getDrink() {
  const choice = document.querySelector('input').value 
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${choice}`

  
  fetch (url)
  .then(res => res.json()) 
  .then(data => {
     console.log("ALL DRINKS", data.drinks);

     data.drinks.forEach((obj) => {
       /// console.log(obj.strDrink + obj.strDrinkThumb + obj.strInstructions);

       //  <li>
       //   <p>{NAME}</p>
       //   <img></img>
       //   <p></p>
       //  </li>


       // Insert hidden element
       let li = document.createElement("li");
       li.setAttribute("id", obj.idDrink);
       li.style.display = "none";

       let p = document.createElement("p");
       p.textContent = obj.strDrink;
       li.appendChild(p);

       let img = document.createElement("img");
       img.src = obj.strDrinkThumb;
       li.appendChild(img);

       let p_instructions = document.createElement("p");
       p_instructions.textContent = obj.strInstructions;
       li.appendChild(p_instructions);

       document.getElementById("selected_drink").appendChild(li);

       //Lets make a list

       li = document.createElement("li");

       let a = document.createElement("a");
       a.setAttribute("data-src", obj.idDrink);
       a.textContent = obj.strDrink;
       li.appendChild(a);

       document.getElementById("drinks").appendChild(li);
     };);
  })
  .catch(err => {
      console.log(`error ${err}`)
  });

}



/// select all li from ul  display none
/// select the li with the id that I chose and show that one