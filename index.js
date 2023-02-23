// Helper Fn for rendering the selected movie's details
const movieInfoTemplate = movieInfo => {
    // Statistics per movie
    // Split at spaces
    const accolades = movieInfo.Awards.split(' ').reduce((accumulator, element) => {
        const parsedValue = parseInt(element);
        if (isNaN(parsedValue)) {
            // Exit current execution of Fn
            return accumulator;
        } else {
            return accumulator += parsedValue;
        }
    }, 0);
    const boxOffice = parseInt(movieInfo.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
    const metascore = parseInt(movieInfo.Metascore.replace(/,/g, ''));
    const imdbRating = parseFloat(movieInfo.imdbRating);
    const imdbVotes = parseInt(movieInfo.imdbVotes.replace(/,/g, ''));
    console.log(`Accolades: ${accolades}, Box Office: ${boxOffice}, Metascore: ${metascore}, IMDB Rating: ${imdbRating}, IMDB Votes: ${imdbVotes}`);
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
    <article data-value = ${accolades} class="notification is-primary">
        <p class="title">${movieInfo.Awards}</p>
        <p class="subtitle">Awards</p>
    </article>
    <article data-value = ${boxOffice} class="notification is-primary">
        <p class="title">${movieInfo.BoxOffice}</p>
        <p class="subtitle">Box Office</p>
    </article>
    <article data-value = ${metascore} class="notification is-primary">
        <p class="title">${movieInfo.Metascore}</p>
        <p class="subtitle">Metascore</p>
    </article>
    <article data-value = ${imdbRating} class="notification is-primary">
        <p class="title">${movieInfo.imdbRating}</p>
        <p class="subtitle">IMDB Rating</p>
    </article>
    <article data-value = ${imdbVotes} class="notification is-primary">
        <p class="title">${movieInfo.imdbVotes}</p>
        <p class="subtitle">IMDB Votes</p>
    </article>`;
}
// Helper Fn for Movie Data Comparison
const runComparison = () => {
    console.log('Actual comparison code goes here.');
}
// Helper Fn for retrieving the selected movie's details
// Variables to represent two sides for storing movie info for comparing
let leftMovieInfo, rightMovieInfo;
const onMovieSelect = async (movieID, summaryElement, side) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: { apikey: 'd9835cc5', i: movieID }
    });
    summaryElement.innerHTML = movieInfoTemplate(response.data);
    // Check current side and store data
    if (side === 'left') {
        leftMovieInfo = response.data;
    } else {
        rightMovieInfo = response.data;
    }
    // If both side variables exist, then compare
    if (leftMovieInfo && rightMovieInfo) {
        // console.log('Helper fn deploy and compare!');
        runComparison();
    }
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
        onMovieSelect(movie.imdbID, document.querySelector('#left-summary'), 'left');
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
        onMovieSelect(movie.imdbID, document.querySelector('#right-summary'), 'right');
    }
});