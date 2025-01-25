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
        resolve(`<p style="grid-column: span 1; height: fit-content;">${article}</p><p style="grid-column: span 2; height: fit-content;">This is content for the ${article} article.</p>`);
      }, 0); // Simulate network delay
    });
  };

  // Crossfade effect implementation
  const crossDissolve = async (newContent) => {
    articleDiv.classList.add('fade-out');
    await new Promise((resolve) => setTimeout(resolve, 200)); // Wait for fade-out animation

    articleDiv.innerHTML = newContent;

    articleDiv.classList.remove('fade-out');
    articleDiv.classList.add('fade-in');
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

    // Check for viewport width and hide the sidebar if necessary
    if (window.innerWidth <= 930) {
      hideSidebar();
    }

    updateHeadButtonsVisibility();
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

  // Function to hide sidebar
  const hideSidebar = () => {
    if (!sideMenu.classList.contains('fade-out')) {
      sideMenu.classList.add('fade-out');
      setTimeout(() => {
        sideMenu.classList.remove('fade-out', 'show');
      }, 200); // 200ms delay to match the fade-out duration
    }
  };

  // Function to show sidebar
  const showSidebar = () => {
    // Only add 'show' class if it's not already there and if the article is open
    if (!sideMenu.classList.contains('show') && articleWrapper.classList.contains('show')) {
      sideMenu.classList.remove('fade-out');
      sideMenu.classList.add('show');
    } else {
      sideMenu.classList.remove('fade-out');
    }
  };

  // Variable to store the previous window width
  let previousWidth = window.innerWidth;

  // Handle window resize with buffer
  window.addEventListener('resize', () => {
    const width = window.innerWidth;

    // Only trigger state change if window width clearly crosses 930px threshold
    if (width <= 930 && previousWidth > 930) {
      // Only hide the sidebar if article is open
      if (articleWrapper.classList.contains('show')) {
        hideSidebar();
      }
    } else if (width > 930 && previousWidth <= 930) {
      // Only show the sidebar if article is open
      if (articleWrapper.classList.contains('show')) {
        showSidebar();
      }
    }

    // Update previousWidth to current width after handling
    previousWidth = width;
  });
});
