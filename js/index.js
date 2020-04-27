

const newHeaders = {
  "Content-Type": "application/json",
  "Accept": "application/json"
}
const monsterUrl = 'http://localhost:3000/monsters/'
const monsterQty = "?_limit=50"
const monsterContainer = document.querySelector('#monster-container')
let monsterPage = 1

const backBtn = document.querySelector('#back')
const forwardBtn = document.querySelector('#forward') 

document.addEventListener('DOMContentLoaded', function(event) {
    
    createMonsterForm()
    loadMonsters()
    checkBtns()
    
    const form = document.querySelector('#monster-form')
    document.addEventListener('submit', function(event) {
        event.preventDefault()
        let newMonsterForm = { name: form.name.value, age: form.age.value, description: form.description.value}
        createMonster(newMonsterForm)
        form.reset()

    })

    backBtn.addEventListener('click', function(event) {

        removeChilds()
        monsterPage --
        loadMonsters()
        checkBtns()



    })

    forwardBtn.addEventListener('click', function(event) {
        removeChilds()
        monsterPage ++
        loadMonsters()
        checkBtns()
    })
        

})

function createMonsterForm() {

    const div = document.querySelector('#create-monster')
    let monsterForm = document.createElement('form')
    monsterForm.id = 'monster-form'
    monsterForm.innerHTML = `
        <input type="text" id="name" name="name" placeholder="name...">
        <input type="text" id="age" name="age" placeholder="age..." >
        <input type="text" id="description" name="description" placeholder="description...">
        <input type="submit" value="Submit">
    `
    div.appendChild(monsterForm)

}

function createMonster(monster) {

    fetch(monsterUrl, {
        method: 'POST',
        headers: newHeaders,
        body: JSON.stringify(monster) })
        
        .then(response => response.json())
        .then(makeMonster => { newMonster(makeMonster)} )

}

function newMonster(monster) {

    
    let newMonster = document.createElement('div')
    newMonster.dataset.id = monster.id
    newMonster.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>${monster.age}</h4>
        <p>${monster.description}</p>
    `
    
        
        monsterContainer.appendChild(newMonster)


}

function loadMonsters() {

    if (monsterPage > 1) {
        fetch(monsterUrl + monsterQty + `&_page=${monsterPage}` )
            .then(response => response.json())
            .then(monsters => monsters.forEach(monster => { newMonster(monster)}))
    } else {
        fetch(monsterUrl + monsterQty )
            .then(response => response.json())
            .then(monsters => monsters.forEach(monster => { newMonster(monster)}))
    }

}

function removeChilds () {
    while(monsterContainer.lastElementChild) {
        monsterContainer.removeChild(monsterContainer.lastElementChild)
    }
}

function checkBtns() {
    if (monsterPage > 1) {
        backBtn.disabled = false
    } else {
        backBtn.disabled = true
    }
}