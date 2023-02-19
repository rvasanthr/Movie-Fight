// Axios Request
const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: { apikey: 'd9835cc5', s: searchTerm }
    });
    // Handling No Movie Found Scenario
    if (response.data.Error) {
        // Return empty array so that no data is displayed, as per our intent
        return [];
    }
    return response.data.Search;
}
// Dom access for input text
const search = document.querySelector('input');
// Temporary dom access
const target = document.querySelector('#target');
// Search Management Function
const searchApiFn = async (event) => {
    const apiData = await fetchData(event.target.value);
    // console.log(apiData);
    for (let movie of apiData) {
        const div = document.createElement('div');
        div.innerHTML = `<img src="${movie.Poster}"><br><h1>${movie.Title}</h1>`;
        target.appendChild(div);
    }
}
// Event Listener for search input
search.addEventListener('input', debounce(searchApiFn, 500));