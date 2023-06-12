
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail, url) {
    const pokemon = new Pokemon();
    pokemon.url = url; // Atribui a URL ao objeto pokemon
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    pokemon.height = pokeDetail.height;
    pokemon.species = pokeDetail.species;
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;


    pokemon.abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);

    // pokemon.eggGroups = pokeDetail.eggGroups.map((abilitySlot) => abilitySlot.ability.name);
    // pokemon.eggGroups = pokeDetail.eggGroups ? pokeDetail.eggGroups.map((eggGroup) => eggGroup.name) : [];

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}



pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then((pokeDetail) => convertPokeApiDetailToPokemon(pokeDetail, pokemon.url));
}


pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
pokeApi.getPokemonDetailByName = (pokemonUrl) => {
    return fetch(pokemonUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            return response.json();
        })
        .then(convertPokeApiDetailToPokemon)
        .catch((error) => {
            console.error(error);
            throw error;
        });
};
