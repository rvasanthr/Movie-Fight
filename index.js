// Helper Functions
// Debounce function factory
const debounce = (func, delay = 1000) => {
    let timeoutID;
    return (...params) => {
        // Prevents repetitive function trigger
        if (timeoutID) { clearTimeout(timeoutID); }
        // Triggers Fn after delay if Fn washn't triggered before delay expiry
        timeoutID = setTimeout(() => { func.apply(null, params); }, delay)
    }
}
// Program Logic
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