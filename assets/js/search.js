// Code JavaScript pour la fonctionnalité de recherche améliorée
const searchInput = document.getElementById('searchInput');
const articles = document.querySelectorAll('.item');

searchInput.addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase().trim();

  articles.forEach(article => {
    const articleText = article.textContent.toLowerCase();
    const matches = articleText.includes(searchTerm);

    if (matches) {
      article.style.display = 'block';
    } else {
      article.style.display = 'none';
    }
  });
});