
document.addEventListener("DOMContentLoaded", () => {
    page = 1 
    limit= 50 
    const back = document.getElementById("back")
    const createMonsId = document.getElementById("create-monster")
    const container = document.getElementById("monster-container")

    getMonsters()
    makeForm()


    function getMonsters(){
    fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`) 
    .then(r => r.json())
    .then(monsters => monsters.forEach(makeMonster))
    }

    function makeMonster(monster) {
    container.innerHTML += `<div data-id = "${monster.id}">
    <h1>${monster.name}</h1>
    <h3>${monster.age}</h3>
    <p>${monster.description}</p>
    </div>` 
    }


    function makeForm() {
        let form = document.createElement('form')
  
        form.innerHTML =  `<form>
        
        <input type = "text" name = "name" placeholder= "Enter Monster Name">
        <input type = "text" name = "age" placeholder= "Enter Monster Age">
        <input type = "text" name = "description" placeholder= "Enter Monster description">
        <input type = "submit" value = "Submit">
        </form>`
     
        createMonsId.append(form)
    }

    createMonsId.addEventListener('submit', addMonster )
   
      function addMonster(event) {
        event.preventDefault()
        
        
        let name = event.target.name.value
        let age = event.target.age.value
        let description = event.target.description.value
    fetch("http://localhost:3000/monsters", {
     method: "POST",
     headers: {"Content-Type": "application/json",
                 Accept: "application/json"
    },
     body: JSON.stringify({name, age, description}),
    })

    .then(response => response.json())
    
    .then(r => {
        makeMonster(r)
    })
   
}

back.addEventListener("click", goBack)

function goBack(event){
    if (page === 1) {
        alert("Cant go back.")
    } else {
       container.innerHTML = ""
        --page
        getMonsters()
    }
    
}

forward.addEventListener("click", goFurther)

 function goFurther(event){
     if (container.childElementCount <= 19 )
      alert("no more monsters to show!")
      else {
          container.innerHTML = ''
          ++page
          getMonsters()
      }

}


   
    
  
  


}); 



