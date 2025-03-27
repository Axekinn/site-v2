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
  });



  