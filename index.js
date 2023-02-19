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
let timerID = undefined;
// Search Management Function
const searchApiFn = event => {
    // Repetitive API trigger prevention
    if (timerID) {
        clearTimeout(timerID);
    }
    // Triggers API in 1 second if no other input event is triggered
    timerID = setTimeout(() => {
        fetchData(search.value);
    }, 500);
}
search.addEventListener('input', searchApiFn);