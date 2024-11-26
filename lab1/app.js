// Funkcja do pobierania danych o Pokemonach z API
async function fetchPokemons() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
    const data = await response.json();
    return data.results;
}

// Funkcja do wyświetlania listy Pokemonów
async function displayPokemons() {
    const pokemons = await fetchPokemons();
    const pokemonList = document.getElementById('pokemonItems');
    pokemonList.innerHTML = ''; // Czyścimy listę przed dodaniem nowych elementów
    pokemons.forEach(pokemon => {
        const listItem = document.createElement('li');
        listItem.textContent = pokemon.sprites.front_default
        listItem.addEventListener('click', () => showPokemonDetails(pokemon.url));
        pokemonList.appendChild(listItem);
    });
}

// Funkcja do wyświetlania szczegółów wybranego Pokemona
async function showPokemonDetails(url) {
    const response = await fetch(url);
    const pokemon = await response.json();

    const pokemonInfo = document.getElementById('pokemonInfo');
    pokemonInfo.innerHTML = `
        <h3>${pokemon.name.toUpperCase()}</h3>
        <p><strong>ID:</strong> ${pokemon.id}</p>
        <p><strong>Typ:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    `;
}

// Funkcja inicjująca
function init() {
    displayPokemons();

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => filterPokemons(searchInput.value));
}

// Funkcja do filtrowania Pokemonów na podstawie wyszukiwania
async function filterPokemons(query) {
    const pokemons = await fetchPokemons();
    const filteredPokemons = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(query.toLowerCase()));

    const pokemonList = document.getElementById('pokemonItems');
    pokemonList.innerHTML = ''; // Czyścimy listę przed dodaniem nowych elementów

    filteredPokemons.forEach(pokemon => {
        const listItem = document.createElement('li');
        listItem.textContent = pokemon.name;
        listItem.addEventListener('click', () => showPokemonDetails(pokemon.url));
        pokemonList.appendChild(listItem);
    });
}

// Uruchamiamy aplikację po załadowaniu strony
window.onload = init;
