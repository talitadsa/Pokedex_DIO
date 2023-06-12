

const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    console.log(pokemon);
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
                <button class="infoButton" onclick="openModal('${pokemon.name}', '${pokemon.url}')">+</button>
           
            </div>
        </li>
    `;
}





function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})



function openModal(pokemonName, pokemonUrl) {
    const modal = document.getElementById("modal");
    const modalPokemonName = document.getElementById("modalPokemonName");
    const modalPokemonDetails = document.getElementById("modalPokemonDetails");

    pokeApi.getPokemonDetailByName(pokemonUrl).then((pokemon) => {
        modalPokemonName.textContent = pokemon.url;

        modalPokemonDetails.innerHTML = `
            <h1 class="name">${pokemon.name}</h1>
            <img class="img_modal" src="${pokemon.photo}" alt="${pokemon.name}">
            <p>Number: ${pokemon.number}</p>
            <p>Type(s): ${pokemon.types.join(", ")}</p>
            <p>Abilities: ${pokemon.abilities.join(", ")}</p>
            <p>Height: ${pokemon.height}(ft)</p>
        `;

        modal.style.display = "block";
    });
}




function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}
