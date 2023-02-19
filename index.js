const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: { apikey: 'd9835cc5', s: searchTerm }
    });
    console.log(response.data);
}
// Invoke Function
// fetchData();
// Dom access for input text
const search = document.querySelector('input');
search.addEventListener('input', (event) => {
    fetchData(search.value);
});