document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  
  let allGames = [];
  let originalContent = null;
  let originalHTML = null;
  
  // Fonction pour normaliser le texte (supprime les accents, convertit en minuscules)
  function normalizeText(text) {
    if (!text) return '';
    return text.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Supprime les accents
  }
  
  // Fonction pour charger les données
  function loadGamesData() {
    console.log("Chargement des données de jeux...");
    
    // 1. Essayer d'accéder à la variable switchGames définie dans switch-games.js
    if (typeof switchGames !== 'undefined') {
      allGames = switchGames;
      console.log(`${allGames.length} jeux chargés depuis le fichier externe`);
    } 
  }
  
  // Fonction de recherche simplifiée
  function performSearch() {
    const searchTerm = searchInput.value.trim();
    
    if (!searchTerm) {
      restoreOriginalView();
      return;
    }
    
    console.log(`Recherche en cours pour: "${searchTerm}"`);
    
    if (allGames.length === 0) {
      loadGamesData(); // Charger les jeux si pas encore fait
    }
    
    // Normaliser le terme de recherche (minuscules + sans accents)
    const normalizedSearchTerm = normalizeText(searchTerm);
    
    // Filtrer les jeux qui correspondent au terme de recherche
    const matches = allGames.filter(game => {
      const normalizedTitle = normalizeText(game.title);
      return normalizedTitle.includes(normalizedSearchTerm);
    });
    
    console.log(`${matches.length} jeux correspondants trouvés`);
    
    // Sauvegarder le contenu original si ce n'est pas déjà fait
    if (!originalContent) {
      originalContent = document.querySelector('.items');
      if (originalContent) {
        originalHTML = originalContent.innerHTML;
      }
    }
    
    // Afficher les résultats
    displaySearchResults(matches, searchTerm);
  }
  
  // Le reste de votre code reste identique...
  // Fonction pour afficher les résultats de recherche
  function displaySearchResults(matches, searchTerm) {
    const itemsContainer = document.querySelector('.items');
    
    if (!itemsContainer) {
      console.error("Conteneur d'items introuvable");
      return;
    }
    
    // Vider le conteneur
    itemsContainer.innerHTML = '';
    
    // Titre des résultats
    const resultsTitle = document.createElement('h2');
    resultsTitle.textContent = `Résultats pour "${searchTerm}"`;
    resultsTitle.style.textAlign = 'center';
    resultsTitle.style.margin = '20px 0';
    resultsTitle.style.width = '100%';
    itemsContainer.appendChild(resultsTitle);
    
    if (matches.length === 0) {
      // Aucun résultat
      const noResults = document.createElement('div');
      noResults.style.textAlign = 'center';
      noResults.style.width = '100%';
      noResults.style.padding = '20px';
      noResults.textContent = 'Aucun jeu trouvé.';
      itemsContainer.appendChild(noResults);
    } else {
      // Afficher les jeux correspondants
      matches.forEach(game => {
        const gameItem = document.createElement('div');
        gameItem.className = 'grid-4 item';
        gameItem.setAttribute('data-v-a6181336', '');
        
        // Créer l'élément avec la même structure HTML que sur la page
        gameItem.innerHTML = `
          <a class="VPLink link no-icon VPFeature" href="${game.url}" data-v-a6181336 data-v-a3976bdc>
            <article class="box" data-v-a3976bdc>
              <img class="VPImage" src="${game.image}" height="48" width="48" alt="${game.title}" data-v-8426fc1a>
              <h2 class="title" data-v-a3976bdc>${game.title}</h2>
              <p class="details" data-v-a3976bdc>${game.details}</p>
            </article>
          </a>
        `;
        
        itemsContainer.appendChild(gameItem);
      });
    }
    
    // Bouton pour revenir à tous les jeux
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Revenir à tous les jeux';
    resetButton.style.display = 'block';
    resetButton.style.margin = '20px auto';
    resetButton.style.padding = '10px 20px';
    resetButton.style.background = 'var(--vp-c-brand, #3eaf7c)';
    resetButton.style.color = 'white';
    resetButton.style.border = 'none';
    resetButton.style.borderRadius = '4px';
    resetButton.style.cursor = 'pointer';
    
    resetButton.onclick = function() {
      restoreOriginalView();
    };
    
    itemsContainer.appendChild(resetButton);
    
    // Masquer la pagination pendant la recherche
    const pagination = document.querySelector('.pagination');
    if (pagination) {
      pagination.style.display = 'none';
    }
  }
  
  // Fonction pour restaurer la vue originale
  function restoreOriginalView() {
    if (originalContent && originalHTML) {
      originalContent.innerHTML = originalHTML;
      
      // Réafficher la pagination
      const pagination = document.querySelector('.pagination');
      if (pagination) {
        pagination.style.display = 'block';
      }
    } else {
      location.reload();
    }
    
    if (searchInput) {
      searchInput.value = '';
    }
  }
  
  // Déclencher la recherche en cliquant sur le bouton
  searchButton.addEventListener('click', function() {
    performSearch();
  });
  
  // Déclencher la recherche en appuyant sur Entrée
  searchInput.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
      performSearch();
    } else if (searchInput.value.trim() === '') {
      restoreOriginalView();
    }
  });
  
  // Charger les données au chargement de la page
  loadGamesData();
});