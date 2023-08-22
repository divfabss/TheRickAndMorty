//Consumo de API
const apiCharacters = async () => {
    const url = 'https://rickandmortyapi.com/api/character';
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

const apiLocations = async (pagina) => {
    const url = `https://rickandmortyapi.com/api/location/?page=${pagina}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

const apiEpisodes = async (pagina) => {
    const url = `https://rickandmortyapi.com/api/episode/?page=${pagina}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

async function obtenerPersonaje(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
//Close Consumo de API


//Buscar personajes por temporada
async function buscarPorTemporada() {
    const searchInput = document.getElementById('searchInput');
    const temporada = searchInput.value.trim();

    if (temporada === '') {
        return;
    }

    const episodesData = await apiEpisodes(1);
    const filteredEpisodes = episodesData.results.filter(episode => episode.episode.toLowerCase().includes(temporada.toLowerCase()));
    const characterPromises = filteredEpisodes.flatMap(episode => episode.characters.map(obtenerPersonaje));
    const charactersData = await Promise.all(characterPromises);

    const divRes = document.querySelector("#resultado");
    divRes.innerHTML = "";

    charactersData.forEach(personaje => {
        const divItem = document.createElement('div');
        divItem.classList.add('card');
        divItem.innerHTML = `
            <img src="${personaje.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${personaje.name}</h5>
                <p class="card-text">Estado: ${personaje.status}</p>
                <p class="card-text">Especie: ${personaje.species}</p>
                <p class="card-text">Genero: ${personaje.gender}</p>
            </div>
        `;
        divRes.appendChild(divItem);
    });
}

async function obtenerNombresTemporadas() {
    const episodesData = await apiEpisodes(1);
    return episodesData.results.map(episode => episode.episode);
}
//Close Buscar personajes por temporada


//Mostrar sugerencias
async function mostrarSugerencias() {
    const searchInput = document.getElementById('searchInput');
    const sugerenciasContainer = document.getElementById('sugerencias');
    const temporadas = await obtenerNombresTemporadas();
    const textoBusqueda = searchInput.value.trim().toLowerCase();
    sugerenciasContainer.innerHTML = '';

    if (textoBusqueda === '') {
        sugerenciasContainer.style.display = 'none'; // Ocultar cuando no hay texto en el campo de búsqueda
        return;
    }

    const sugerencias = temporadas.filter(temporada => temporada.toLowerCase().includes(textoBusqueda));
    if (sugerencias.length > 0) {
        sugerenciasContainer.style.display = 'block'; // Mostrar si hay sugerencias disponibles
    } else {
        sugerenciasContainer.style.display = 'none'; // Ocultar si no hay sugerencias disponibles
        return;
    }

    sugerencias.forEach(sugerencia => {
        const btnSugerencia = document.createElement('button');
        btnSugerencia.classList.add('suggestion');
        btnSugerencia.textContent = sugerencia;
        btnSugerencia.addEventListener('click', () => {
            searchInput.value = sugerencia;
            buscarPorTemporada();
            sugerenciasContainer.style.display = 'none'; // Ocultar sugerencias al hacer clic en una opción
        });
        sugerenciasContainer.appendChild(btnSugerencia);
    });
}
//Close Mostrar sugerencias


//Limpiar la búsqueda
async function limpiarBusqueda() {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = '';
    mostrarSugerencias();
    buscarPorTemporada();

    // Limpiar el contenido de la sección de personajes
    const divRes = document.querySelector("#resultado");
    divRes.innerHTML = '';
}
window.onload = async function () {
    mostrarSugerencias();
    buscarPorTemporada();
};
//Close Limpiar la búsqueda