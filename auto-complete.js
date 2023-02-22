// Config object Parameter {destructured}
const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchAPIData }) => {
    // HTML for root
    root.innerHTML = `
    <label><b>Search</b></label>
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
        const items = await fetchAPIData(event.target.value);
        // Reset resultsWrapper with each new search
        resultsWrapper.innerHTML = ``;
        // If there are no items returned, hide dropdown and exit function
        if (!items.length) {
            // Per our design returns an empty array when no match found
            // console.log(apiData);
            dropdown.classList.remove('is-active');
            return;
        }
        // Bulma class that actively displays the drowdown
        dropdown.classList.add('is-active');
        // Rendering section
        for (let item of items) {
            // Bulma display element for this dropdown
            const inputOption = document.createElement('a');
            // Bulma class addition
            inputOption.classList.add('dropdown-item');
            inputOption.innerHTML = renderOption(item);
            // Event listener trigger on a element
            inputOption.addEventListener('click', event => {
                // Hide dropdown when user clicks on an option
                dropdown.classList.remove('is-active');
                // Get item title on to the search box
                search.value = inputValue(item);
                // Pass item object to Fn handling Option select action
                onOptionSelect(item);
            });
            resultsWrapper.appendChild(inputOption);
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