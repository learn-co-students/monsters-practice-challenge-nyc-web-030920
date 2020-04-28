const baseUrl = 'http://localhost:3000/monsters';
let page = 1;
const limit = 50;
const monsterForm = document.querySelector('#create-monster');
const monsterContainer = document.querySelector('#monster-container');
const backBtn = document.querySelector('#back');
const forwardBth = document.querySelector('#forward');


//1.fetch first 50 monsters
//2.add lisenter to button 
//3.create form 
document.addEventListener('DOMContentLoaded', function () {

    monsterForm.append(createMonsterForm());
    fetchMonster();
    listenToButton();
})

function fetchMonster() {
    const url = `http://localhost:3000/monsters?_limit=${limit}&_page=${page}`
    fetch(url)
        .then(res => res.json())
        .then(function (monsters) {
            monsters.forEach(function (monster) {
                showMonster(monster);
            })
        })
}

function showMonster(monster) {
    let div = document.createElement('div');
    div.innerHTML = `
    <h2>${monster['name']}</h2>
    <h4>Age: ${monster['age']}</h4>
    <p>Bio: ${monster['description']}</p>
    `
    monsterContainer.append(div);
}

function listenToButton() {
    backBtn.addEventListener('click', function () {
        backPage();
    })

    forwardBth.addEventListener('click', function () {
        forwardPage();
    })
}

function backPage() {
    if (page === 1) {
        alert("Can't go back!!!")
    } else {
        page -= 1;
        monsterContainer.innerHTML = ``;
        fetchMonster();
    }
}

function forwardPage() {
    if (monsterContainer.childElementCount <= 19) {
        alert("Can't go further!");
    } else {
        page += 1;
        monsterContainer.innerHTML = ``;
        fetchMonster();
    }
}


function createMonsterForm() {
    let newForm = document.createElement('form');
    newForm.innerHTML = `
    <input type='text' name='name' placeholder='name...'>
    <input type='text' name='age' placeholder='age...'>
    <input type='text' name='description' placeholder='description...'>
    <input type='submit' value='Create'>
    `
    newForm.addEventListener('submit', function (event) {
        let form = event.target;
        addNewMonster(form);
    })
    return newForm;
}

function addNewMonster(monster) {
    let newObj = {
        "name": monster.name.value,
        "age": monster.age.value, 
        "description": monster.description.value
    }

    fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            accept: "application/json"
        }, 
        body: JSON.stringify(newObj)
    })
    .then(res => res.json())
    .then(function(result) {
        showMonster(result);
    })
}