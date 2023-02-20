// Axios Request
const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: { apikey: 'd9835cc5', s: searchTerm }
    });
    // Handling No Movie Found Scenario, response.data.Error exists then
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
    // If there are no movies returned, hide dropdown and exit function
    if (!apiData.length) {
        // Per our design returns an empty array when no match found
        // console.log(apiData);
        dropdown.classList.remove('is-active');
        return;
    }
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
        // Event listener trigger on a element
        movieOption.addEventListener('click', event => {
            // Hide dropdown
            dropdown.classList.remove('is-active');
            // Get Movie title on to the search box
            search.value = movie.Title;
            // Pass movieID to helper Fn for getting movie details
            movieInfo(movie.imdbID)
        });
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
// Helper Fn for getting movie details
const movieInfo = async (movieID) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: { apikey: 'd9835cc5', i: movieID }
    });
    console.log(response.data);
}