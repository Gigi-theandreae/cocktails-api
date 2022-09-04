
document.querySelector('button').addEventListener ('click', getDrink)


function getDrink() {
  const choice = document.querySelector('input').value 
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${choice}`

  
  fetch (url)
  .then(res => res.json()) 
  .then(data => {
    console.log(data.drinks)


    
    data.drinks.forEach( obj => {
      console.log(obj.strDrink + obj.strDrinkThumb + obj.strInstructions)

      
      // create a space, 
      let li = document.createElement('li')
      let img = document.createElement('img')
      let h3 = document.createElement('h3')
      // let ingredient = document.createElement('h4')
    

      // add content to that space 
      li.textContent = obj.strDrink
      img.src = obj.strDrinkThumb
      h3.textContent = obj.strInstructions
      // ingredient.textContent = obj.strIngredient
      console.log(img)
      
      // append the child 
      document.querySelector('ul').appendChild(li)
      document.querySelector('h3').append(h3)
      document.querySelector('img').src = obj.strDrinkThumb
      // document.querySelector('h4').append(ingredient)



      


      // for (let i = 1; i < 20; i++) {
      // console.log(i);
      // let ingredient = document.createElement('ons-list-item');
      // ingredient.innerHTML = obj.strIngredient[`strIngredient${i}`];
      // }

    })

   


    // document.querySelector('h2').innerText = data.drinks[0].strDrink
    // document.querySelector('img').src = data.drinks[0].strDrinkThumb
    // document.querySelector('h3').innerText = data.drinks[0].strInstructions

    

    
  })
  .catch(err => {
      console.log(`error ${err}`)
  });

}

