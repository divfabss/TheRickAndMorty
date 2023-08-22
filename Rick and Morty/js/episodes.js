//Consumo API
const apiEpisodes = async (pagina) => {
    let url = "https://rickandmortyapi.com/api/episode/?page=" + pagina;
    const api = await fetch(url);
    const data = await api.json();
    console.log(data);
    const divRes = document.querySelector("#resultado");
    divRes.innerHTML = "";

    data.results.forEach(episode => {
        const divItem = document.createElement('div');
        divItem.classList.add('card');
        divItem.innerHTML = `
            <div class="card-header">
                ${episode.name}
            </div>
            <div class="card-body">
                <h5 class="card-title">Episode: ${episode.episode}</h5>
                <p class="card-text">Air Date: ${episode.air_date}</p>
            </div>
        `;
        divRes.appendChild(divItem);
    });
}

apiEpisodes(1);
