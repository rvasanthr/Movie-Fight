// Axios Request
const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: { apikey: 'd9835cc5', s: searchTerm }
    });
    return response.data.Search;
}
// Dom access for input text
const search = document.querySelector('input');
// Search Management Function
const searchApiFn = async (event) => {
    const apiData = await fetchData(event.target.value);
    console.log(apiData);
}
// Event Listener for search input
search.addEventListener('input', debounce(searchApiFn, 500));