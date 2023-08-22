//Consumo API
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

  async function obtenerPersonaje(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

//Función para buscar personajes por planeta
  async function buscarPorPlaneta() {
    const searchInput = document.getElementById('searchInputt');
    const planeta = searchInput.value.trim();

    if (planeta === '') {
      return;
    }

    const locationsData = await apiLocations(1);
    const filteredLocations = locationsData.results.filter(location => location.name.toLowerCase().includes(planeta.toLowerCase()));
    const characterPromises = filteredLocations.flatMap(location => location.residents.map(obtenerPersonaje));
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

  async function obtenerNombresPlanetas() {
    const locationsData = await apiLocations(1);
    return locationsData.results.map(location => location.name);
  }

//Mostrar sugerencias de planetas
async function mostrarSugerencias2() {
    const searchInput = document.getElementById('searchInputt');
    const sugerenciasContainer = document.getElementById('sugerencias2');
    const planetas = await obtenerNombresPlanetas();
    const textoBusqueda = searchInput.value.trim().toLowerCase();
    sugerenciasContainer.innerHTML = '';

    if (textoBusqueda === '') {
      return;
    }

    const sugerencias = planetas.filter(planeta => planeta.toLowerCase().includes(textoBusqueda));
    sugerencias.forEach(sugerencia => {
      const divSugerencia = document.createElement('div');
      divSugerencia.classList.add('suggestion2');
      divSugerencia.textContent = sugerencia;
      divSugerencia.addEventListener('click', () => {
        searchInput.value = sugerencia;
        buscarPorPlaneta();
      });
      sugerenciasContainer.appendChild(divSugerencia);
    });
}

//Limpiar
  function limpiarBusqueda() {
    const searchInput = document.getElementById('searchInputt');
    searchInput.value = '';
    mostrarSugerencias2();
    buscarPorPlaneta();

    // Limpiar el contenido de la sección de personajes
    const divRes = document.querySelector("#resultado");
    divRes.innerHTML = '';

    // Volver a cargar los personajes
    apiCharacters();
  }

    // Obtener todos los nombres de los planetas disponibles
  async function obtenerNombresPlanetas() {
    const locationsData = await apiLocations(1);
    return locationsData.results.map(location => location.name);
  }
//Close Limpiar