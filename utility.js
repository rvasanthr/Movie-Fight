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