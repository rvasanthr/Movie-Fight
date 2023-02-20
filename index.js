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
// Dom object for root access
const root = document.querySelector('.autocomplete');
// HTML for root
root.innerHTML = `
    <label><b>Search For a Movie</b></label>
    <input class="input">
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>`;
// Dom objects for access of conjoured up html at root
const dropdown = document.querySelector('.dropdown');
// Will be uased to wrap the results of search
const resultsWrapper = document.querySelector('.results');
// Dom object for input text
const search = document.querySelector('input');
// Search Management Function
const searchAPIFn = async (event) => {
    const apiData = await fetchData(event.target.value);
    // Reset resultsWrapper with each new search
    resultsWrapper.innerHTML = ``;
    // Bulma class that actively displays the drowdown
    dropdown.classList.add('is-active');
    for (let movie of apiData) {
        // Check for N/A (no image) in poster URI and remedies it
        const imageURL = movie.Poster === 'N/A' ? '' : movie.Poster;
        // Bulma display element for this dropdown
        const movieOption = document.createElement('a');
        // Bulma class addition
        movieOption.classList.add('dropdown-item');
        movieOption.innerHTML = `
        <img src="${imageURL}">${movie.Title}`;
        resultsWrapper.appendChild(movieOption);
    }
}
// Event Listeners
// For search input
search.addEventListener('input', debounce(searchAPIFn, 500));
// For body
document.addEventListener('click', event => {
    // console.log(event.target);
    if (!root.contains(event.target)) {
        // Bulma class that stops display of drowdown
        dropdown.classList.remove('is-active');
    }
});