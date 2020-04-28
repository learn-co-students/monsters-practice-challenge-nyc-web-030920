// This is the URL needed to fetch the data for the application.
let page = 1;
function url(page){
    /* The limit makes sure that only 10 objects are fetched and not 
    the whole 1001 that comes with the original fetch data. The page
    will be incremented for each GET request.*/
    return `http://localhost:3000/monsters/?_limit=50&_page=${page}`;
}

// This gets the element by it's ID and sets it to a value of monsterContainer and createMonster.
const monsterContainer = document.getElementById('monster-container');
const createMonster = document.getElementById('create-monster');

// Creates a new button element.
const button = document.createElement('button');

// Creates text content for the button element so it will output "Create a New Monster".
button.textContent = "Create a New Monster";

// This inserts the button before the createMonster div in the HTML.
document.body.insertBefore(button, createMonster);

// Creates content for the next page button
const nextPageButton = document.getElementById('forward');
nextPageButton.textContent = "Next Page";

// Creates content for the back page button
const backPageButton = document.getElementById('back');
backPageButton.textContent = "Go Back";

/* This event listener is needed to load the content onto the DOM. 
Functions will only appear onto the page when called inside the event listener, hence the reason
why receiveData, renderForm, and submitForm are being called inside. */
document.addEventListener("DOMContentLoaded", function(){
    receiveData(page);
    renderForm();
    submitForm();

    // This listens on the click of the buttons to go to the next page or previous page.
    document.addEventListener("click", function(event){
        // If the event is targeting the id, which is the button id "forward", it will perform the logic inside.
        if(event.target.id === 'forward'){
            /* If the data inside the monster container is less than 50 it will alert that the user is on the last page &
            the reason for that is because when we fetch the data we are limiting only to 50 per page.*/
            if(monsterContainer.childElementCount < 50){
                alert('on the last page');
            }
            // Else it'll increment the page counter and go to the next page.
            else{
                monsterContainer.innerHTML = ``;
                receiveData(++page)
            }
        }
        // If the event is targeting the id, which is the button id "back", it will perform the logic inside.
        else if(event.target.id === 'back'){
            // If the page equals 1 it will alert a message telling the user they can't go back from page 1.
            if(page === 1){
                alert(`not allowed to go back from page 1`)
            }
            // Else it'll decrement the page counter and go to the previous page.
            else{
                monsterContainer.innerHTML = ``;
                receiveData(--page)
            }
        }
    })
})

// This function is in charge of fetching the data needed to have access to all the monsters and their attributes
function receiveData(page){
    fetch(url(page))
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        /* This for each receives the object fetched from the data and passes it onto the function we just
        created which will render each monster according to the limit set in the beginning of our fetch. So
        if our limit was 10 it will only render 10 monsters onto the page. */
        json.forEach(obj => {
            renderMonsters(obj);
        });
    })
}

// This function is in charge for rendering the monsters onto the page.
function renderMonsters(obj){
    // This creates a div element and it's being assigned an ID which is provided by the object id.
    const innerDiv = document.createElement('div');
    innerDiv.dataset.id = obj.id;

    // This creates an innerHTML for the div we just created and assigns it's values needed to display on the website.
    innerDiv.innerHTML = `
    <h1>${obj.name}</h1>
    <p>${obj.age}</p>
    <p>${obj.description}</p>
    `
    /* This appends the innerDiv onto the monster container which was 
    assigned in the top that is avaliable through the global scope. */
    monsterContainer.append(innerDiv);
}

// This function renders the form onto the page.
function renderForm(){
    // This creates an innerHTML for the form to be set which would be inside the createMonster div.
    createMonster.innerHTML = 
    // This form class assigns a class for the form that we're creating.
    `<form class="add-monster-form">
        <h1>Create new monster</h1>
        
        <input type="text" name="name" value="" placeholder="Enter a monsters name" class="input-text"/>
        <br/>
        <input type="number" name="age" value="" placeholder="Enter a monsters Age" class="input-text"/>
        <input type="text" name="description" value="" placeholder="Monster Description" class="input-text"/>
        <input type="submit" name="submit" value="Submit" class="submit"/>
    </form>`
}

// This function is responsible for submitting the form.
function submitForm(){

    // This event listener is listening onto the form that was inserted inside the div from the rendForm function.
    /* The event listener is listening upon the submit action which is connected to the submit button we created 
    inside the innerHTML within the renderForm function. So when the user clicks submit it will perform the logic
    inside the event listener. */
    createMonster.addEventListener("submit", function(event){
        // This prevents the webpage from refreshing after the submit executes
        event.preventDefault()
        
        // This is targeting the form created within the innerHTML inside the renderForm function.
        const form = event.target 
        
        /* This is targeting the name, age, and desciprtion that were 
        created within the innerHTML inside the renderForm function. */
        const name = form.name.value 
        const age = form.age.value 
        const description = form.description.value 

        /* This value, newMonster, is assigned to the values we just created and inserts it inside a hash. This hash
        will be used to post the data to the database. */
        newMonster = {name, age, description}
    
    // This fetches the data URL and assigns it's limit.
    fetch(`${dataURL}/?_limit=10`, {
        /* Fetch is normally assigned to a GET request so in order to post the data we have to overwrite the method to 
        POST. */
        /* What's also needed is the headers and the body, and within the body, the JSON that was fetched will be 
        formatted in a string format and passed in is the value we just created up top, newMonster. */
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newMonster)
    }) 
    .then(response => response.json())
    /* After we get our response we render the new monsters inside of the function, renderMonsters, which will then be
    displayed onto the page. */
    .then(newMonster => renderMonsters(newMonster))
    })
}



