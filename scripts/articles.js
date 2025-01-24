document.addEventListener('DOMContentLoaded', () => {
    const sideMenu = document.querySelector('#sideMenuWrapper');
    const articleWrapper = document.querySelector('#articleWrapper');
    const articleDiv = articleWrapper.querySelector('.article');
  
    // List of valid articles
    const validArticles = ['about', 'credits', 'general1', 'general2', 'general3', 'article1', 'article2', 'article3', 'article4', 'article5'];
  
    // Simulate fetching article content
    const fetchArticleContent = (article) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(`<p style="grid-column: 1 / 2;">${article}</p><p style="grid-column: 2 / span 2;">This is content for the ${article} article.</p>`);
        }, 0); // Simulate network delay
      });
    };
  
    // Crossfade effect implementation
    const crossDissolve = async (newContent) => {
      // Step 1: Fade out
      articleDiv.classList.add('fade-out');
  
      // Wait for the fade-out animation (200ms)
      await new Promise((resolve) => setTimeout(resolve, 200));
  
      // Step 2: Update content
      articleDiv.innerHTML = newContent;
  
      // Step 3: Trigger fade-in
      articleDiv.classList.remove('fade-out');
      articleDiv.classList.add('fade-in');
  
      // Remove fade-in class after the animation
      setTimeout(() => {
        articleDiv.classList.remove('fade-in');
      }, 200);
    };
  
    // Load an article
    const loadArticle = async (article, updateURL = true) => {
      const content = await fetchArticleContent(article);
      await crossDissolve(content);
      articleWrapper.classList.add('show');
  
      // Update the URL after the animation finishes
      if (updateURL) {
        history.pushState({ article }, '', `?article=${article}`);
      }
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
        loadArticle(article, false); // Avoid updating URL on popstate
      } else {
        articleWrapper.classList.remove('show');
        articleDiv.innerHTML = '';
      }
    });
  
    // Load initial article based on query parameter
    const params = new URLSearchParams(location.search);
    const initialArticle = params.get('article');
    if (initialArticle && redirectToRootIfInvalid(initialArticle)) {
      loadArticle(initialArticle, false); // Avoid updating URL on initial load
    }
  });