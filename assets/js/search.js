// Code JavaScript pour la fonctionnalité de recherche améliorée
const searchInput = document.getElementById('searchInput');
const articles = document.querySelectorAll('.item');

searchInput.addEventListener('input', function () {
  const searchTerms = this.value.toLowerCase().split(' ').filter(term => term);
  
  articles.forEach(article => {
    const articleText = article.textContent.toLowerCase();
    const matches = searchTerms.every(term => articleText.includes(term));

    if (matches) {
      article.style.display = 'block';
    } else {
      article.style.display = 'none';
    }
  });
});