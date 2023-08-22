//Consumo API
const divRes = document.querySelector("#resultado");
const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");
const pagination = document.getElementById("pagination");

let currentPage = 1;

const apiLocations = async (pagina) => {
    let url = "https://rickandmortyapi.com/api/location/?page=" + pagina;
    const api = await fetch(url);
    const data = await api.json();
    console.log(data);
    divRes.innerHTML = "";

    data.results.forEach(location => {
        const divItem = document.createElement('div');
        divItem.classList.add('card');
        divItem.innerHTML = `
            <div class="card-header">
                ${location.name}
            </div>
            <div class="card-body">
                <h5 class="card-title">${location.type}</h5>
                <p class="card-text">${location.dimension}</p>
            </div>
        `;
        divRes.appendChild(divItem);
    });
}

// Llama a la función inicialmente para cargar los lugares
apiLocations(currentPage);

// Manejadores de eventos para la paginación
prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        apiLocations(currentPage);
    }
});

nextPageButton.addEventListener("click", () => {
    currentPage++;
    apiLocations(currentPage);
});
