const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon?limit=1000";
const outputDiv = document.getElementById("output");

const getAllPokemon = () => {
  return fetch(POKEMON_API_URL)
    .then(response => response.json())
    .then(data => data.results);
};

const displayThreeRandomPokemonDetails = () => {
  return getAllPokemon()
    .then(pokemons => {
      const randomIndices = [];
      while (randomIndices.length < 3) {
        let rnd = Math.floor(Math.random() * pokemons.length);
        if (!randomIndices.includes(rnd)) randomIndices.push(rnd);
      }
      const randomPokemons = randomIndices.map(index => pokemons[index]);
      const fetchPromises = randomPokemons.map(pokemon => fetch(pokemon.url));
      return Promise.all(fetchPromises);
    })
    .then(responses => Promise.all(responses.map(res => res.json())))
    .then(pokemonData => {
      pokemonData.forEach(pd => {
        displayOnWebpage(pd.name, pd.sprites.front_default, ""); // Pass the image URL
      });
      return pokemonData;
    });
};

const displaySpeciesDescription = () => {
  return displayThreeRandomPokemonDetails()
    .then(pokemons => {
      const fetchPromises = pokemons.map(pokemon => fetch(pokemon.species.url));
      return Promise.all(fetchPromises);
    })
    .then(responses => Promise.all(responses.map(res => res.json())))
    .then(speciesData => {
      speciesData.forEach((species, index) => {
        const flavorTextEntry = species.flavor_text_entries.find(entry => entry.language.name === "en");
        if (flavorTextEntry) {
          const existingDiv = document.querySelector(`[data-pokemon-name="${species.name}"]`);
          if (existingDiv) {
            const pokemonDesc = document.createElement("p");
            pokemonDesc.textContent = flavorTextEntry.flavor_text;
            existingDiv.appendChild(pokemonDesc);
          }
        }
      });
    });
};

const displayOnWebpage = (name, imageUrl, description) => {
  const pokemonDiv = document.createElement("div");
  pokemonDiv.setAttribute("data-pokemon-name", name);  // Set a data attribute for the Pokémon's name

  const pokemonName = document.createElement("h2");
  const pokemonImage = new Image();
  const pokemonDesc = document.createElement("p");

  pokemonName.textContent = name;
  pokemonImage.src = imageUrl;
  pokemonDesc.textContent = description;

  pokemonDiv.appendChild(pokemonName);
  pokemonDiv.appendChild(pokemonImage);
  pokemonDiv.appendChild(pokemonDesc);
  
  outputDiv.appendChild(pokemonDiv);
}

document.addEventListener("DOMContentLoaded", function() {
  const randomPokemonBtn = document.getElementById("randomPokemonBtn");
  const pokemonDescBtn = document.getElementById("pokemonDescBtn");

  randomPokemonBtn.addEventListener("click", displayThreeRandomPokemonDetails);
  pokemonDescBtn.addEventListener("click", displaySpeciesDescription);
});
