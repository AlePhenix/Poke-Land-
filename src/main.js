const buttonDarkmode = document.getElementById('buttonDarkmode');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
const pokemonHeader = document.getElementById('pokemonHeader');
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


document.documentElement.style.setProperty('--black', '#373737')
document.documentElement.style.setProperty('--white', '#f4f4f4')
document.documentElement.style.setProperty('--midium-black', '#777')
document.documentElement.style.setProperty('--hard-gray', '#555')
document.documentElement.style.setProperty('--soft-black', '#aaa')
document.documentElement.style.setProperty('--gray', '#aaa')
document.documentElement.style.setProperty('--gray-pokeball', '#444')
document.documentElement.style.setProperty('--transparent-white', '#f4f4f4a0')
document.documentElement.style.setProperty('--transparent-black', '#373737a0')

var counter = 0;
buttonDarkmode.addEventListener('click', () => {
    if (counter == 0) {
        document.documentElement.style.setProperty('--black', '#f4f4f4');
        document.documentElement.style.setProperty('--white', '#373737');
        document.documentElement.style.setProperty('--midium-black', '#777');
        document.documentElement.style.setProperty('--hard-gray', '#555');
        document.documentElement.style.setProperty('--soft-black', '#ddd')
        document.documentElement.style.setProperty('--gray', '#ddd');
        document.documentElement.style.setProperty('--gray-pokeball', '#888');
        document.documentElement.style.setProperty('--transparent-white', '#373737a0');
        document.documentElement.style.setProperty('--transparent-black', '#f4f4f4a0');
        pokemonHeader.classList.add('pokemonDark');
        sunIcon.classList.add('none');
        moonIcon.classList.remove('none');
        console.log('light');
        counter++;
    }
    else if (counter == 1) {
        document.documentElement.style.setProperty('--black', '#373737')
        document.documentElement.style.setProperty('--white', '#f4f4f4')
        document.documentElement.style.setProperty('--midium-black', '#777')
        document.documentElement.style.setProperty('--hard-gray', '#555')
        document.documentElement.style.setProperty('--soft-black', '#aaa')
        document.documentElement.style.setProperty('--gray', '#aaa')
        document.documentElement.style.setProperty('--gray-pokeball', '#444')
        document.documentElement.style.setProperty('--transparent-white', '#f4f4f4a0')
        document.documentElement.style.setProperty('--transparent-black', '#373737a0')
        pokemonHeader.classList.remove('pokemonDark');
        sunIcon.classList.remove('none');
        moonIcon.classList.add('none')
        console.log('dark');
        counter--;
    }
})


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

