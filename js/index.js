
let page= 1
window.addEventListener("DOMContentLoaded",function(event){ console.log()
fetchMonsters(1)
const forwardButton= document.getElementById("forward")
const backButton= document.getElementById("back")
const form=document.getElementById("monsterForm")
forwardButton.addEventListener("click", function(){ paginate(1)})
backButton.addEventListener("click", function(){paginate(-1)})
form.addEventListener("submit",function(e){monsterForm(e)})


})

function monsterForm(event){
    event.preventDefault()
    console.dir(event.target[0].value)
    const name= event.target[0].value
    const age= event.target[1].value
    const bio = event.target[2].value
fetch("http://localhost:3000/monsters",{

method: 'POST',
headers: 
{
  "Content-Type": "application/json",
  Accept: "application/json"
},
body: JSON.stringify({name: name, age: age, description:bio})
}).then(res=>res.json()).then(monster=>{addLi(monster)})

}
function addLi(monster){
    const monsterDiv= document.getElementById("monster-container")

    let div= document.createElement('div')
    div.innerHTML=`<h1>${monster.name}<h1><h2>Age:${monster.age}</h2><p>Bio: ${monster.description}</p>`
  
    monsterDiv.appendChild(div)

}
function paginate(goTo){
    
if (goTo >0){
    page++
    fetchMonsters(page)
} 
    if(goTo <0 && page >0){
        page--
        fetchMonsters(page)
    }
}
function renderMonsters(json){
    const monsterDiv= document.getElementById("monster-container")
    for(const monster of json){
    let div= document.createElement('div')
    div.innerHTML=`<h1>${monster.name}<h1><h2>Age:${monster.age}</h2><p>Bio: ${monster.description}</p>`
  
    monsterDiv.appendChild(div)
    }
}

function fetchMonsters(page){
    const urlPrefix= " http://localhost:3000/monsters/?_limit=50&_page="
   
    
    fetch(urlPrefix+page).then(resp=>resp.json()).then(json=> 
    renderMonsters(json))
    
}
