const searchPokemon = document.getElementById('search');
const inputSearch = document.getElementById('inputSearch');
const pokemonNamePokedex = document.getElementById('pokemon-name-pokedex');
const informationImg = document.getElementById('informationImg');
const sectionID = document.getElementById('sectionID');
const IDNumber = document.getElementById('IDNumber');
const sectionType = document.getElementById('sectionType');
const pokemonType = document.getElementById('type');
const sectionShiny = document.getElementById('sectionShiny');
const shinyImg = document.getElementById('shinyImg');
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
        pokeGenerator(1, 14);
    }
    if (e == 2) {
        pokeGenerator(130, 142);
    }
    if (e == 3) {
        pokeGenerator(21, 34);
    }
    if (e == 4) {
        pokeGenerator(143, 155);
    }
};

function crearPokemon(pokemon, number){
    const img = document.createElement('img');
    img.src = pokemon.sprites.front_default;

    const div = document.createElement('div');
    div.appendChild(img);

    document.querySelector(`.play-ground${number}`).appendChild(div);
};

GetPokemon(1);
GetPokemon(2);
GetPokemon(3);
GetPokemon(4);

searchPokemon.addEventListener('click', () => {
    let valueInput = inputSearch.value; 
    if (valueInput > 905) {
        return errorSearch();
    }
    fetchApi(`${API}/pokemon/${valueInput.toLowerCase()}`)
    .then(data => pokedexSearch(data))
    .catch(err => errorSearch());
});
function pokedexSearch (pokemon) {
    informationImg.classList.remove('none');
    informationImg.src =  pokemon.sprites.front_default;
    pokemonNamePokedex.textContent = pokemon.name;
    IDNumber.innerText = pokemon.id;
    pokemonType.innerText = pokemon.types[0].type.name;
    shinyImg.classList.remove('none');
    shinyImg.src =  pokemon.sprites.front_shiny;
    sectionID.classList.remove('none');
    sectionType.classList.remove('none');
    sectionShiny.classList.remove('none');
}
function errorSearch (){
    pokemonNamePokedex.textContent = 'Pokemon Undefined';
    IDNumber.innerText = '';
    pokemonType.innerText = '';
    sectionID.classList.add('none');
    sectionType.classList.add('none');
    sectionShiny.classList.add('none');
    shinyImg.classList.add('none');
    informationImg.classList.add('none');

}