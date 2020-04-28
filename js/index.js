console.log("javascript loaded");

let currentPage = 1;
const pageLimit = 50;

const baseURL = "http://localhost:3000/monsters";

let monsterContainer;

// ?_limit=20&_page=3

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM is loaded");

    monsterContainer = document.getElementById("monster-container");
    const monsterForm = document.getElementById("create-monster").querySelector("form");

    const backButton = document.getElementById("back");
    const forwardButton = document.getElementById("forward");

    // add event listener
    monsterForm.addEventListener("submit", event => {
        event.preventDefault();
        createMonster(monsterForm);
    });

    backButton.addEventListener("click", previousPage);
    forwardButton.addEventListener("click", nextPage);

    getMonsters();
});

function createMonster(form){
    const monster = {
        name: form.name.value,
        age: form.age.value,
        description: form.description.value
    };

    console.log("NEW MONSTER", monster);

    fetch(baseURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(monster)
    })
    .then(res => res.json())
    .then(data => {
        console.log("we have added this monster");
        console.log(data);
        getMonsters();
    })
    .catch(err => console.log("Error", err));
}

function nextPage(){
    // set to next page
    currentPage++;
    getMonsters();
}

function previousPage(){
    // set to previous page
    if(currentPage > 1){
        currentPage--;
    }
    getMonsters();
}

function getMonsters(){
    console.log("GET MONSTERS");
    // read the current settings, grab those monsters
    fetch(`${baseURL}/?_limit=${pageLimit}&_page=${currentPage}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        renderMonsters(data);
    })
    .catch(err => console.log("Error", err));
}

function renderMonsters(monsters){
    monsterContainer.innerHTML = `<div>Page: ${currentPage}</div>`;
    monsters.forEach(monster => {
        const p = document.createElement("p");
        p.innerHTML = `
            <div>Name: ${monster.name}</div>
            <div>Age: ${monster.age}</div>
            <div>Description: ${monster.description}</div>
        `;
        monsterContainer.append(p);
    });
}