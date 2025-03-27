document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  
  // Fonction de recherche pour filtrer les jeux
  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    // Sélectionner tous les éléments de jeux dans la page
    const gameItems = document.querySelectorAll('.items .grid-4.item');
    
    if (gameItems.length === 0) {
      console.log("Aucun jeu trouvé sur cette page");
      return;
    }
    
    // Compteur pour les jeux trouvés
    let foundGames = 0;
    
    // Parcourir tous les jeux et filtrer
    gameItems.forEach(item => {
      // Récupérer le titre du jeu (à partir du texte ou d'un attribut title/alt)
      const gameTitle = item.textContent.toLowerCase() || 
                        item.querySelector('img')?.alt.toLowerCase() || 
                        item.querySelector('a')?.textContent.toLowerCase() || "";
      
      // Vérifier si le terme de recherche est présent dans le titre
      if (searchTerm === "" || gameTitle.includes(searchTerm)) {
        item.style.display = "block"; // Afficher le jeu
        foundGames++;
      } else {
        item.style.display = "none";  // Masquer le jeu
      }
    });
    
    // Afficher un message si aucun jeu n'est trouvé
    const resultsContainer = document.querySelector('.items') || document.body;
    const existingMessage = document.getElementById('search-results-message');
    
    if (existingMessage) {
      existingMessage.remove();
    }
    
    if (searchTerm !== "" && foundGames === 0) {
      const message = document.createElement('div');
      message.id = 'search-results-message';
      message.textContent = `Aucun jeu trouvé pour "${searchTerm}"`;
      message.style.padding = "20px";
      message.style.textAlign = "center";
      message.style.color = "var(--vp-c-text-2)";
      message.style.fontStyle = "italic";
      resultsContainer.appendChild(message);
    }
  }
  
  // Déclencher la recherche en cliquant sur le bouton
  searchButton.addEventListener('click', performSearch);
  
  // Déclencher la recherche en appuyant sur Entrée
  searchInput.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
      performSearch();
    } else if (searchInput.value.trim() === '') {
      // Réinitialiser l'affichage si le champ est vide
      performSearch();
    }
  });
  
  // Ajouter un écouteur de saisie en temps réel (optionnel)
  searchInput.addEventListener('input', function() {
    // Filtrage en temps réel pendant la saisie
    // Décommenter la ligne suivante pour activer:
    // performSearch();
  });
});