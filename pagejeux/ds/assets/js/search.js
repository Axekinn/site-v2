// Code JavaScript pour la fonctionnalité de recherche
const searchInput = document.getElementById('searchInput');
const articles = document.querySelectorAll('.item');

searchInput.addEventListener('input', function () {
  const searchText = this.value.toLowerCase();
  
  articles.forEach(article => {
    const articleText = article.textContent.toLowerCase();
    
    if (articleText.includes(searchText)) {
      article.style.display = 'block';
      // Modifier la couleur du texte en noir en utilisant un sélecteur CSS spécifique
      article.style.color = 'black';
    } else {
      article.style.display = 'none';
    }
  });
});