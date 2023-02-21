const createAutoComplete = ({ root, renderOption }) => {
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
    const dropdown = root.querySelector('.dropdown');
    // Will be uased to wrap the results of search
    const resultsWrapper = root.querySelector('.results');
    // Dom object for input text
    const search = root.querySelector('input');
    // Search Management Function
    const processAPISearch = async (event) => {
        const apiData = await fetchAPIData(event.target.value);
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
        // Rendering section
        for (let movie of apiData) {
            // Bulma display element for this dropdown
            const movieOption = document.createElement('a');
            // Bulma class addition
            movieOption.classList.add('dropdown-item');
            movieOption.innerHTML = renderOption(movie);
            // Event listener trigger on a element
            movieOption.addEventListener('click', event => {
                // Hide dropdown
                dropdown.classList.remove('is-active');
                // Get Movie title on to the search box
                search.value = movie.Title;
                // Pass movieID to helper Fn for getting movie details
                onMovieSelect(movie.imdbID)
            });
            resultsWrapper.appendChild(movieOption);
        }
    }
    // Event Listeners
    // For search input
    search.addEventListener('input', debounce(processAPISearch, 500));
    // For body
    document.addEventListener('click', event => {
        // console.log(event.target);
        if (!root.contains(event.target)) {
            // Bulma class that stops display of drowdown
            dropdown.classList.remove('is-active');
        }
    });
}