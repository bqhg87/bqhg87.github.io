document.addEventListener('DOMContentLoaded', () => {
    const sideMenu = document.querySelector('#sideMenuWrapper');
    const articleWrapper = document.querySelector('#articleWrapper');
    const articleDiv = articleWrapper.querySelector('.article');
    
    // List of valid articles
    const validArticles = ['about', 'credits', 'general1', 'general2', 'general3', 'article1', 'article2', 'article3', 'article4', 'article5']; // Add your articles here
    
    // Simulate fetching article content
    const fetchArticleContent = (article) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(`<h1>${article}</h1><p>This is content for the ${article} article.</p>`);
        }, 500); // Simulate network delay
      });
    };
  
    // Load an article
    const loadArticle = async (article) => {
      const content = await fetchArticleContent(article);
      articleDiv.innerHTML = content;
      articleWrapper.classList.add('show');
      // Update the URL without reloading
      history.pushState({ article }, '', `?article=${article}`);
    };
  
    // Redirect to the root URL if the article is invalid
    const redirectToRootIfInvalid = (article) => {
      if (!validArticles.includes(article)) {
        window.location.href = '/'; // Replace with your root URL if different
        return false;
      }
      return true;
    };
  
    // Handle menu item clicks
    sideMenu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && e.target.dataset.article) {
        e.preventDefault();
        const article = e.target.dataset.article;
        if (redirectToRootIfInvalid(article)) {
          loadArticle(article);
        }
      }
    });
  
    // Handle browser navigation
    window.addEventListener('popstate', (event) => {
      const params = new URLSearchParams(location.search);
      const article = params.get('article');
      if (article && redirectToRootIfInvalid(article)) {
        loadArticle(article);
      } else {
        articleWrapper.classList.remove('show');
        articleDiv.innerHTML = '';
      }
    });
  
    // Load initial article based on query parameter
    const params = new URLSearchParams(location.search);
    const initialArticle = params.get('article');
    if (initialArticle && redirectToRootIfInvalid(initialArticle)) {
      loadArticle(initialArticle);
    }
  });