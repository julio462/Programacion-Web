// app.js

const API_BASE = "https://pokeapi.co/api/v2/pokemon/";

const searchInput = document.querySelector(".pokedex__search");
const loadInitialBtn = document.querySelector(".pokedex__btn");
const pokemonDetailSection = document.querySelector(".pokemon-detail");
const favoritesList = document.querySelector(".favorites__list");
const listContainer = document.querySelector(".pokemon-list");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function renderPokemonList(pokemonArray) {
  listContainer.innerHTML = "";

  pokemonArray.forEach((pokemon) => {
    const card = document.createElement("div");
    card.classList.add("pokemon-card");

    card.innerHTML = `
      <img class="pokemon-card__image" src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
      <div class="pokemon-card__name">${pokemon.name}</div>
    `;

    // Evento para mostrar el detalle al hacer clic
    card.addEventListener("click", () => renderPokemon(pokemon));

    listContainer.appendChild(card);
  });
}


// Función para guardar favoritos en localStorage
function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Renderizar lista de favoritos
function renderFavorites() {
  favoritesList.innerHTML = "";

  if (favorites.length === 0) {
    favoritesList.textContent = "No tienes Pokémon favoritos aún.";
    return;
  }

  favorites.forEach((poke) => {
    const favCard = document.createElement("div");
    favCard.className = "favorites__card";
    favCard.textContent = poke.name;
    favCard.title = `Ver detalles de ${poke.name}`;

    favCard.addEventListener("click", () => {
      renderPokemon(poke);
    });

    favoritesList.appendChild(favCard);
  });
}

// Fetch y mostrar Pokémon
async function getPokemon(query) {
  try {
    const response = await fetch(`${API_BASE}${query.toLowerCase()}`);

    if (!response.ok) throw new Error("Pokémon no encontrado");

    const data = await response.json();
    renderPokemon(data);
  } catch (error) {
    pokemonDetailSection.innerHTML = `<p style="color:red; text-align:center;">${error.message}</p>`;
  }
}

// Renderizar detalle de Pokémon
function renderPokemon(pokemon) {
  const isFavorite = favorites.some((fav) => fav.id === pokemon.id);

  pokemonDetailSection.innerHTML = `
    <h2 class="pokemon-detail__name">${pokemon.name}</h2>
    <img
      class="pokemon-detail__image"
      src="${pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}"
      alt="${pokemon.name}"
    />
    <div class="pokemon-detail__types">
      ${pokemon.types
        .map(
          (t) =>
            `<span class="pokemon-detail__type pokemon-detail__type--${t.type.name}">${t.type.name}</span>`
        )
        .join("")}
    </div>
    <div class="pokemon-detail__info">
      <div>
        <strong>Altura</strong>
        <div>${pokemon.height / 10} m</div>
      </div>
      <div>
        <strong>Peso</strong>
        <div>${pokemon.weight / 10} kg</div>
      </div>
    </div>
    <div class="pokemon-detail__stats">
      ${pokemon.stats
        .map(
          (s) =>
            `<div class="pokemon-detail__stat">${s.stat.name}: ${s.base_stat}</div>`
        )
        .join("")}
    </div>
    <button class="pokemon-detail__fav-btn ${
      isFavorite ? "pokemon-detail__fav-btn--active" : ""
    }">${isFavorite ? "Quitar de Favoritos" : "Agregar a Favoritos"}</button>
  `;

  // Agregar evento para botón de favoritos
  const favBtn = pokemonDetailSection.querySelector(".pokemon-detail__fav-btn");
  favBtn.addEventListener("click", () => toggleFavorite(pokemon));
}

// Añadir o quitar favorito
function toggleFavorite(pokemon) {
  const index = favorites.findIndex((fav) => fav.id === pokemon.id);

  if (index >= 0) {
    favorites.splice(index, 1);
  } else {
    favorites.push({
      id: pokemon.id,
      name: pokemon.name,
      sprites: pokemon.sprites,
      types: pokemon.types,
      height: pokemon.height,
      weight: pokemon.weight,
      stats: pokemon.stats,
    });
  }

  saveFavorites();
  renderFavorites();
  renderPokemon(pokemon);
}

// Cargar primeros 20 Pokémon (los primeros en la PokéAPI son IDs del 1 al 20)
async function loadInitialPokemons() {
  listContainer.innerHTML = "<p>Cargando Pokémon...</p>";
  pokemonDetailSection.innerHTML = "";

  try {
    const promises = [];
    for (let i = 1; i <= 20; i++) {
      promises.push(fetch(`${API_BASE}${i}`).then((res) => res.json()));
    }

    const pokemons = await Promise.all(promises);

    // 🔥 Ahora sí: mostrar todos
    renderPokemonList(pokemons);
  } catch (error) {
    listContainer.innerHTML = `<p style="color:red;">Error cargando Pokémon iniciales</p>`;
  }
}


// Eventos

// Buscar con Enter
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) getPokemon(query);
  }
});

// Botón cargar iniciales
loadInitialBtn.addEventListener("click", () => {
  loadInitialPokemons();
});

// Renderizar favoritos al inicio
renderFavorites();
