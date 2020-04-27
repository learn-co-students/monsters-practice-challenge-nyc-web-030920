
const baseUrl = "http://localhost:3000/monsters/"

const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json"
}

//////////////////////////
/////// DOM LOADER ///////
//////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  getMonsters()
  renderMonsterForm()
  formSubmitSetup()
})

//
// fetch and render // could abstract 1 more time
function getMonsters() {
  fetch(`${baseUrl}/?_limit=5`)
  .then(resp => resp.json())
  .then(monsters => { // would be a function here if abstracted
    monsters.forEach(monster => {
      renderMonster(monster)
    });
  })
}

//

function renderMonster(monster) {
  let innerDiv = document.createElement('div')
  innerDiv.dataset.id = monster.id

  innerDiv.innerHTML = `
    <h1>${monster.name}</h1>
    <p>${monster.age}</p>
    <p>${monster.description}</p>
  `
  document.getElementById('monster-container').append(innerDiv)
}

// 
//

function renderMonsterForm(){
  document.getElementById('create-monster').innerHTML = `
  <form class="add-monster-form">
    <h1>Create new monster</h1>
    <input type="text" name="name" value="" placeholder="Enter a monsters name" class="input-text"/>
    <br/>
    <input type="number" name="age" value="" placeholder="Enter a monsters Age" class="input-text"/>
    <input type="text" name="description" value="" placeholder="Monster Description" class="input-text"/>
    <input type="submit" name="submit" value="Create new Monster" class="submit"/>
  </form>
  `

}

//

function formSubmitSetup() {
  const monsterForm = document.querySelector('.add-monster-form')
  monsterForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const newMonster = createMonsterFromForm(monsterForm)
    console.log(newMonster)
    postMonster(newMonster)
  })
  
}

//input == monsterForm 
//input.name.value == monsterForm.name.value
function createMonsterFromForm(input) {
  const newMonster = {
    name: input.name.value, 
    age: input.age.value,
    description: input.description.value 
  }
  
  input.reset()
  return newMonster
}

//
//

function postMonster(newMonster) {

  fetch(baseUrl, {
    // debugger
    //const headers declared globally
    headers, 
    method: 'POST',
    body: JSON.stringify(newMonster)
  })
  .then(resp => resp.json())
  .then(monster => {
    renderMonster(monster)
  })
  .catch(err => console.log("error:", err))
}


//functon to toggle form view
//changes div containing the form display.style
// function toggleForm() {
//   showForm = !showForm

//   if (showForm) {
//     console.log()
//     newMonster.display.style = 'block'
//   } else {
//     newMonster.display.style = 'none'
//   }
// }


////////////
// unabstracted function
///////////

// function submitForm() {
//   monsterForm.addEventListener("submit", function(event){
//     event.preventDefault()

//     // takes input form form and puts into a hash 
//     // pass into stringify so db can read it in json

//     const form = event.target 
//     const name = form.name.value 
//     const age = form.age.value 
//     const description = form.description.value 
//     newMonster = {name, age, description}

//     //optimistic rendering
//     // renderMonster(newMonster)

//     fetch(baseUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//       body: JSON.stringify(newMonster)
//     }) // stop here if optomistic
//     .then(response => response.json())
//     .then(newMonster => renderMonster(newMonster))
//     // end here if pesemistic 
//   })

//   toggleForm()
// }
