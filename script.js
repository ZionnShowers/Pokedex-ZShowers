const BASE_URL = "https://pokeapi.co/api/v2/pokedex/";

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");

const randomBtn = document.getElementById("random-button");

const statusEl = document.getElementById("status");
const cardEl = document.getElementById("pokemon-card");
const teamEl = document.getElementById("team");

const showUser = (user) => {
    // document.getElementById("error").textContent = "Loading... please wait"

    document.getElementById("name").textContent = "Name: " + user.name
    document.getElementById("id").textContent = "ID: " + user.id
    document.getElementById("height").textContent = "Height: " + user.height * 10 + " meters"
    document.getElementById("weight").textContent = "Weight: " + user.weight * 10 + " kilograms"
    document.getElementById("types").textContent = "Type: " + user.types[0].type.name
    document.getElementById("picture").src = user.sprites.other.home.front_default;
    // document.getElementById("types2").textContent = user.types[1].type.name
    document.getElementById("error").textContent = ""
    document.getElementById("pokeballPic").src = "assets/pokeball_2d_open.png";

}


//Fetch using async and await
//Create a function to handle our search async function
async function handlesearch(event) {
    //Stop the page form reloading
    event.preventDefault();
    //store the user input
    const username = input.value.trim()
    
    //Refresh items
    document.getElementById("name").textContent = ""
    document.getElementById("id").textContent = ""
    document.getElementById("height").textContent = ""
    document.getElementById("weight").textContent = ""
    document.getElementById("types").textContent = ""
    document.getElementById("picture").src = ""
    //Validation
    document.getElementById("error").textContent = "Loading... please wait"
    document.getElementById("pokeballPic").src = "assets/pokeball_2d_closed.png";

    //we need to fetch our data
    // wait for the response from github
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${username}`)

    const user = await response.json();


    if (user.name === undefined) {
        document.getElementById("error").textContent = "Error! Invalid Pokemon"

        document.getElementById("pokeballPic").src = "assets/pokeball_2d_closed.png";
    }
    else {
        showUser(user)
    }
    // showUser(user)

}

// Pass the function to the listener
form.addEventListener("submit", handlesearch)

randomBtn.addEventListener("click", async function () {

    //Refresh items
    document.getElementById("name").textContent = ""
    document.getElementById("id").textContent = ""
    document.getElementById("height").textContent = ""
    document.getElementById("weight").textContent = ""
    document.getElementById("types").textContent = ""
    document.getElementById("picture").src = ""
    //Validation
    document.getElementById("error").textContent = "Loading... please wait"
    document.getElementById("pokeballPic").src = "assets/pokeball_2d_closed.png";
    //1.pick a random show id from 1 to 240

    // const maxNum = fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1000&offset=0`)

    const id = Math.floor(Math.random() * 1025) + 1;

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

    const user = await response.json();
    
    // console.log(user)
    showUser(user)

})

document.getElementById("error").textContent = "Please input a Pokemon"