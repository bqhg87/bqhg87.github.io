document.addEventListener('DOMContentLoaded', () => {
  const sideMenu = document.querySelector('#sideMenuWrapper');
  const articleWrapper = document.querySelector('#articleWrapper');
  const articleDiv = articleWrapper.querySelector('.article');

  // List of valid articles
  const validArticles = ['about', 'credits', 'general1', 'general2', 'general3', 'article1', 'article2', 'article3', 'article4', 'article5'];

  const articleContents = {
    about: `
      <div id="articleContainer">
        <div id="articleHead">
          <h1 id="articleTitle">About:</h1>
        </div>
        <div id="articleBody">
          <div class="articleItem wide">
            <p>Quantum healing is a pseudoscience that uses and misinterprets the principles of quantum physics in order to promote supposed healing properties. Most – if not all – examples of this misuse of physics involve the spread of mis/disinformation for monetary gain – a motivation common in the spread of false information </p>
          </div>
          <div class="articleItem left2">
            <p>The Chernobyl nuclear <span class="underline">accident</span> occurred in 1986, caused by a combination of faulty reactor design and poor personnel training. Following a shutdown test, reactor number  4 of the plant exploded and released smoke fission products and debris. The majority of material was deposited near the site, but lighter fission products were carried northwest by the wind. A fire broke out and firefighters called to put it out. The accident caused the largest uncontrolled radioactive release into the environment ever recorded for a civilian operation. The accident released radioactive substances into the air for around 10 days, with Iodine-131 and Casesium-137 contributing significantly to radiation doses. The accident killed 30 operators and firemen and 237 people onsite were diagnosed with acute radiation syndrome (ARS) and 28 died as a result.  </p>
          </div>
          <img class="articleItem right" src="./assets/test.png"></img>
        </div>
      </div>
    `,
    credits: `
      <div id="articleContainer">
        <div id="articleHead">
          <h1 id="articleTitle">Credits:</h1>
        </div>
      </div>
    `,
  };
  
  const fetchArticleContent = (article) => {
    return new Promise((resolve) => {
      resolve(articleContents[article] || `<p>Article not found.</p>`);
    });
  };

  // Crossfade effect implementation
  const crossDissolve = async (newContent) => {
    articleDiv.classList.add('fade-out');
    await new Promise((resolve) => setTimeout(resolve, 200)); // Wait for fade-out animation
  
    articleDiv.innerHTML = newContent;
  
    // Reset the scroll position to the top of the article
    articleDiv.scrollTop = 0;
  
    articleDiv.classList.remove('fade-out');
    articleDiv.classList.add('fade-in');
    setTimeout(() => {
      articleDiv.classList.remove('fade-in');
    }, 200);
  };
  

  // Load an article
  window.loadArticle = async(article, updateURL=true) => {
    const content = await fetchArticleContent(article);
    await crossDissolve(content);
    articleWrapper.classList.add('show');
    
    const mainGameMenu = document.getElementById('mainGameMenuWrapper');
    mainGameMenu.classList.add('hidden');

    // Update the URL after the animation finishes
    if (updateURL) {
      history.pushState({ article }, '', `?article=${article}`);
    }

    // Check for viewport width and hide the sidebar if necessary
    if (window.innerWidth <= 930) {
      hideSidebar();
    }

    refreshCloseMenuButtons();
    updateHeadButtonsVisibility();
    updateFootButtonsVisibility();
    checkArticleOverflow();
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
