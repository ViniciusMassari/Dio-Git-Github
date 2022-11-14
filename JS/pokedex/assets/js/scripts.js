const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMore");
const limit = 10;
let offset = 0;

const maxRecords = 151;

function loadPokemonItems() {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonList.innerHTML += pokemons
      .map(
        (pokemon) => `<li class="${pokemon.type} pokemon">
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>
    <div class="detail">
      <ol class="types">
     ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join("")}
      </ol>
      <img src="${pokemon.photo}" alt=${pokemon.name} />
    </div>
  </li>`
      )
      .join("");
  });
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  debugger;

  const qtdRecordsNextPage = offset + limit;

  if (qtdRecordsNextPage > maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItems(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItems(offset, limit);
  }
});
