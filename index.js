const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: { apikey: 'd9835cc5', s: searchTerm }
    });
    console.log(response.data);
}
// Dom access for input text
const search = document.querySelector('input');
// Search Management Function
const searchApiFn = event => {
    fetchData(event.target.value);
}
// Event Listener for search input
search.addEventListener('input', debounce(searchApiFn, 500));