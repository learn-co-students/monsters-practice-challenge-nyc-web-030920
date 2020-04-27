//// When the page loads, show the first 50 monsters. Each monster's name, age, and
//// description should be shown.
////Above your list of monsters, you should have a form to create a new monster.
////You should have fields for name, age, and description, and a 'Create Monster
//// Button'. When you click the button, the monster should be added to the list
// //and saved in the API.
// //?- At the end of the list of monsters, show a button. When clicked, the button
// /should load the next 50 monsters and show them.

window.addEventListener("DOMContentLoaded", function(e){
    let page = 1
    const monsterContainer = document.getElementById("monster-container")
    const formContainer = document.getElementById("create-monster")
    const forwardButton = document.getElementById("forward")

    function getMonsters(page=1){
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(response => response.json())
        .then(json => makeMonsters(json))
    }
    function makeMonsters(json){
        json.forEach(monsterObj => {
            let card = document.createElement("div")
            card.dataset.id = monsterObj.id
            card.innerHTML =`
            <h1>Name: ${monsterObj.name}</h1>
            <h3>Age: ${monsterObj.age}</h3>
            <p>Bio: ${monsterObj.description}</p>`
            monsterContainer.append(card)
        })
    }

    function makeForm(){
        const form = document.createElement("form")
        form.innerHTML = `
            <input type="text" name="name" placeholder="Enter monster name...">
            <input type="text" name="age" placeholder="Enter monster age...">
            <input type="text" name="description" placeholder="Enter monster description...">
            <input type="submit" name="submit" value="Create Monster">`
        formContainer.append(form)
    }
    function makeMonster(monster){
        let card = `<div data-id="${monster.id}"> 
        <h1>${monster.name}</h1>
        <h3>${monster.age}</h3>
        <p>${monster.description}</p>
        </div>`
    
        monsterContainer.innerHTML += card
    }


    function addMonster(e){
        e.preventDefault()
        let name = e.target.name.value
        let age = e.target.age.value
        let desc = e.target.description.value
        let monster = {
            name: name,
            age: age,
            description: desc
        }

        fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(monster)
            })
            .then(response => response.json())
            .then(json => (makeMonster(json)))
    }
    formContainer.addEventListener("submit", addMonster)
    forwardButton.addEventListener("click",function(e){
        page = page +1
        getMonsters(page)
    })
    
    
    
    getMonsters()
    makeForm()
// END OF DOM LOADED LISTENER
})