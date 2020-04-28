let pageCounter = 1
let apiUrl = `http://localhost:3000/monsters/?_limit=50&_page=${pageCounter}`

const monsterContainer = document.getElementById('monster-container')
//_limit=[number] - limit the number of monsters returned
//_page=[number] - offset your request for monsters to some page (must specify a limit)

document.addEventListener("DOMContentLoaded", event =>{
    // E X T R A C T I O N
    load(apiUrl)
    
    // P O S T 
    submitButton.addEventListener('click',event => {
        event.preventDefault()
        fetch(apiUrl,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: nameInput.value,
                age: ageInput.value,
                description: bioInput.value
            })
        })
        .then(resp => resp.json())
        .then(json => newMonsterToDOM(json))
        .catch(function(error){
            alert(`${error.message}`)
        })
    })
    
})

function load(url){
    fetch(url)
    .then(resp=> resp.json())
    .then(json => {
        monsterDOM(json)
    })
}

// PAGE FORWARD 
let forwardButton = document.getElementById('forward')
let backButton = document.getElementById('back')

forwardButton.addEventListener('click', event =>{
    monsterContainer.innerHTML=''
    pageCounter+=1
    apiUrl = `http://localhost:3000/monsters/?_limit=50&_page=${pageCounter}`
    load(apiUrl)
    console.log(apiUrl)
})

backButton.addEventListener('click', event =>{
    monsterContainer.innerHTML = ''
    pageCounter -= 1
    
    if (pageCounter < 1)
        alert ('Page Does Not Exist')
    else
    apiUrl = `http://localhost:3000/monsters/?_limit=50&_page=${pageCounter}`
    load(apiUrl)
    console.log(apiUrl)
})

function monsterDOM(hash){
    hash.forEach(element => {
        let name = element.name
        let nameElement = document.createElement('h2')
        nameElement.innerText = name
        monsterContainer.appendChild(nameElement)

        let id = element.id
        let idAttribute = document.createAttribute('api-id')
        idAttribute.value = id
        nameElement.setAttributeNode(idAttribute)

        let age = element.age
        let ageElement = document.createElement('h4')
        ageElement.innerText = age
        monsterContainer.appendChild(ageElement)

        let bio = element.description
        let bioElement = document.createElement('p')
        bioElement.innerText = bio
        monsterContainer.appendChild(bioElement)
    })
}

function newMonsterToDOM (hash){
    let name = hash.name
        let nameElement = document.createElement('h2')
        nameElement.innerText = name
        monsterContainer.appendChild(nameElement)

        let id = hash.id
        let idAttribute = document.createAttribute('api-id')
        idAttribute.value = id
        nameElement.setAttributeNode(idAttribute)

        let age = hash.age
        let ageElement = document.createElement('h4')
        ageElement.innerText = age
        monsterContainer.appendChild(ageElement)

        let bio = hash.description
        let bioElement = document.createElement('p')
        bioElement.innerText = bio
        monsterContainer.appendChild(bioElement)
}

// F O R M 
let createElement = document.getElementById('create-monster')

let formElement = document.createElement('form')
formElement.innerHTML= `<input type="text" name="name" placeholder = "enter name">
<input type="text" name="age" placeholder= 'enter age'>
<input type="text" name="bio" placeholder= 'enter description'>
<input type="submit" name="submit" value="Submit">`
createElement.appendChild(formElement)

let submitButton = document.querySelector('input[name=submit]')
let nameInput = document.querySelector('input[name=name]')
let ageInput = document.querySelector('input[name=age]')
let bioInput = document.querySelector('input[name=bio]')


