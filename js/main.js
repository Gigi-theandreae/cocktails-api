
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
    

      // add content to that space 
      li.textContent = obj.strDrink
      img.src = obj.strDrinkThumb
      h3.textContent = obj.strInstructions
      console.log(img)
      
      // append the child 
      document.querySelector('ul').appendChild(li)
      document.querySelector('h3').append(h3)
      document.querySelector('img').src = obj.strDrinkThumb



  

    })

   

    

    
  })
  .catch(err => {
      console.log(`error ${err}`)
  });

}

