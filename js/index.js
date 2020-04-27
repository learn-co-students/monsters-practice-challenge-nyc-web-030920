

document.addEventListener('DOMContentLoaded', (event) => {
const monstersDiv = document.querySelector("#monster-container")
let pageNum = 1;
let baseUrl = "http://localhost:3000/monsters?_limit=10"

function getMonsters() {
    return fetch(`${baseUrl}&_page=${pageNum}`)
  .then(response => response.json())
  .then(monsters => {
    monsters.forEach(function(monster){
        const div = document.createElement('div')
        div.dataset.id = monster.id
        div.innerHTML = `
        <h2> Name: ${monster.name}</h2>
        <h4> Age: ${monster.age} </h4>
        <p> Bio: ${monster.description} </p>
        `
        monstersDiv.append(div)
    }) // end of create for each

  }) // end of fetch

} // end of fetmonsters func

getMonsters()

  const createDiv = document.querySelector("#create-monster")
  createDiv.innerHTML = `
  <form id="monster-form" >
          Monster Name: <input id="name">
          Monster Age: <input id="age">
          Monster Description: <input id="bio">
          <button class="make-monster" type="button">Add Monster</button>
  </form>
  
  `

  // √ create form
  // √ make new monster object from form
  // √ use fetch POST to add new monster to DB
  // √ append monster to index
  
  document.addEventListener("click", function(e){
      if (e.target.className === "make-monster"){
        let newName = createDiv.querySelector("#name").value
        let newAge = createDiv.querySelector("#age").value
        let newBio = createDiv.querySelector("#bio").value

        let newMonster = {}
        newMonster.name = newName 
        newMonster.age = newAge
        newMonster.description = newBio


        fetch(baseUrl, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMonster)
          })
          .then(response => response.json())
          .then(monster => {
            const div = document.createElement('div')
            div.dataset.id = monster.id
            div.innerHTML = `
            <h2> Name: ${monster.name}</h2>
            <h4> Age: ${monster.age} </h4>
            <p> Bio: ${monster.description} </p>
        `
        monstersDiv.append(div)
        document.getElementById("monster-form").reset();
          }) // end of second then statement
          
          // end of fetch

      } // end of add monster "if"

      else if (e.target.id === "forward"){
          monstersDiv.innerHTML = ''
          pageNum += 1;
          getMonsters()
      }
      else if (e.target.id === "back"){
        monstersDiv.innerHTML = ''
          pageNum -= 1;
          getMonsters()
      }
      
  }) // end of listner



}) // end content loaded