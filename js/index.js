document.addEventListener("DOMContentLoaded", function(event){
    const baseUrl = "http://localhost:3000/monsters"
    const limitUrl = "http://localhost:3000/monsters/?_limit=20&_page=3"
    const formDiv = document.createElement('div')
    const container = document.getElementById("monster-container")
    const nextBtn = document.getElementById('forward')
    const previousBtn = document.getElementById('back')

    const form = document.getElementById("create-monster")
    formDiv.innerHTML=`
        <div id="create-monster">
        <form id="monster-form">
            <input id="name" placeholder="name...">
            <input id="age" placeholder="age...">
            <input id="description" placeholder="description...">
            <button class=button>Create</button>
        </form>
        </div>
    `
    form.append(formDiv)
    const btn = document.querySelector("button")
    btn.addEventListener("click",function(e){
        e.preventDefault()
        const form = e.target.parentNode
        const name = form.name.value
        const age = parseInt(form.age.value)
        const description = form.description.value        
        const newMonster = {name, age, description}
       
        fetch(baseUrl,{
            method: "POST",
           headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify(newMonster)
        })
    })

    function getMonsters(){
        return fetch(limitUrl)
        .then(r=> r.json())
    }

    function getsingleMonster(id){
        return fetch(`${baseUrl}/${id}`)
        .then(r=> r.json())
    }

    function makeAMonster(monster){
        const monsterDiv = document.createElement('div')
        monsterDiv.innerHTML=`
        <h2>${monster.name}</h2>
        <h4>${monster.age}</h4>
        <p>${monster.description}</p>
       `          
        return monsterDiv
    }
    function showMonsters(){
        getMonsters().then(monsters=>{
            monsters.forEach(function(monster){
                const monsterDiv = makeAMonster(monster)
                container.append(monsterDiv)
            });
        })
    }
    showMonsters()
    
    nextBtn.addEventListener("click",function(e){
        e.preventDefault()
       const body = e.target.parentNode
        getMonsters().then(a=>{
           showMonsters()
        //    let newcontainer= document.getElementById("monster-container")
        //    document.body.replaceChild(newcontainer, container)
        })
        
    })

})
// need to finish get the page reload for next 50 and previous 50 