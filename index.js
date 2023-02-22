// Helper Fn for rendering the selected movie's details
const movieInfoTemplate = movieInfo => {
    return `
    <article class="media">
        <figure class="media-left">
            <p class="image">
                <img src="${movieInfo.Poster}" alt="">
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <h1>${movieInfo.Title}</h1>
                <h4>${movieInfo.Genre}</h4>
                <p>${movieInfo.Plot}</p>
            </div>
        </div>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieInfo.Awards}</p>
        <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieInfo.BoxOffice}</p>
        <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieInfo.Metascore}</p>
        <p class="subtitle">Metascore</p>
    </article>
    </article><article class="notification is-primary">
        <p class="title">${movieInfo.imdbRating}</p>
        <p class="subtitle">IMDB Rating</p>
    </article>
    </article><article class="notification is-primary">
        <p class="title">${movieInfo.imdbVotes}</p>
        <p class="subtitle">IMDB Votes</p>
    </article>`;
}
// Helper Fn for retrieving the selected movie's details
const onMovieSelect = async (movieID, summaryElement) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: { apikey: 'd9835cc5', i: movieID }
    });
    // console.log(response.data);
    summaryElement.innerHTML = movieInfoTemplate(response.data);
}
// Auto Complete Config
const autoCompleteConfig = {
    renderOption: (movie) => {
        // Checks for N/A (no image) in poster URI and remedies it
        const imageURL = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `<img src="${imageURL}">${movie.Title} (${movie.Year})`;
    },
    inputValue: (movie) => {
        return movie.Title;
    },
    // Axios Request
    fetchAPIData: async (searchTerm) => {
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
}
// Invoking Auto Complete through the Config Object {destructured}
// Left search
createAutoComplete({
    root: document.querySelector('#left-auto-complete'),
    ...autoCompleteConfig,
    onOptionSelect: (movie) => {
        // Hide the tutorial section
        document.querySelector('.tutorial').classList.add('is-hidden');
        // Passes IMDB movieID to helper Fn for getting movie details
        onMovieSelect(movie.imdbID, document.querySelector('#left-summary'));
    }
});
// Right search
createAutoComplete({
    root: document.querySelector('#right-auto-complete'),
    ...autoCompleteConfig,
    onOptionSelect: (movie) => {
        // Hide the tutorial section
        document.querySelector('.tutorial').classList.add('is-hidden');
        // Passes IMDB movieID to helper Fn for getting movie details
        onMovieSelect(movie.imdbID, document.querySelector('#right-summary'));
    }
});