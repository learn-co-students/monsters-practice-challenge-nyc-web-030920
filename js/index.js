document.addEventListener('DOMContentLoaded', function () {
    let newMonster = document.getElementById('create-monster');
    let back = document.getElementById('back')
    let foward =document.getElementById('forward') 
    let page = 1
	newMonster.innerHTML = `
<form id='f'>
  <label for="name">Name:</label><br>
  <input type="text" id="name" name="name" ><br>
  <label for="age">Age:</label><br>
  <input type="text" id="age" name="age"><br>
  <label for="description">Description:</label><br>
  <input type="text" id="description" name="description" ><br>
  <input type="submit" value="Create Monster">
</form> 
`;
//=============================================================================
back.addEventListener('click', goBack)
    forward.addEventListener('click', getMore)
//--------------------------------------------------------------------------
    let monsterContainer = document.getElementById('monster-container');
    function getMonsters() {
	fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
		.then((resp) => resp.json())
		.then((monsters) => {
			monsters.forEach(function (monster) {
				let div = document.createElement('div');
				div.dataset.id = monster.id;
				monsterContainer.appendChild(div);
				div.innerHTML = `
    <h1>${monster.name}</h1>
    <h3>age: ${monster.age}</h3>
    <p>Bio: ${monster.description}</p>
    `;
			});
        });
    }
    getMonsters()
//--------------------------------------------------------------------------------
	let form = document.getElementById('f');
	form.addEventListener('submit', function (e) {
		e.preventDefault();
		let name = e.target.name.value;
		let age = e.target.age.value;
		let description = e.target.description.value;

		fetch('http://localhost:3000/monsters', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				name,
				age,
				description,
			}),
		})
			.then((resp) => resp.json())
			.then((monsters) => {
				console.log(monsters);
				let divs = document.createElement('div');
				divs.dataset.id = monsters.id;
				divs.innerHTML = `
        <h1>${monsters.name}</h1>
        <h3>age: ${monsters.age}</h3>
        <p>Bio: ${monsters.description}</p>
        `;
				monsterContainer.appendChild(divs);
			})
			.catch((error) => console.log(error));
    });
//=============================================================================================
function goBack() {
    if (page === 1) {
      alert("Can't go back.")
    } else {
        monsterContainer.innerHTML = ''
        --page
        getMonsters()
    }
 }
 
 function getMore() {
    if (monsterContainer.childElementCount <= 19) {
      alert("No More Monsters to Show!")
     } else {
        monsterContainer.innerHTML = ''
        ++page
        getMonsters()
     }
 }
});
