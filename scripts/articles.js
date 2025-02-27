document.addEventListener('DOMContentLoaded', () => {
  const sideMenu = document.querySelector('#sideMenuWrapper');
  const articleWrapper = document.querySelector('#articleWrapper');
  const articleDiv = articleWrapper.querySelector('.article');

  // List of valid articles
  const validArticles = ['about', 'credits', 'general1', 'general2', 'general3', 'qh1','qh2','qh3','qh4','qh5','haarp1','haarp2','haarp3','micro1','micro2','micro3','lhc1','lhc2','lhc3'];

  const articleContents = {
    qh1: `
    <div id="articleContainer">
      <div id="articleHead">
        <h1 id="articleTitle">Misuse of Physics in Quantum Healing:</h1>
      </div>
      <div id="articleBody">
        <div class="articleItem wide">
          <p>Quantum healing is a pseudoscience that uses and misinterprets the principles of quantum physics in order to promote supposed healing properties. Most – if not all – examples of this misuse of physics involve the spread of mis/disinformation for monetary gain – a motivation common in the spread of false information <sup><a href="https://post.parliament.uk/research-briefings/post-pn-0719/" title="https://post.parliament.uk/research-briefings/post-pn-0719/" target="blank" >[1]</a></sup>.</p>
        </div>
        <div class="articleItem wide">
          <p>Widely shared across social media, quantum healing is purported as a miracle cure to many illnesses, including serious life-altering conditions such as chronic fatigue and fibromyalgia <sup><a href="https://www.facebook.com/AmandaIntuitiveConsultant" title="https://www.facebook.com/AmandaIntuitiveConsultant" target="blank" >[2]</a><a href="https://www.facebook.com/sarah.a.wilson.79" title="https://www.facebook.com/sarah.a.wilson.79" target="blank" >[3]</a></sup>. Such social media posts often extoll the supposed virtues of quantum physics by using correct scientific terms or descriptions with little to no context, or by completely misrepresenting the field.</p>
        </div>
      </div>
    </div>
    `,
    qh2: `
      <div id="articleContainer">
        <div id="articleHead">
          <h1 id="articleTitle">Physics Jargon:</h1>
        </div>
        <div id="articleBody">
          <div class="articleItem wide">
            <p>Two examples of such language in posts selling “quantum healing bracelets” include: ‘Experience the quantum entanglement of nature with our toroidal field biogeometry with the organic frequencies of life <sup><a href ="https://www.tiktok.com/@dr.jo.whitaker.healer/video/7471559686563695874?lang=en&q=quantum%20healing%20bracelet&t=1740157570256" title ="https://www.tiktok.com/@dr.jo.whitaker.healer/video/7471559686563695874?lang=en&q=quantum%20healing%20bracelet&t=1740157570256" target="blank" >[4]</a></sup>’ and ‘Quantum bracelet with scalar energy’ <sup><a href="https://www.tiktok.com/@fritz.products.an/video/7274539238836817158?lang=en&q=quantum%20healing%20bracelet&t=1740157570256" title="https://www.tiktok.com/@fritz.products.an/video/7274539238836817158?lang=en&q=quantum%20healing%20bracelet&t=1740157570256" target="blank" >[5]</a></sup>. These convoluted sentences draw on real physics principles of quantum entanglement, scalar fields and energy, and they can be filled with scientific jargon that will often have no meaning to anybody that is not familiar with the physics, meaning that it is incredibly easy to assume that these descriptions can be trusted. Such misleading and incorrect use of physics in this manner falls under ‘Misleading Content’, one of the seven types of mis- and disinformation, as defined by an ‘Essential Guide to Understanding Information Disorder’ <sup><a href ="https://firstdraftnews.org/long-form-article/understanding-information-disorder/" title="https://firstdraftnews.org/long-form-article/understanding-information-disorder/" target="blank" >[6] </a></sup>, where such content is described as ‘misleading use of information to frame an issue or individual’. Using scientific language in a misleading way not only allows the creators to push their agenda with their posts, but it also increases the perceived authenticity of their statements <sup><a href="https://www.cambridge.org/core/journals/judgment-and-decision-making/article/nonsense-math-effect/E1098F55C74B3C77E74060428F7759A0 " title="https://www.cambridge.org/core/journals/judgment-and-decision-making/article/nonsense-math-effect/E1098F55C74B3C77E74060428F7759A0" target="blank" >[7]</a><a href="https://doi.org/10.1162/jocn.2008.20040" title="https://doi.org/10.1162/jocn.2008.20040" target="blank" >[8]</a></sup>.</p>
          </div>
        </div>
      </div>
      `,
    qh3: `
      <div id="articleContainer">
        <div id="articleHead">
          <h1 id="articleTitle">Preying on vulnerability:</h1>
        </div>
        <div id="articleBody">
          <div class="articleItem wide">
            <p>This effect is only reinforced by the further portrayal of physics as a field too complicated for any prospective customers to understand, which absolves the vendor of any responsibility to provide scientific backing for their claims, and allows them to place themselves in a position of power. Quotes from real social media posts include: ‘Well, it’s quantum physics so I’m not going to get too technical’ <sup><a href="https://www.facebook.com/sarah.a.wilson.79" title="https://www.facebook.com/sarah.a.wilson.79" target="blank" >[3]</a></sup>, ‘in more layman’s terms’ <sup><a href="https://www.facebook.com/sarah.a.wilson.79" title="https://www.facebook.com/sarah.a.wilson.79" target="blank" >[3]</a></sup>, ‘you do not need to be able to understand quantum physics’ <sup><a href="https://www.facebook.com/share/r/167Fb8s5zW/" title="https://www.facebook.com/share/r/167Fb8s5zW/" target="blank" >[9]</a></sup>, and ‘the less information you know, the better’ <sup><a href="https://www.facebook.com/share/r/167Fb8s5zW/" title="https://www.facebook.com/share/r/167Fb8s5zW/" target="blank" >[9]</a></sup>. This perpetuates an ‘us versus them’ <sup><a href=" https://www.cambridge.org/core/journals/spanish-journal-of-psychology/article/are-conspiracy-theories-harmless/FA0A9D612CC82B02F91AAC2439B4A2FB " title=" https://www.cambridge.org/core/journals/spanish-journal-of-psychology/article/are-conspiracy-theories-harmless/FA0A9D612CC82B02F91AAC2439B4A2FB " target="blank" >[10]</a></sup> dynamic, reflecting the key ‘Something must be wrong’ and ‘Persecuted victim’ hallmarks of conspiracy theories seen in The Conspiracy Theory Handbook <sup><a href="https://www.climatechangecommunication.org/all/the-conspiracy-theory-handbook/" title="https://www.climatechangecommunication.org/all/the-conspiracy-theory-handbook/" target="blank" >[11]</a></sup>.<br>
            So-called quantum healers have been seen to use screenshots <sup><a href="https://www.facebook.com/miranda.wilcox.360" title="https://www.facebook.com/miranda.wilcox.360" target="blank" >[12]</a></sup> of articles on quantum entanglement in reputable journals as proof of the healing properties of their products, whilst also suggesting that scientists are only just ‘catch[ing] up’ with ideas they have known to be true for a long time. This example of confirmation bias not only strips away the context from the journal articles, but is also an example of circular reasoning, as the posts seem to imply that scientists are both correct and incorrect at the same time.</p>
          </div>
        </div>
      </div>
    `,
    qh4: `
    <div id="articleContainer">
      <div id="articleHead">
        <h1 id="articleTitle">Us vs Them - Consumers vs Scientists:</h1>
      </div>
      <div id="articleBody">
        <div class="articleItem wide">
          <p>The use of anecdotal <sup><a href="https://doi.org/10.2471/BLT.21.287654" title="https://doi.org/10.2471/BLT.21.287654" target="blank" >[13]</a></sup> evidence has been shown to have a stronger impact on the spread of misinformation. Simlarly, the EU says that medical misinformation preys on people’s fears about their health <sup><a href="https://commission.europa.eu/strategy-and-policy/coronavirus-response/fighting-disinformation_en" title="https://commission.europa.eu/strategy-and-policy/coronavirus-response/fighting-disinformation_en" target="blank" >[14]</a></sup>. Taking these ideas in combination, it is clear that proponents of quantum healing initiatives are simply exploiting the vulnerabilities of innocent people – often with painful chronic conditions <sup><a href="https://www.apa.org/pubs/reports/misinformation-consensus-statement.pdf" title="https://www.apa.org/pubs/reports/misinformation-consensus-statement.pdf" target="blank" >[15]</a></sup> – for financial gain. Additionally, people are more likely to exhibit conspiracist tendencies if they are feeling like they’ve lost control of a situation or feel threatened, which makes victims of quantum healing scams more likely to then become proponents of it themselves.</p>
        </div>
      </div>
    </div>
    `,
    qh5: `
    <div id="articleContainer">
      <div id="articleHead">
        <h1 id="articleTitle">The Truth Behind Quantum Healing:</h1>
      </div>
      <div id="articleBody">
        <div class="articleItem wide">
          <p>Unfortunately, the healing properties of quantum mechanics and the energy associated with it are simply scams fabricated by those looking to profit from vulnerable people.
          <br>
          Quantum mechanics refers to a branch of physics that deals with the interactions of matter and light on atomic and subatomic scales. These interactions don’t follow the rules of most interactions between objects, which is usually known as ‘classical mechanics’. This means that, in contrast, quantum mechanics is quite counterintuitive in comparison to our everyday classical physics. Whilst this means quantum mechanics can seem quite magical, it is in fact heavily backed by many peer-reviewed studies and is well documented and understood.</p>
        </div>
        <div class="articleItem wide">
          <h2>Energy:</h2> <br>
          <p>Many quantum healers claim that wave-particle duality demonstrates the interconnection between matter and energy, linking this directly to healing that is said to result from influencing the ‘energy field’ of the body <sup><a href="https://www.quantumenergyhealing.co.uk/" title="https://www.quantumenergyhealing.co.uk/" target="blank" >[1]</a><a href="https://www.quantumenergyhealing.co.uk/" title="https://www.quantumenergyhealing.co.uk/" target="blank" >[2]</a><a href="https://drlodayahospital.com/blogs/quantum-healing-benefits-risks/" title="https://drlodayahospital.com/blogs/quantum-healing-benefits-risks/" target="blank" >[3]</a></sup>. Unfortunately, there is no empirical evidence linking physics energy concepts such as this to any healing effects <sup><a href="https://doi.org/10.1103/physrevphyseducres.20.020145" title="https://doi.org/10.1103/physrevphyseducres.20.020145" target="blank" >[4]</a></sup>.</p>
        </div>
        <div class="articleItem wide">
          <h2>Entanglement:</h2> <br>
          <p>‘Quantum entanglement’ is a word full of physics jargon that can sound incredibly complicated, and simple explanations of this phenomenon can sound very convincing, even when they are incorrect. Contrary to some views <sup><a href="https://www.prittieyoga.co.uk/blog2024/what-is-quantum-healing" title="https://www.prittieyoga.co.uk/blog2024/what-is-quantum-healing" target="blank" >[5]</a></sup>, quantum entanglement does not provide any proof of shared consciousness or an ability to unlock your own consciousness – it instead describes the relationship between two particles, where changes to one can affect the other.<br>Whilst applying these principles to health and healing can sound promising, it is unfortunately not a real application of quantum physics, and the suggestion that every conceivable thing in the universe – including our body and our consciousness – is interconnected is unfortunately false <sup><a href="https://doi.org/10.1103/physrevphyseducres.20.020145" title="https://doi.org/10.1103/physrevphyseducres.20.020145" target="blank" >[4]</a></sup>.</p>
        </div>
        <div class="articleItem wide">
          <h2>Observer Effect:</h2> <br>
          <p>Proponents of quantum healing also often refer to the observer effect <sup><a href="https://www.prittieyoga.co.uk/blog2024/what-is-quantum-healing" title="https://www.prittieyoga.co.uk/blog2024/what-is-quantum-healing" target="blank" >[5]</a></sup> – which is the idea that in quantum physics, observing or measuring something can actually change it, because there is no way to measure something without affecting it. To understand this, imagine checking the pressure of a bike tyre – when you attach the pressure gauge, some air escapes, meaning you’ve changed the amount of air in the tyre simply by measuring it. This effect is true even on the quantum level, but some people believe that this implies our intentions shape our reality by directing energy, which is untrue. Reality cannot be determined by external human intervention <sup><a href="https://doi.org/10.1103/physrevphyseducres.20.020145" title="https://doi.org/10.1103/physrevphyseducres.20.020145" target="blank" >[4]</a></sup>.</p>
        </div>
    </div>
  </div>
    `,
    haarp1: `
    <div id="articleContainer">
      <div id="articleHead">
        <h1 id="articleTitle">Methods of Spreading:</h1>
      </div>
      <div id="articleBody">
        <div class="articleItem wide">
          <p>In many discussions surrounding this topic, there appears to be a lack of foundational arguments, leading some writers to rely on various manipulation tactics instead.<br>
          Often, rather than presenting facts, writers frame their posts as questions. For instance, a post asking, "What's going on in Houston, Texas?" over an image that may otherwise not raise too many questions, but the presence of the question means it begins to seem suspicious. By not stating their own theories, they may aim to foster curiosity among those who are unfamiliar with the issue, while allowing the imaginations of those already engaged to run rampant.<br>
          Phrases such as "if you know... you know!" exploit human nature's tendency to fear exclusion. This approach creates an impression of an insider group, enticing individuals to explore further.<br>
          The inclusion of emojis in these posts can enhance relatability, with the ‘thinking’ emoji frequently used to project a sense of reliability—suggesting that the writer is engaging in critical thinking and thereby establishing trustworthiness.<br>
          Often, precise numbers are quoted without appropriate sourcing. By being specific with what they claim to be facts or data they create a feeling of trust, as if they know exactly what is happening. This is similar to a common issue in statistical representation, where data is cited with greater precision than warranted, knowingly or not misrepresenting the inherent uncertainty in measurements and calculations, which can lead to a false sense of security regarding the certainty of the value.</p>
      </div>
    </div>
  `,
    haarp2: `
    <div id="articleContainer">
      <div id="articleHead">
        <h1 id="articleTitle">Online Influence:</h1>
      </div>
      <div id="articleBody">
        <div class="articleItem wide">
          <p>These issues are exacerbated by algorithms on platforms such as Facebook, where the primary goal is to drive engagement. Consequently, controversial posts often receive increased visibility; for example, reactions other than likes have previously been given five times the weight of likes. Fortunately, this was addressed in 2019 when data scientists at Facebook acknowledged that posts receiving angry emoji reactions were more likely to contain misinformation, subsequently leading to a change that reduced their impact on engagement<sup><a href="https://theweek.com/facebook/1006422/facebook-reportedly-gave-the-angry-emoji-5-times-as-much-weight-as-a-like" title="https://theweek.com/facebook/1006422/facebook-reportedly-gave-the-angry-emoji-5-times-as-much-weight-as-a-like" target="blank" >[1]</a></sup>.<br>While this adjustment has been made, it remains all too easy to fall into a cycle of conspiracy theories and misinformation. The ability to search for terms like "weather control" often yields numerous posts spreading misinformation, many of which feature little to no fact-checking. The influence that just a few similar searches can have on an individual's feed is concerning. One way to mitigate this effect is to periodically log out of these platforms, open a private browsing window, and observe the content that appears without the constraints of the tunnel the algorithm creates.</p>
      </div>
    </div>
  `,
    haarp3: `
    <div id="articleContainer">
      <div id="articleHead">
        <h1 id="articleTitle">Motivation:</h1>
      </div>
      <div id="articleBody">
        <div class="articleItem wide">
          <p>The immediate benefits of creating such posts are not always apparent, raising questions over why they come to exist. One possible motivation is to foster distrust in authority. If individuals can be persuaded to question smaller, less consequential matters, they may develop habits of trusting and distrusting various sources. As a result, when confronted with more significant issues, they may be more inclined to rely on less credible information sources.</p>
      </div>
    </div>
  `,
    micro1: `
    <div id="articleContainer">
      <div id="articleHead">
        <h1 id="articleTitle">The Facts:</h1>
      </div>
      <div id="articleBody">
        <div class="articleItem wide">
          <p>While there are claims regarding the potential harmful effects of using microwaves for cooking, numerous studies have demonstrated their safety. Not only do microwaves not remain in food, but they also cannot escape the microwave oven during operation. The typical wavelength of microwaves in consumer ovens is approximately 12.2 cm, which is significantly larger than the mesh covering the door that allows visibility of the food inside. This design ensures that microwaves cannot escape due to the metal surfaces surrounding them, resulting in minimal levels detectable outside the appliance, well below background levels.<br>Microwaves are a form of non-ionizing radiation. Although they can cause burns if directed at the skin, they do not have the capability to directly damage DNA within cells – the process that can lead to mutations and issues such as cancer. </p>
      </div>
    </div>
  `,
    micro2: `
    <div id="articleContainer">
      <div id="articleHead">
        <h1 id="articleTitle">Methods of Spreading:</h1>
      </div>
      <div id="articleBody">
        <div class="articleItem wide">
          <p>Inaccurate information is frequently spread on sites such as Medical Daily and Instagram, utilizing various techniques to mislead the audience.<br>One common method is the use of false source links. When individuals encounter a claim that cites a source, accompanied by a link, it can enhance their perception of the claim's legitimacy. In many cases, consumers may not take the time to verify the link, leading them to trust that credible information supports the claim. This strategy allows the creators of such content to cite sources that are unrelated to the topic at hand.<br>Another technique involves leveraging respected figures within society to build trust in their assertions. For example, references to unnamed ‘doctors’ making claims, without providing further identification or context, can manipulate public perception.<br>Additionally, the use of scientific terminology, such as 'toxins' and 'carcinogens,' can exploit individuals' inherent fear of the unknown. If a person does not fully understand the terminology, they may be more susceptible to persuasion, especially as the source presents itself with confidence. Fearmongering regarding topics like ‘colon cancer’ further preys on concerns about carcinogens—of which many exist in varying degrees and are not entirely understood. This can lead individuals to seek information from confident sources, often overlooking more balanced and nuanced literature. </p>
      </div>
    </div>
  `,
    micro3: `
    <div id="articleContainer">
      <div id="articleHead">
        <h1 id="articleTitle">What can you do to stay safe?</h1>
      </div>
      <div id="articleBody">
        <div class="articleItem wide">
          <p>It is essential to verify sources where possible and consult a variety of websites to form a well-rounded perspective on any issue. When encountering unfamiliar terms or concepts, taking the time to understand them will better equip you to assess the information presented.<br>Regarding microwave usage, no major health organizations oppose it; many of them simply offer guidelines to ensure safe practices.<br>These guidelines include ensuring your microwave is well maintained, exercising caution when removing items from the microwave due to the potential for hot containers, avoiding placing metal objects inside, and being careful when microwaving water in a clean cup. With nothing to form bubbles on, the water can heat beyond its boiling point, posing a risk of eruption when the container is removed or when an object is placed in the water, causing bubbles to form rapidly. </p>
      </div>
    </div>
  `,
    lhc1: `
    <div id="articleContainer">
      <div id="articleHead">
        <h1 id="articleTitle">What's Going On?</h1>
      </div>
      <div id="articleBody">
        <div class="articleItem wide">
          <p>When the Large Hadron Collider (LHC) was switched on in 2008, alarmist claims spread: could it create a black hole and swallow Earth? Despite extensive safety assurances from physicists, the idea gained traction in media and online forums.<br>The fear stemmed from a misunderstanding of black holes and particle physics. Theoretically, the LHC could create tiny black holes, but they would evaporate instantly due to Hawking Radiation.<sup><a href="https://doi.org/10.1016/j.ppnp.2012.03.004" title="https://doi.org/10.1016/j.ppnp.2012.03.004" target="blank" >[1]</a></sup> Cosmic rays, high-energy particles from space, collide with Earth’s atmosphere at far greater energies than those in the LHC, and the planet remains unharmed<sup><a href="http://dx.doi.org/10.1007/978-1-4020-9239-8" title="http://dx.doi.org/10.1007/978-1-4020-9239-8" target="blank" >[2]</a></sup>.<br>Why did so many believe the worst? Conspiracy theories exploit fear, distrust of experts, and exaggeration to manipulate perception. A common tactic, as seen here in the game, is creating distrust in scientists, framing them as untrustworthy or part of a cover-up. Another is making science seem intentionally complex, creating the illusion that vital information is being hidden. Conspiracy theories also rely on exaggeration and worst-case scenarios, like the claim that "The Earth could vanish in an instant!"</p>
      </div>
    </div>
  `,
    lhc2: `
    <div id="articleContainer">
      <div id="articleHead">
        <h1 id="articleTitle">Mini Black Holes:</h1>
      </div>
      <div id="articleBody">
        <div class="articleItem wide">
          <p>Despite dramatic claims, the science tells a different story. The LHC, the world’s most powerful particle accelerator, collides protons to study fundamental physics. Though this sounds extreme, the energy levels involved are far lower than those occurring naturally in the universe.<br>A major fear was that the LHC could create a black hole capable of consuming the Earth. If such black holes formed, they would be microscopic and evaporate instantly due to Hawking Radiation<sup><a href="https://doi-org.ezphost.dur.ac.uk/10.1103/PhysRevD.85.106007" title="https://doi-org.ezphost.dur.ac.uk/10.1103/PhysRevD.85.106007" target="blank" >[3]</a></sup>. The types of collisions happening in the LHC occur naturally via cosmic rays, which have struck Earth for billions of years without issue.<br>The LHC’s safety has been extensively studied. CERN, the organisation running it, published multiple reports confirming no danger<sup><a href="https://doi.org/10.48550/arXiv.0806.3414" title="https://doi.org/10.48550/arXiv.0806.3414" target="blank" >[4]</a></sup>, with independent research supporting these findings. The energies produced are far too low to pose any threat<sup><a href="https://arxiv.org/pdf/0807.3349" title="https://arxiv.org/pdf/0807.3349" target="blank" >[4]</a></sup>. The black hole theory is an example of scientific terms being misused to create fear.</p>
      </div>
    </div>
  `,
    lhc3: `
    <div id="articleContainer">
      <div id="articleHead">
        <h1 id="articleTitle">What can you do to stay safe?</h1>
      </div>
      <div id="articleBody">
        <div class="articleItem wide">
          <p>While the LHC scare may seem like a harmless misunderstanding, conspiracy theories have real consequences. Misinformation fosters distrust in science, making it harder to communicate real findings and address critical issues like climate change and medical advancements. CERN had to dedicate resources to debunking false claims, responding to public concerns, and addressing legal challenges.<br>The way conspiracy theories spread highlights the need for critical thinking. Learning to question sources, seek evidence, and understand the motivations behind claims helps separate fact from fiction. The LHC never posed a threat, but scientific misinformation remains a real danger.<br>The LHC was never a risk, yet the fear surrounding it reveals how misinformation thrives when science is misunderstood. Conspiracy theories use distrust, exaggeration, and emotional appeals to turn complex science into perceived threats. While some myths seem harmless, misinformation erodes trust in experts, misdirects attention from real issues, and even influences policy and behaviour<sup><a href="https://www.climatechangecommunication.org/all/the-conspiracy-theory-handbook/" title="https://www.climatechangecommunication.org/all/the-conspiracy-theory-handbook/" target="blank" >[5]</a></sup>.</p>
      </div>
    </div>
  `
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
