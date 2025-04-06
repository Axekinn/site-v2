// This file manages the pagination logic, dynamically generating pagination links based on the number of games.

document.addEventListener('DOMContentLoaded', function() {
    const gamesPerPage = 10; // Number of games to display per page
    const games = []; // This should be populated with the actual game data from the server
    const totalGames = games.length; // Total number of games
    const totalPages = Math.ceil(totalGames / gamesPerPage); // Calculate total pages
    const paginationContainer = document.querySelector('.pagination'); // Assuming there's a container for pagination links

    function renderPagination(currentPage) {
        paginationContainer.innerHTML = ''; // Clear existing pagination links

        // Create "Previous" link
        if (currentPage > 1) {
            const prevLink = document.createElement('a');
            prevLink.href = `?page=${currentPage - 1}`;
            prevLink.innerHTML = '&laquo; Retour';
            paginationContainer.appendChild(prevLink);
        }

        // Create page number links
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = `?page=${i}`;
            pageLink.innerText = i;
            if (i === currentPage) {
                pageLink.classList.add('active'); // Highlight the current page
            }
            paginationContainer.appendChild(pageLink);
        }

        // Create "Next" link
        if (currentPage < totalPages) {
            const nextLink = document.createElement('a');
            nextLink.href = `?page=${currentPage + 1}`;
            nextLink.innerHTML = 'Next &raquo;';
            paginationContainer.appendChild(nextLink);
        }
    }

    // Get the current page from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const currentPage = parseInt(urlParams.get('page')) || 1;

    // Render the pagination links
    renderPagination(currentPage);
});