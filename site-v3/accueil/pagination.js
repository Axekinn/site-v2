document.addEventListener('DOMContentLoaded', function() {
    // Get the current URL path
    const path = window.location.pathname;
    
    // Find the pagination elements
    const paginationLinks = document.querySelectorAll('.pagination a');
    
    // Add active class to current page link
    paginationLinks.forEach(link => {
      if (path.endsWith(link.getAttribute('href'))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    
    // Create CSS for pagination styling if not already present
    if (!document.getElementById('pagination-styles')) {
      const style = document.createElement('style');
      style.id = 'pagination-styles';
      style.textContent = `
        .pagination {
          display: flex;
          justify-content: center;
          margin: 30px 0;
          padding: 15px 0;
          border-top: 1px solid var(--vp-c-divider);
        }
        
        .pagination a {
          margin: 0 5px;
          padding: 8px 15px;
          color: var(--vp-c-text-1);
          text-decoration: none;
          border-radius: 4px;
          font-weight: 500;
          transition: background-color .25s, color .25s;
        }
        
        .pagination a:hover {
          background-color: var(--vp-c-bg-soft);
        }
        
        .pagination a.active {
          background-color: var(--vp-c-brand-1);
          color: var(--vp-c-white);
        }
      `;
      document.head.appendChild(style);
    }
    
    // Function to handle pagination link clicks
    function handlePaginationClick(e) {
      const targetPage = e.target.getAttribute('href');
      
      // If it's just "#", prevent default and do nothing
      if (targetPage === '#') {
        e.preventDefault();
        return;
      }
      
      // Otherwise, let the default behavior (navigate to the page) happen
    }
    
    // Add click event listeners to pagination links
    paginationLinks.forEach(link => {
      link.addEventListener('click', handlePaginationClick);
    });

    // Trouve la page active
    const activePage = document.querySelector('.pagination a.active');
    
    if (activePage) {
        // Obtient le numéro de page actuel depuis le href
        const currentPageHref = activePage.getAttribute('href');
        const currentPageNumber = parseInt(currentPageHref.replace('.html', ''));
        
        // Trouve le bouton "Next" et le bouton "Prev"
        const nextButton = document.getElementById('next-page');
        const prevButton = document.getElementById('prev-page');
        
        // Met à jour le bouton "Suivant"
        if (nextButton) {
            // Définit la page suivante comme étant la page actuelle + 1
            const nextPageNumber = currentPageNumber + 1;
            nextButton.setAttribute('href', nextPageNumber + '.html');
        }
        
        // Met à jour le bouton "Retour"
        if (prevButton) {
            // Définit la page précédente comme étant la page actuelle - 1
            // Ne pas aller en dessous de la page 1
            const prevPageNumber = Math.max(1, currentPageNumber - 1);
            prevButton.setAttribute('href', prevPageNumber + '.html');
            
            // Masquer le bouton "Retour" sur la page 1
            if (currentPageNumber === 1) {
                prevButton.style.visibility = 'hidden';
            }
        }
    }
});



