// This file handles the search functionality for the game listing.
// It listens for input in the search box and filters the game list accordingly.

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const gameItems = document.querySelectorAll('.VPFeature');

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();

        gameItems.forEach(function(item) {
            const title = item.querySelector('.title').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});