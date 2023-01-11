const listContainer = document.querySelector('.list-container');
const list = document.querySelector('.poke-list');
const API = "https://pokeapi.co/api/v2";

async function fetchApi (urlApi) {
    const response = await fetch(urlApi);
    const data = await response.json();
    return data;
}

function GetPokemon(e){
    function pokeGenerator(startL, endL){
        for(var i = startL;i < endL; i++) {
            fetchApi(`${API}/pokemon/${i}/`)
            .then(data => {
                crearPokemon(data, e)
            });
        };
    };
    if (e == 1) {
        pokeGenerator(1, 11);
    }
    if (e == 2) {
        pokeGenerator(11, 21);
    }
    if (e == 3) {
        pokeGenerator(21, 31);
    }
    if (e == 4) {
        pokeGenerator(31, 41);
    }
    if (e == 5) {
        pokeGenerator(41, 51);
    }
    if (e == 6) {
        pokeGenerator(51, 61);
    }


};

function crearPokemon(pokemon, number){
    const img = document.createElement('img');
    img.src = pokemon.sprites.front_default;

    const h3 = document.createElement('h3');
    h3.textContent = pokemon.name;

    const div = document.createElement('div');
    div.appendChild(img);
    div.appendChild(h3);

    document.querySelector(`.play-ground${number}`).appendChild(div);
}; 
GetPokemon(1);
GetPokemon(2);
GetPokemon(3);
GetPokemon(4);
GetPokemon(5);
GetPokemon(6);


