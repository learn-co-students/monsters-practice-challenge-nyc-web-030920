let page = 1
const monsterContainer = document.querySelector('#monster-container')

document.addEventListener('DOMContentLoaded', () => {
    fetchMonsters()
})

const fetchMonsters = (page) => {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(response => response.json())
    .then(monsters => {
        monsters.forEach(monster => renderMonsters(monster))
    })
}


const renderMonsters = (monster) => {
    monsterContainer.innerHTML += `
    <h3>${monster.id}: ${monster.name}</h3>
    <p>${monster.age}</p>
    <p>${monster.description}<p>
    `
};

const fetchMoreMonsters = (function() {
    document.addEventListener('click', function(event){
        let button = (event.target)
        if(button.id === 'forward'){
            monsterContainer.innerHTML = ''
            page = page + 1
            fetchMonsters(page)
        }
        if (button.id === 'back'){
            if ( page > 1) {
                monsterContainer.innerHTML = ''
                page = page - 1
                fetchMonsters(page)
            } else {
                alert('No More Monsters This Way Mate!')
            }
        }
    })
})();

const createMonster = (function() {
    const monsterForm = document.querySelector('.add-monster-form')
    monsterForm.addEventListener('click', function(event) {
        event.preventDefault()
        let monster = event.target.parentElement
        let name = monster.name.value
        let age = monster.age.value
        let description = monster.description.value
        fetch('http://localhost:3000/monsters', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                age: age,
                description: description
            })
        })
    })
})();

        


