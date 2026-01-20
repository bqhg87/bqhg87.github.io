document.addEventListener('DOMContentLoaded', () => {
  const sideMenu = document.querySelector('#sideMenuWrapper');
  const articleWrapper = document.querySelector('#articleWrapper');
  const articleDiv = articleWrapper.querySelector('.article');

  // List of valid articles
  const validArticles = ['about', 'howToPlay','credits','references', 'qh1','qh2','qh3','qh4','qh5','haarp1','haarp2','haarp3','micro1','micro2','micro3','lhc1','lhc2','lhc3','ne1','ne2','ne3','grb1','grb2','grb3','fiveg1','fiveg2','fiveg3','conclusionInform'];

  const articleContents = {
    about:`
    <div id="articleContainer">
      <div id="articleHead">
        <h1 id="articleTitle">About:</h1>
      </div>
      <div id="articleBody">
        <div class="articleItem wide">
          <p>Conspiracy theories have existed for centuries, but in the digital age, they spread faster than ever. Echo Grove explores some of the most well-known physics-related conspiracies, including fears about 5G radiation, the Large Hadron Collider creating black holes, gamma ray bursts, HAARP controlling the weather, quantum healing devices, the dangers of nuclear power, and microwave ovens emitting harmful radiation. <br><br> Players will encounter conspiracy theorists, sceptical scientists, and conflicting narratives, choosing to uncover the scientific truth or fuel public paranoia.<br>We created this game to address the misuse of physics in conspiracy theories. Scientific concepts are often misunderstood, exaggerated, or deliberately distorted to create fear and distrust. By placing players in these scenarios, we aim to demonstrate how misinformation spreads and how scientific literacy can challenge it.<br><br> We are a group of Durham University students passionate about science communication and critical thinking. Through this game, we want to highlight the importance of questioning sources, understanding real physics, and recognising how conspiracy theories manipulate information. The world of science is full of incredible discoveries, but separating fact from fiction has never been more important.<br><br> We hope you enjoy the game!</p>
        </div>
      </div>
    </div>
    `,
    howToPlay:`
    <div id="articleContainer">
      <div id="articleHead">
        <h1 id="articleTitle">How To Play</h1>
      </div>
      <div id="articleBody">
        <div class="articleItem wide">
          <h2>Movement controls</h2>
          <p>Use wasd, arrow keys or cursor clicks to move around the map</p>
          <h2>Interacting</h2>
          <p>Use spacebar to interact with NPCs and complete quests</p>
      </div>
    </div>
    `,
    credits:`
    <div id="articleContainer">
      <div id="articleHead">
        <h1 id="articleTitle">Credits:</h1>
      </div>
      <div id="articleBody">
        <div class="articleItem wide">
          <p>This game was created as part of the Digital Media Project component of the Physics in Society module at Durham University. Our goal was to educate the general public on the misuse of physics in an engaging and accessible way. We hope you've learned more about how physics can be misrepresented and the impact of these misconceptions.</p>
        </div>
        <div class="articleItem wide">
          <h2>Contributions:</h2>
          <ul class="wide-spacing bulleted">
            <li><p><span class="darkened">Hamish Campbell</span> - Nuclear Energy script, Nuclear Energy article, artwork, implementation, coding, text entry and article editing.</p></li>
            <li><p><span class="darkened">Jayden Heppenstall</span> - Microwaves script, Gamma Ray Bursts article, Weather control article, Microwaves article, set design, implementation, coding and text entry.</p></li>
            <li><p><span class="darkened">George Seddon</span> - Game design, implementation, coding, map design, additional script writing, editing and artwork.</p></li>
            <li><p><span class="darkened">George Scott</span> - Introductory article, LHC script, 5G script, LHG article and 5G article.</p></li>
            <li><p><span class="darkened">Zahra Wilkinson</span> - Quantum healing script, Gamma Ray Bursts script, Weather control script, Quantum healing article, Nuclear Energy article,playtesting and credits.</p></li>
          <ul>
          <h2>Game Assets and Images</h2>
          <ul class="wide-spacing bulleted">
            <li><p><a href="https://cupnooble.itch.io/sprout-lands-asset-pack">Sprout Lands Asset Pack</a>, Licensed for non-commerical use from <a href="https://cupnooble.itch.io/">Cup Nooble</a> <br> (Note: while some sprites were used, others were simply inspired by the original style.)</p></li>
            <li><p><a href="https://shubibubi.itch.io/cozy-people">Cozy Town Asset Pack</a>, Licensed for non-commercial reuse from <a href="https://shubibubi.itch.io/">shubibubi</a> <br> (Note: no character sprites were used. This resource was just used as a primary reference.)</p></li>
            <li><p><a href="https://commons.wikimedia.org/wiki/File:Microwave_oven_(interior).jpg">Mk2010</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons</p></li>
            <li><p><a href="GRB080319B illustration NASA.jpg">Mk2010</a>, <a href="https://www.nasa.gov/nasa-brand-center/images-and-media/">Licensed under NASA image policy</a>, via Wikimedia Commons</p></li>
            <li><p><a href="https://commons.wikimedia.org/wiki/File:High_Frequency_Active_Auroral_Research_Program_site.jpg">United States Federal Government</a>, Public domain, via Wikimedia Commons</p></li>
            <li><p><a href="https://commons.wikimedia.org/wiki/File:Aurora_borealis_above_Lyngenfjorden,_2012_March.jpg">Ximonic (Simo Räsänen)</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons</p></li>
            <li><p><a href="https://commons.wikimedia.org/wiki/File:SPDC_figure.png">SPDC figure</a>, <a href="http://www.gnu.org/copyleft/fdl.html">GFDL</a>, via Wikimedia Commons</p></li>
            <li><p><a href="https://picryl.com/media/pripyat-chernobyl-free-photos-8b2dad">Pripyat Chernobyl Free Photos</a>, <a href="https://web.archive.org/web/20161229043156/https://pixabay.com/en/service/terms/">Pixabay License</a>, via Pixabay</p></li>
            <li><p><a href="https://www.flickr.com/photos/nrcgov/52827364534">Nuclear Fission</a>, <a href="https://creativecommons.org/licenses/by/2.0/">Creative Commons CC BY 2.0</a>, via Flickr</p></li>
          </ul>
          <p>Special thanks to Dr Paul Mackay for his invaluable advice and guidance throughout the creation and development of this project.</p>
        </div>
      </div>
    </div>
    `,
    references:`
      <div id="articleContainer">
        <div id="articleHead">
          <h1 id="articleTitle">References:</h1>
        </div>
        <div id="articleBody">
          <div class="articleItem wide">
            <h2>Quantum Healing:</h2>
            <ol>
              <li>United Kingdom. Parliamentary Office of Science and Technology (2024). Disinformation: sources, spread and impact (POSTnote 719). doi: 10.58248/PN719.</li>
              <li>Amanda Jesenska (2025) 7 February. Available at: <a href="https://www.facebook.com/AmandaIntuitiveConsultant" title="https://www.facebook.com/AmandaIntuitiveConsultant" target="blank">https://www.facebook.com/AmandaIntuitiveConsultant</a>. (Accessed: 21 February 2025)</li>
              <li>Sarah Wilson (2025) 22 January. Available at: <a href="https://www.facebook.com/sarah.a.wilson.79" title="https://www.facebook.com/sarah.a.wilson.79" target="blank">https://www.facebook.com/sarah.a.wilson.79</a>. (Accessed: 21 February 2025).</li>
              <li>Jo Whitaker (2025) 15 February. Available at: <a href="https://www.tiktok.com/@dr.jo.whitaker.healer/video/7471559686563695874?lang=en&q=quantum%20healing%20bracelet&t=1740157570256" title="https://www.tiktok.com/@dr.jo.whitaker.healer/video/7471559686563695874?lang=en&q=quantum%20healing%20bracelet&t=1740157570256" target="blank"> https://www.tiktok.com/@dr.jo.whitaker.healer/video/7471559686563695874?lang=en&q=quantum%20healing%20bracelet&t=1740157570256</a>. (Accessed: 21 February 2025).</li>
              <li>Fritz Products and Services (2023) 3 September. Available at: <a href="https://www.tiktok.com/@fritz.products.an/video/7274539238836817158?lang=en&q=quantum%20healing%20bracelet&t=1740157570256" title="https://www.tiktok.com/@fritz.products.an/video/7274539238836817158?lang=en&q=quantum%20healing%20bracelet&t=1740157570256" target="blank">https://www.tiktok.com/@fritz.products.an/video/7274539238836817158?lang=en&q=quantum%20healing%20bracelet&t=1740157570256</a>. (Accessed: 21 February 2025).</li>
              <li>Wardle, C. (2020). 'Understanding Information disorder', First Draft News, 22 September. Available at: <a href="https://firstdraftnews.org/long-form-article/understanding-information-disorder/" title="https://firstdraftnews.org/long-form-article/understanding-information-disorder/" target="blank">https://firstdraftnews.org/long-form-article/understanding-information-disorder/</a>. (Accessed: 21 February 2025).</li>
              <li>Eriksson, K. (2012). The nonsense math effect. Judgment and Decision Making, 7(6), pp.746-749. doi: <a href="https://doi.org/10.1017/s1930297500003296" title="doi: 10.1017/s1930297500003296" target="blank">10.1017/s1930297500003296</a>.</li>
              <li>Weisberg, D.S., Keil, F.C., Goodstein, J., Rawson, E. and Gray, J.R. (2008). The Seductive Allure of Neuroscience Explanations. Journal of Cognitive Neuroscience, [online] 20(3), pp.470-477. doi: <a href="https://doi.org/10.1162/jocn.2008.20040" title="doi: 10.1162/jocn.2008.20040" target="blank" target="blank">10.1162/jocn.2008.20040</a>.</li>
              <li>Sophie Russell (2025) 21 January. Available at: <a href="https://www.facebook.com/share/r/167Fb8s5zW/" title="https://www.facebook.com/share/r/167Fb8s5zW/" target="blank">https://www.facebook.com/share/r/167Fb8s5zW/</a>. (Accessed: 21 February 2025).</li>
              <li>Douglas, K.M. (2021). Are Conspiracy Theories Harmless? The Spanish Journal of Psychology, [online] 24(e13). doi: <a href="https://doi.org/10.1017/sjp.2021.10" title="doi: 10.1017/sjp.2021.10" target="blank">10.1017/sjp.2021.10</a>.</li>
              <li>Lewandowsky, S. and Cook, J. (2020). The Conspiracy Theory Handbook. Available at: <a href="https://www.climatechangecommunication.org/all/the-conspiracy-theory-handbook/" title="https://www.climatechangecommunication.org/all/the-conspiracy-theory-handbook/" target="blank">https://www.climatechangecommunication.org/all/the-conspiracy-theory-handbook/</a>. (Accessed: 21 February 2025).</li>
              <li>Miranda Wilcox (2025) 6 February. Available at: <a href="https://www.facebook.com/miranda.wilcox.360" title="https://www.facebook.com/miranda.wilcox.360" target="blank">https://www.facebook.com/miranda.wilcox.360</a>. (Accessed: 21 February 2025).</li>
              <li>Borges do Nascimento, I.J., Beatriz Pizarro, A., Almeida, J., Azzopardi-Muscat, N., André Gonçalves, M., Björklund, M. and Novillo-Ortiz, D. (2022). Infodemics and health misinformation: a systematic review of reviews. Bulletin of the World Health Organization, [online] 100(9), pp.544-561. doi: <a href="https:// doi.org/10.2471/blt.21.287654" title="doi: 10.2471/blt.21.287654" target="blank">10.2471/blt.21.287654</a>.</li>
              <li>European Commission (no date). Fighting disinformation. Available at: <a href="https://commission.europa.eu/strategy-and-policy/coronavirus-response/fighting-disinformation_en" title="https://commission.europa.eu/strategy-and-policy/coronavirus-response/fighting-disinformation_en" target="blank">https://commission.europa.eu/strategy-and-policy/coronavirus-response/fighting-disinformation_en</a>. (Accessed: 21 February 2025).</li>
              <li>van der Linden, S., Albarracín, D., Fazio, L., Freelon, D., Roozenbeek, J., Swire-Thompson, B. and Van Bavel, J. (2023). Using psychology to understand and fight health misinformation. Washington, DC: American Psychological Association. Available at: <a href="https://www.apa.org/pubs/reports/misinformation-consensus-statement.pdf" title="https://www.apa.org/pubs/reports/misinformation-consensus-statement.pdf" target="blank">https://www.apa.org/pubs/reports/misinformation-consensus-statement.pdf</a>. (Accessed: 21 February 2025).</li>
            </ol>
            <h2>Weather Control Conspiracy Theories:</h2>
            <ol>
              <li>Check, R.F. (2024). Fact Check: Northern Lights were not man-made, contrary to social media claims. Reuters. [online] 20 May. Available at: https://www.reuters.com/fact-check/northern-lights-were-not-man-made-contrary-social-media-claims-2024-05-20/.</li>
              <li>Full Fact (2024). HAARP research facility was not behind recent UK Northern Lights sightings - Full Fact. [online] Full Fact. Available at: https://fullfact.org/online/haarp-northern-lights/ [Accessed 28 Feb. 2025].</li>
              <li>Ho, S.S., Looi, J., Chuah, A.S.F., Leong, A.D. and Pang, N. (2018). 'I can live with nuclear energy if…': Exploring public perceptions of nuclear energy in Singapore. Energy Policy, 120, pp.436-447. doi:https://doi.org/10.1016/j.enpol.2018.05.060.</li>
              <li>Internet Archive. (2023). 1/16/23 Instagram post by thetruthworldorder : Free Download, Borrow, and Streaming : Internet Archive. [online] Available at: https://archive.org/details/20230120_20230120_0119 [Accessed 28 Feb. 2025].</li>
              <li>Morrow, B. (2021). Facebook reportedly gave the angry emoji 5 times as much weight as a 'like'. [online] The Week. Available at: https://theweek.com/facebook/1006422/facebook-reportedly-gave-the-angry-emoji-5-times-as-much-weight-as-a-like [Accessed 28 Feb. 2025].</li>
              <li>published, B.C. (2010). Chavez: US 'Tectonic Weapon' Caused Haiti Quake. [online] livescience.com. Available at: https://www.livescience.com/8071-chavez-tectonic-weapon-caused-haiti-quake.html.</li>
            </ol>
            <h2>Microwaves:</h2>
            <ol>
              <li>published, B.C. (2010). Chavez: US 'Tectonic Weapon' Caused Haiti Quake. [online] livescience.com. Available at: https://www.livescience.com/8071-chavez-tectonic-weapon-caused-haiti-quake.html.</li>
              <li>Cercone, Jeff. “Colon Cancer Not Linked to Cooking in Microwave Ovens.” @Politifact, 2024, www.politifact.com/factchecks/2023/feb/01/instagram-posts/microwave-ovens-arent-causing-colon-cancer-despite/. Accessed 12 Feb. 2025.</li>
              <li>“Microwave Ovens.” Microwave Ovens, U.S. Food and Drug Administration, 20 Mar. 2023, www.fda.gov/radiation-emitting-products/resources-you-radiation-emitting-products/microwave-ovens#Cooking_with_Microwaves. Accessed 14 Feb. 2025.</li>
            </ol>
            <h2>Black Holes at the LHC:</h2>
            <ol>
              <li>Park, S.C. (2012). Black holes and the LHC: A review. Progress in Particle and Nuclear Physics, 67(3), pp.617-650. doi:https://doi.org/10.1016/j.ppnp.2012.03.004.</li>
              <li>Dorman, L. (2009). Cosmic Rays in Magnetospheres of the Earth and other Planets. Astrophysics and space science library. Springer Nature (Netherlands). doi:https://doi.org/10.1007/978-1-4020-9239-8.</li>
              <li>Ellis, J., Giudice, G., Mangano, M., Tkachev, I. and Wiedemann, U. (2008). Review of the safety of LHC collisions. Journal of Physics G: Nuclear and Particle Physics, [online] 35(11), p.115004. doi:https://doi.org/10.1088/0954-3899/35/11/115004.</li>
              <li>Ellis, J., Giudice, G., Mangano, M., Tkachev, I. and Wiedemann, U. (2008). Review of the safety of LHC collisions. Journal of Physics G: Nuclear and Particle Physics, [online] 35(11), p.115004. doi:https://doi.org/10.1088/0954-3899/35/11/115004.</li>
              <li>Koch, B., Bleicher, M. and Horst Stöcker (2009). Exclusion of black hole disaster scenarios at the LHC. Physics Letters B, [online] 672(1), pp.71-76. doi:https://doi.org/10.1016/j.physletb.2009.01.003.</li>
              <li>Lewandowsky, S. and Cook, J. (2023). The Conspiracy Theory Handbook - Center for Climate Change Communication. [online] Center for Climate Change Communication. Available at: https://www.climatechangecommunication.org/all/the-conspiracy-theory-handbook/.</li>
            </ol>
            <h2>Nuclear Energy:</h2>
            <ol>
              <li> Scheer, D., Konrad, W. and Wassermann, S. (2017). The good, the bad, and the ambivalent: A qualitative study of public perceptions towards energy technologies and portfolios in Germany. Energy Policy, [online] 100, pp.89-100. doi: 10.1016/j.enpol.2016.09.061.</li>
              <li>Gupta, K., Nowlin, M.C., Ripberger, J.T., Jenkins-Smith, H.C. and Silva, C.L. (2019). Tracking the nuclear 'mood' in the United States: Introducing a long term measure of public opinion about nuclear energy using aggregate survey data. Energy Policy, 133, p.110888. doi: 10.1016/j.enpol.2019.110888.</li>
              <li>World Nuclear Association (2025). Chernobyl Accident 1986. Available at: https://world-nuclear.org/information-library/safety-and-security/safety-of-plants/chernobyl-accident (Accessed: 26 February 2025).</li>
              <li>Bourguignon, D. and Scholz, N. (2016). Chernobyl 30 years on: Environmental and health effects. Brussels: European Parliamentary Research Service. Available at: https://www.europarl.europa.eu/thinktank/en/document/EPRS_BRI(2016)581972 (Accessed: 26 February 2025).</li>
              <li>Chernobyl Forum (2005). Chernobyl's Legacy: Health, Environmental and Socio-economic Impacts and Recommendations to the Governments of Belarus, the Russian Federation and Ukraine. 2nd rev. ed. Vienna: United Nations. Available at: https://www.iaea.org/sites/default/files/chernobyl.pdf (Accessed: 26 February 2025).</li>
              <li>Gray, R. (2019). 'The true toll of the Chernobyl disaster', BBC Future, 26 July. Available at: https://www.bbc.co.uk/future/article/20190725-will-we-ever-know-chernobyls-true-death-toll (Accessed: 26 February 2025).</li>
              <li>BBC News (2023). 'Fukushima disaster: What happened at the nuclear plant', BBC News, 23 August. Available at: https://www.bbc.co.uk/news/world-asia-56252695 (Accessed: 26 February 2025).</li>
              <li>Cantwell, M. (2021). Ten years later, here's what Fukushima's damaged reactors look like today. Science. doi: 10.1126/science.abi5976.</li>
              <li>World Nuclear Association (2024). Fukushima Daiichi Accident. Available at: https://world-nuclear.org/information-library/safety-and-security/safety-of-plants/fukushima-daiichi-accident#:~:text=Official%20figures%20show%20that%20there,by%20the%20earthquake%20or%20tsunami (Accessed: 26 February 2025).</li>
              <li>Chughtai, A. (2021). 'The Fukushima disaster in maps and charts', Al Jazeera, 10 March. Available at: https://www.aljazeera.com/news/2021/3/10/fukushima-disaster-in-maps-and-charts (Accessed: 26 February 2025).</li>
              <li>Duda, A. and Takamitsu Jimura (2024). Nuclear accident sites and tourism: a comparative analysis of the Chernobyl and Fukushima exclusion zones. Current Issues in Tourism, pp.1-18. doi: 10.1080/13683500.2023.2298344.</li>
              <li>Bradley, S. (2025). 6 February. Available at: https://www.facebook.com/thesusanbradley/. (Accessed: 26 February 2025).</li>
              <li>World Nuclear Association (2024). Radioactive Waste - Myths and Realities. Available at: https://world-nuclear.org/information-library/nuclear-fuel-cycle/nuclear-waste/radioactive-wastes-myths-and-realities (Accessed: 26 February 2025).</li>
              <li>Australian Radiation Protection and Nuclear Safety Agency (2017). What is ionising radiation? Available at: https://www.arpansa.gov.au/understanding-radiation/what-is-radiation/ionising-radiation (Accessed: 26 February 2025).</li>
              <li>World Health Organization (2020). Radiation: Ionizing radiation. Available at: https://www.who.int/news-room/questions-and-answers/item/radiation-ionizing-radiation (Accessed: 26 February 2025). </li>
              <li>Natural Resources Defence Council (2022). Nuclear Power 101. Available at: https://www.nrdc.org/stories/nuclear-power-101 (Accessed: 26 February 2025).</li>
              <li>International Atomic Energy Agency (2024). International Day of Clean Energy: Why Nuclear Power? Available at: https://www.iaea.org/newscenter/news/international-day-of-clean-energy-why-nuclear-power (Accessed: 26 February 2025).</li>
              <li>Office of Nuclear Energy, U.S. Department of Energy (2025). Nuclear Power is the Most Reliable Energy Source and It's Not Even Close. Available at: https://www.energy.gov/ne/articles/nuclear-power-most-reliable-energy-source-and-its-not-even-close (Accessed: 26 February 2025).</li>
              <li>United Kingdom. Parliamentary Office of Science and Technology (2024). Disinformation: sources, spread and impact (POSTnote 719). doi: 10.58248/PN719.</li>
              <li>Martel, C., Pennycook, G. and Rand, D.G. (2020). Reliance on Emotion Promotes Belief in Fake News. Cognitive Research: Principles and Implications, 5(1), pp.1-20. doi: 10.1186/s41235-020-00252-3.</li>
              <li>American Psychological Association (2024). 8 recommendations for countering misinformation. Available at: https://www.apa.org/topics/journalism-facts/misinformation-recommendations (Accessed: 26 February 2025).</li>
              <li>Lewandowsky, S. and Cook, J. (2020). The Conspiracy Theory Handbook. Available at: https://www.climatechangecommunication.org/all/the-conspiracy-theory-handbook/. (Accessed: 21 February 2025).</li>
            </ol>
            <h2>Gamma Ray Bursts:</h2>
              <ol>
                <li>Cain, F. and Today, U. (2015). Are gamma ray bursts dangerous? [online] phys.org. Available at: https://phys.org/news/2015-01-gamma-ray-dangerous.html [Accessed 21 Feb. 2025].</li>
                <li>Gronstal, A. (2016). NASA Astrobiology. [online] astrobiology.nasa.gov. Available at: https://astrobiology.nasa.gov/news/how-deadly-would-a-nearby-gamma-ray-burst-be/ [Accessed 21 Feb. 2025].</li>
                <li>Thomas, B.C. (2009). Gamma-ray bursts as a threat to life on Earth. International Journal of Astrobiology, 8(3), pp.183-186. doi:https://doi.org/10.1017/s1473550409004509.</li>
              </ol>
            <h2>5G:</h2>
              <ol>
                <li>Gultekin, D.H. and Siegel, P.H. (2020). Absorption of 5G Radiation in Brain Tissue as a Function of Frequency, Power and Time. IEEE Access, [online] 8, pp.115593-115612. doi:https://doi.org/10.1109/ACCESS.2020.3002183.</li>
                <li>Di Ciaula, A. (2018). Towards 5G communication systems: Are there health implications? International Journal of Hygiene and Environmental Health, [online] 221(3), pp.367-375. doi:https://doi.org/10.1016/j.ijheh.2018.01.011.</li>
                <li>Moglia, A., Georgiou, K., Marinov, B., Georgiou, E., Berchiolli, R.N., Satava, R.M. and Cuschieri, A. (2022). 5G in Healthcare: from COVID-19 to Future Challenges. IEEE journal of biomedical and health informatics, [online] PP. doi:https://doi.org/10.1109/JBHI.2022.3181205.</li>
                <li>Lewandowsky, S. and Cook, J. (2020). The Conspiracy Theory Handbook. [online] Available at: https://www.climatechangecommunication.org/wp-content/uploads/2023/09/ConspiracyTheoryHandbook.pdf.</li>
              </ol> 
          </div>
        </div>
      </div>

    `,
    qh1: `
    <div id="articleContainer">
      <div id="articleHead">
        <h1 id="articleTitle">Misuse of Physics in Quantum Healing:</h1>
      </div>
      <div id="articleBody">
        <div class="articleItem wide">
          <p>Quantum healing is a pseudoscience that uses and misinterprets the principles of quantum physics in order to promote supposed healing properties. Most - if not all - examples of this misuse of physics involve the spread of mis/disinformation for monetary gain - a motivation common in the spread of false information <sup><a href="https://post.parliament.uk/research-briefings/post-pn-0719/" title="https://post.parliament.uk/research-briefings/post-pn-0719/" target="blank" >[1]</a></sup>. <br><br>
          Widely shared across social media, quantum healing is purported as a miracle cure to many illnesses, including serious life-altering conditions such as chronic fatigue and fibromyalgia <sup><a href="https://www.facebook.com/AmandaIntuitiveConsultant" title="https://www.facebook.com/AmandaIntuitiveConsultant" target="blank" >[2]</a><a href="https://www.facebook.com/sarah.a.wilson.79" title="https://www.facebook.com/sarah.a.wilson.79" target="blank" >[3]</a></sup>. Such social media posts often extoll the supposed virtues of quantum physics by using correct scientific terms or descriptions with little to no context, or by completely misrepresenting the field.</p>
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
            <p>Two examples of such language in posts selling “quantum healing bracelets” include: 'Experience the quantum entanglement of nature with our toroidal field biogeometry with the organic frequencies of life <sup><a href ="https://www.tiktok.com/@dr.jo.whitaker.healer/video/7471559686563695874?lang=en&q=quantum%20healing%20bracelet&t=1740157570256" title ="https://www.tiktok.com/@dr.jo.whitaker.healer/video/7471559686563695874?lang=en&q=quantum%20healing%20bracelet&t=1740157570256" target="blank" >[4]</a></sup>' and 'Quantum bracelet with scalar energy' <sup><a href="https://www.tiktok.com/@fritz.products.an/video/7274539238836817158?lang=en&q=quantum%20healing%20bracelet&t=1740157570256" title="https://www.tiktok.com/@fritz.products.an/video/7274539238836817158?lang=en&q=quantum%20healing%20bracelet&t=1740157570256" target="blank" >[5]</a></sup>. These convoluted sentences draw on real physics principles of quantum entanglement, scalar fields and energy, and they can be filled with scientific jargon that will often have no meaning to anybody that is not familiar with the physics, meaning that it is incredibly easy to assume that these descriptions can be trusted. Such misleading and incorrect use of physics in this manner falls under 'Misleading Content', one of the seven types of mis- and disinformation, as defined by an 'Essential Guide to Understanding Information Disorder' <sup><a href ="https://firstdraftnews.org/long-form-article/understanding-information-disorder/" title="https://firstdraftnews.org/long-form-article/understanding-information-disorder/" target="blank" >[6] </a></sup>, where such content is described as 'misleading use of information to frame an issue or individual'. Using scientific language in a misleading way not only allows the creators to push their agenda with their posts, but it also increases the perceived authenticity of their statements <sup><a href="https://www.cambridge.org/core/journals/judgment-and-decision-making/article/nonsense-math-effect/E1098F55C74B3C77E74060428F7759A0 " title="https://www.cambridge.org/core/journals/judgment-and-decision-making/article/nonsense-math-effect/E1098F55C74B3C77E74060428F7759A0" target="blank" >[7]</a><a href="https://doi.org/10.1162/jocn.2008.20040" title="https://doi.org/10.1162/jocn.2008.20040" target="blank" >[8]</a></sup>.</p>
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
            <p>This effect is only reinforced by the further portrayal of physics as a field too complicated for any prospective customers to understand, which absolves the vendor of any responsibility to provide scientific backing for their claims, and allows them to place themselves in a position of power. Quotes from real social media posts include: 'Well, it's quantum physics so I'm not going to get too technical' <sup><a href="https://www.facebook.com/sarah.a.wilson.79" title="https://www.facebook.com/sarah.a.wilson.79" target="blank" >[3]</a></sup>, 'in more layman's terms' <sup><a href="https://www.facebook.com/sarah.a.wilson.79" title="https://www.facebook.com/sarah.a.wilson.79" target="blank" >[3]</a></sup>, 'you do not need to be able to understand quantum physics' <sup><a href="https://www.facebook.com/share/r/167Fb8s5zW/" title="https://www.facebook.com/share/r/167Fb8s5zW/" target="blank" >[9]</a></sup>, and 'the less information you know, the better' <sup><a href="https://www.facebook.com/share/r/167Fb8s5zW/" title="https://www.facebook.com/share/r/167Fb8s5zW/" target="blank" >[9]</a></sup>. This perpetuates an 'us versus them' <sup><a href=" https://www.cambridge.org/core/journals/spanish-journal-of-psychology/article/are-conspiracy-theories-harmless/FA0A9D612CC82B02F91AAC2439B4A2FB " title=" https://www.cambridge.org/core/journals/spanish-journal-of-psychology/article/are-conspiracy-theories-harmless/FA0A9D612CC82B02F91AAC2439B4A2FB " target="blank" >[10]</a></sup> dynamic, reflecting the key 'Something must be wrong' and 'Persecuted victim' hallmarks of conspiracy theories seen in The Conspiracy Theory Handbook <sup><a href="https://www.climatechangecommunication.org/all/the-conspiracy-theory-handbook/" title="https://www.climatechangecommunication.org/all/the-conspiracy-theory-handbook/" target="blank" >[11]</a></sup>.<br>
            So-called quantum healers have been seen to use screenshots <sup><a href="https://www.facebook.com/miranda.wilcox.360" title="https://www.facebook.com/miranda.wilcox.360" target="blank" >[12]</a></sup> of articles on quantum entanglement in reputable journals as proof of the healing properties of their products, whilst also suggesting that scientists have only just 'caught on' with ideas they have known to be true for a long time. This example of confirmation bias not only strips away the context from the journal articles, but is also an example of circular reasoning, as the posts seem to imply that scientists are both correct and incorrect at the same time.</p>
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
          <p>The use of anecdotal <sup><a href="https://doi.org/10.2471/BLT.21.287654" title="https://doi.org/10.2471/BLT.21.287654" target="blank" >[13]</a></sup> evidence has been shown to have a stronger impact on the spread of misinformation. Simlarly, the EU says that medical misinformation preys on people's fears about their health <sup><a href="https://commission.europa.eu/strategy-and-policy/coronavirus-response/fighting-disinformation_en" title="https://commission.europa.eu/strategy-and-policy/coronavirus-response/fighting-disinformation_en" target="blank" >[14]</a></sup>. Taking these ideas in combination, it is clear that proponents of quantum healing initiatives are simply exploiting the vulnerabilities of innocent people - often with painful chronic conditions <sup><a href="https://www.apa.org/pubs/reports/misinformation-consensus-statement.pdf" title="https://www.apa.org/pubs/reports/misinformation-consensus-statement.pdf" target="blank" >[15]</a></sup> - for financial gain. Additionally, people are more likely to exhibit conspiracist tendencies if they are feeling like they've lost control of a situation or feel threatened, which makes victims of quantum healing scams more likely to then become proponents of it themselves.</p>
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
          Quantum mechanics refers to a branch of physics that deals with the interactions of matter and light on atomic and subatomic scales. These interactions don't follow the rules of most interactions between objects, which is usually known as 'classical mechanics'. This means that, in contrast, quantum mechanics is quite counterintuitive in comparison to our everyday classical physics. Whilst this means quantum mechanics can seem quite magical, it is in fact heavily backed by many peer-reviewed studies and is well documented and understood.</p>
        </div>
        
        <div class="articleItem wide">
          <h2>Energy:</h2> <br>
          <p>Many quantum healers claim that wave-particle duality demonstrates the interconnection between matter and energy, linking this directly to healing that is said to result from influencing the 'energy field' of the body <sup><a href="https://www.quantumenergyhealing.co.uk/" title="https://www.quantumenergyhealing.co.uk/" target="blank" >[1]</a><a href="https://www.quantumenergyhealing.co.uk/" title="https://www.quantumenergyhealing.co.uk/" target="blank" >[2]</a><a href="https://drlodayahospital.com/blogs/quantum-healing-benefits-risks/" title="https://drlodayahospital.com/blogs/quantum-healing-benefits-risks/" target="blank" >[3]</a></sup>. Unfortunately, there is no empirical evidence linking physics energy concepts such as this to any healing effects <sup><a href="https://doi.org/10.1103/physrevphyseducres.20.020145" title="https://doi.org/10.1103/physrevphyseducres.20.020145" target="blank" >[4]</a></sup>.</p>
        </div>
        
      

        <div class="articleItem left">
            <img class="articleImg" src="/assets/articleImages/SPDC_figure.png" alt="Quantum entanglement experiment">
            <p class="ImgCaption"></p> 
        </div>
        <div class="articleItem right">
          <h2>Entanglement:</h2>
          <p>'Quantum entanglement' is a word full of physics jargon that can sound incredibly complicated, and simple explanations of this phenomenon can sound very convincing, even when they are incorrect. Contrary to some views <sup><a href="https://www.prittieyoga.co.uk/blog2024/what-is-quantum-healing" title="https://www.prittieyoga.co.uk/blog2024/what-is-quantum-healing" target="blank" >[5]</a></sup>, quantum entanglement does not provide any proof of shared consciousness or an ability to unlock your own consciousness - it instead describes the relationship between two particles, where changes to one can affect the other.<br>Whilst applying these principles to health and healing can sound promising, it is unfortunately not a real application of quantum physics, and the suggestion that every conceivable thing in the universe - including our body and our consciousness - is interconnected is unfortunately false <sup><a href="https://doi.org/10.1103/physrevphyseducres.20.020145" title="https://doi.org/10.1103/physrevphyseducres.20.020145" target="blank" >[4]</a></sup>.</p>
        </div>
      
        <div class="articleItem wide">
          <h2>Observer Effect:</h2> <br>
          <p>Proponents of quantum healing also often refer to the observer effect <sup><a href="https://www.prittieyoga.co.uk/blog2024/what-is-quantum-healing" title="https://www.prittieyoga.co.uk/blog2024/what-is-quantum-healing" target="blank" >[5]</a></sup> - which is the idea that in quantum physics, observing or measuring something can actually change it, because there is no way to measure something without affecting it. To understand this, imagine checking the pressure of a bike tyre - when you attach the pressure gauge, some air escapes, meaning you've changed the amount of air in the tyre simply by measuring it. This effect is true even on the quantum level, but some people believe that this implies our intentions shape our reality by directing energy, which is untrue. Reality cannot be determined by external human intervention <sup><a href="https://doi.org/10.1103/physrevphyseducres.20.020145" title="https://doi.org/10.1103/physrevphyseducres.20.020145" target="blank" >[4]</a></sup>.</p>
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
          <p>In many discussions surrounding this topic, there appears to be a lack of foundational arguments, leading some writers to rely on various manipulation tactics instead.<p>
        </div>
        <div class="articleItem left">
          <img class="articleImg" src="/assets/articleImages/High_Frequency_Active_Auroral_Research_Program_site.jpg" alt="HAARP research station">
          <p class="ImgCaption">The HAARP research station in Alaska has been a freuqent source of speculation for conspiracy theor</p>
        </div>
        <div class="articleItem right">
          <p>Often, rather than presenting facts, writers frame their posts as questions. For instance, a post asking, "What's going on in Houston, Texas?" over an image that may otherwise not raise too many questions, but the presence of the question means it begins to seem suspicious. By not stating their own theories, they may aim to foster curiosity among those who are unfamiliar with the issue, while allowing the imaginations of those already engaged to run rampant.<br><br>
          Phrases such as "if you know... you know!" exploit human nature's tendency to fear exclusion. This approach creates an impression of an insider group, enticing individuals to explore further.<br><br>The inclusion of emojis in these posts can enhance relatability, with the 'thinking' emoji frequently used to project a sense of reliability—suggesting that the writer is engaging in critical thinking and thereby establishing trustworthiness.</p>
        </div>
        <div class="articleItem wide">
          <p>Often, precise numbers are quoted without appropriate sourcing. By being specific with what they claim to be facts or data they create a feeling of trust, as if they know exactly what is happening. This is similar to a common issue in statistical representation, where data is cited with greater precision than warranted, knowingly or not misrepresenting the inherent uncertainty in measurements and calculations, which can lead to a false sense of security regarding the certainty of the value.</p>
        </div>
      </div>
    </div>
  `,
    haarp2: `
    <div id="articleContainer">
      <div id="articleHead">
        <h1 id="articleTitle">Online Influence:</h1>
      </div>
      <div id="articleBody">
        <div class="articleItem left">
          <p>These issues are exacerbated by algorithms on platforms such as Facebook, where the primary goal is to drive engagement. Consequently, controversial posts often receive increased visibility; for example, reactions other than likes have previously been given five times the weight of likes. Fortunately, this was addressed in 2019 when data scientists at Facebook acknowledged that posts receiving angry emoji reactions were more likely to contain misinformation, subsequently leading to a change that reduced their impact on engagement<sup><a href="https://theweek.com/facebook/1006422/facebook-reportedly-gave-the-angry-emoji-5-times-as-much-weight-as-a-like" title="https://theweek.com/facebook/1006422/facebook-reportedly-gave-the-angry-emoji-5-times-as-much-weight-as-a-like" target="blank" >[1]</a></sup>.</p>
        </div>
        <div class="articleItem right">
          <img class="articleImg" src="/assets/articleImages/1024px-Aurora_borealis_above_Lyngenfjorden,_2012_March.jpg" alt="auroras">
          <p class="ImgCaption">HAARP investigates the Ionosphere the layer of the atmosphere which becomes ionised in auroras</p>
        </div>
        <div class="articleItem wide">
          <p>While this adjustment has been made, it remains all too easy to fall into a cycle of conspiracy theories and misinformation. The ability to search for terms like "weather control" often yields numerous posts spreading misinformation, many of which feature little to no fact-checking. The influence that just a few similar searches can have on an individual's feed is concerning. One way to mitigate this effect is to periodically log out of these platforms, open a private browsing window, and observe the content that appears without the constraints of the tunnel the algorithm creates.</p>
        </div>
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
          <p>While there are claims regarding the potential harmful effects of using microwaves for cooking, numerous studies have demonstrated their safety. Not only do microwaves not remain in food, but they also cannot escape the microwave oven during operation. The typical wavelength of microwaves in consumer ovens is approximately 12.2 cm, which is significantly larger than the mesh covering the door that allows visibility of the food inside. This design ensures that microwaves cannot escape due to the metal surfaces surrounding them, resulting in minimal levels detectable outside the appliance, well below background levels.<br>Microwaves are a form of non-ionizing radiation. Although they can cause burns if directed at the skin, they do not have the capability to directly damage DNA within cells - the process that can lead to mutations and issues such as cancer. </p>
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
          <p>Inaccurate information is frequently spread on sites such as Medical Daily and Instagram, utilizing various techniques to mislead the audience.</p>
        </div>
        <div class="articleItem left">
          <img class="articleItem left" src="./assets/articleImages/microwave.jpg" alt="A domestic microwave">
          <p class="ImgCaption">Misunderstandings of scientific terminology has provoked fears</p>
        </div>
        <div class="articleItem right">
          <p>One common method is the use of false source links. When individuals encounter a claim that cites a source, accompanied by a link, it can enhance their perception of the claim's legitimacy. In many cases, consumers may not take the time to verify the link, leading them to trust that credible information supports the claim. This strategy allows the creators of such content to cite sources that are unrelated to the topic at hand.
        </div>
        <div class="articleItem wide">
          <p>Another technique involves leveraging respected figures within society to build trust in their assertions. For example, references to unnamed 'doctors' making claims, without providing further identification or context, can manipulate public perception.<br><br> Additionally, the use of scientific terminology, such as 'toxins' and 'carcinogens,' can exploit individuals' inherent fear of the unknown. If a person does not fully understand the terminology, they may be more susceptible to persuasion, especially as the source presents itself with confidence. Fearmongering regarding topics like 'colon cancer' further preys on concerns about carcinogens—of which many exist in varying degrees and are not entirely understood. This can lead individuals to seek information from confident sources, often overlooking more balanced and nuanced literature.</p>
        </div> 
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
          <p>When the Large Hadron Collider (LHC) was switched on in 2008, alarmist claims spread: could it create a black hole and swallow Earth? Despite extensive safety assurances from physicists, the idea gained traction in media and online forums.<br>The fear stemmed from a misunderstanding of black holes and particle physics. Theoretically, the LHC could create tiny black holes, but they would evaporate instantly due to Hawking Radiation.<sup><a href="https://doi.org/10.1016/j.ppnp.2012.03.004" title="https://doi.org/10.1016/j.ppnp.2012.03.004" target="blank" >[1]</a></sup> Cosmic rays, high-energy particles from space, collide with Earth's atmosphere at far greater energies than those in the LHC, and the planet remains unharmed<sup><a href="http://dx.doi.org/10.1007/978-1-4020-9239-8" title="http://dx.doi.org/10.1007/978-1-4020-9239-8" target="blank" >[2]</a></sup>.<br>Why did so many believe the worst? Conspiracy theories exploit fear, distrust of experts, and exaggeration to manipulate perception. A common tactic, as seen here in the game, is creating distrust in scientists, framing them as untrustworthy or part of a cover-up. Another is making science seem intentionally complex, creating the illusion that vital information is being hidden. Conspiracy theories also rely on exaggeration and worst-case scenarios, like the claim that "The Earth could vanish in an instant!"</p>
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
          <p>Despite dramatic claims, the science tells a different story. The LHC, the world's most powerful particle accelerator, collides protons to study fundamental physics. Though this sounds extreme, the energy levels involved are far lower than those occurring naturally in the universe.<br>A major fear was that the LHC could create a black hole capable of consuming the Earth. If such black holes formed, they would be microscopic and evaporate instantly due to Hawking Radiation<sup><a href="https://doi-org.ezphost.dur.ac.uk/10.1103/PhysRevD.85.106007" title="https://doi-org.ezphost.dur.ac.uk/10.1103/PhysRevD.85.106007" target="blank" >[3]</a></sup>. The types of collisions happening in the LHC occur naturally via cosmic rays, which have struck Earth for billions of years without issue.<br>The LHC's safety has been extensively studied. CERN, the organisation running it, published multiple reports confirming no danger<sup><a href="https://doi.org/10.48550/arXiv.0806.3414" title="https://doi.org/10.48550/arXiv.0806.3414" target="blank" >[4]</a></sup>, with independent research supporting these findings. The energies produced are far too low to pose any threat<sup><a href="https://arxiv.org/pdf/0807.3349" title="https://arxiv.org/pdf/0807.3349" target="blank" >[5]</a></sup>. The black hole theory is an example of scientific terms being misused to create fear.</p>
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
  `,
    ne1: `
    <div id="articleContainer">
      <div id="articleHead">
        <h1 id="articleTitle">Nuclear Disasters</h1>
      </div>
      <div id="articleBody">
        <div class="articleItem wide">
          <p>Nuclear accidents have a large impact on the public perception of nuclear energy. Members of the public frequently associate the risk of nuclear energy with the accidentally nuclear power station disasters at Fukushima, Chernobyl and Three Mile Island <sup><a href="https://doi.org/10.1016/j.enpol.2016.09.061" title="https://doi.org/10.1016/j.enpol.2016.09.061" target="blank" >[1]</a><a href="https://doi.org/10.1016/j.enpol.2019.110888" title="https://doi.org/10.1016/j.enpol.2019.110888" target="blank" >[2]</a></sup>.</p>
      </div>
      <div class="articleItem left">
        <img class="articleImg" src="/assets/articleImages/pripyat.jpg" alt="Corridor in pripyat">
        <p class="ImgCaption">Corridor in Pripyat, the city evacuated following the Chernobyl Disaster</p> 
      </div>
      <div class="articleItem right">
        <h2>Chernobyl</h2>
        <p>The Chernobyl nuclear accident occurred in 1986, caused by a combination of faulty reactor design and poor personnel training. Following a shutdown test, one of the plant's reactors exploded, causing a major fire and releasing a significant amount of smoke, fission products and debris. The majority of the material was deposited near the site, but lighter fission products were carried northwest by the wind. The accident resulted in the largest uncontrolled release of radioactive material into the environment by a civilian operation ever recorded. Radioactive substances remained in the air for around 10 days, with Iodine-131 and Caesium-137 (two types of radioactive elements) contributing significantly to radiation doses.<br>In total, the accident killed 30 operators and firemen. 237 people onsite were diagnosed with acute radiation syndrome (ARS) and 28 died as a result <sup><a href="https://world-nuclear.org/information-library/safety-and-security/safety-of-plants/chernobyl-accident" title="https://world-nuclear.org/information-library/safety-and-security/safety-of-plants/chernobyl-accident " target="blank" >[3]</a></sup>. The accident had long-term effects for many people in Belarus, Russia and Ukraine, most notably including thyroid cancer in children and leukaemia in the power plant's operators. The release and subsequent transport of radioactive material also had significant negative impacts on the environment, with radionuclides (elements that release radiation as they break down over time) subsequently found in wood, forest food products and freshwater fish, causing particularly significant damage to forests and fresh water bodies <sup><a href="https://www.europarl.europa.eu/thinktank/en/document/EPRS_BRI(2016)581972" title="https://www.europarl.europa.eu/thinktank/en/document/EPRS_BRI(2016)581972" target="blank" >[4]</a></sup>. The economic impact of the disaster was grave - estimates put the total cost of the Chernobyl accident for Belarus at $235 billion as of 2005 <sup><a href="https://www.iaea.org/sites/default/files/chernobyl.pdf" title="https://www.iaea.org/sites/default/files/chernobyl.pdf" target="blank" >[5]</a></sup>. In the case of Ukraine, the financial impacts are still felt to this day, and as of 2019, the Ukrainian government continued to pay benefits to 36,525 women who became widows as a result of the accident <sup><a href="https://www.bbc.co.uk/future/article/20190725-will-we-ever-know-chernobyls-true-death-toll" title="https://www.bbc.co.uk/future/article/20190725-will-we-ever-know-chernobyls-true-death-toll" target="blank" >[6]</a></sup>.</p>
      </div>
      <div class="articleItem wide">
        <h2>Fukushima</h2>
        <p>The now decommissioned Fukushima nuclear power plant sits on the east coast of Japan, where in 2011, it was struck by an earthquake-driven tsunami. The preceding earthquake activated the safety sensors at the plant, leading to a shutdown of the reactors<sup><a href="https://www.bbc.co.uk/news/world-asia-56252695" title="https://www.bbc.co.uk/news/world-asia-56252695" target="blank" >[7]</a></sup>. The damage caused by the earthquake then led to a power cut at the plant, forcing it to run on emergency backup generators<sup><a href="https://doi.org/10.1126/science.abi5976" title="https://doi.org/10.1126/science.abi5976" target="blank" >[8]</a></sup>, which tried to cool the reactors as they remained incredibly hot. However, the arriving tsunami flooded the nearby sea wall and knocked out the emergency generators, preventing them from cooling the reactors<sup><a href="https://www.bbc.co.uk/news/world-asia-56252695" title="https://www.bbc.co.uk/news/world-asia-56252695" target="blank" >[7]</a></sup>. The sheer heat still present in the reactors led to them overheating and partially melting - known as a nuclear meltdown - causing hydrogen and oxygen to combine and explode, releasing radioactive material into the atmosphere and ocean<sup><a href="https://www.bbc.co.uk/news/world-asia-56252695" title="https://www.bbc.co.uk/news/world-asia-56252695" target="blank" >[7]</a><a href="https://doi.org/10.1126/science.abi5976" title="https://doi.org/10.1126/science.abi5976" target="blank" >[8]</a></sup>. 2,313 disaster-related deaths were recorded among earthquake, tsunami and nuclear evacuees from the area surrounding Fukushima, but only one of these was attributed to radiation <sup><a href="https://world-nuclear.org/information-library/safety-and-security/safety-of-plants/fukushima-daiichi-accident#:~:text=Official%20figures%20show%20that%20there,by%20the%20earthquake%20or%20tsunami" title="https://world-nuclear.org/information-library/safety-and-security/safety-of-plants/fukushima-daiichi-accident#:~:text=Official%20figures%20show%20that%20there,by%20the%20earthquake%20or%20tsunami" target="blank" >[9]</a></sup>. 
        The nuclear disaster led to no other adverse health effects in the local population <sup><a href="https://www.bbc.co.uk/news/world-asia-56252695" title="https://www.bbc.co.uk/news/world-asia-56252695" target="blank" >[7]</a></sup>, including no other cases of radiation sickness <sup><a href="https://world-nuclear.org/information-library/safety-and-security/safety-of-plants/fukushima-daiichi-accident#:~:text=Official%20figures%20show%20that%20there,by%20the%20earthquake%20or%20tsunami" title="https://world-nuclear.org/information-library/safety-and-security/safety-of-plants/fukushima-daiichi-accident#:~:text=Official%20figures%20show%20that%20there,by%20the%20earthquake%20or%20tsunami" target="blank" >[9]</a></sup>. The economic cost to Japan of the earthquake, tsunami and nuclear disaster was said to be $188 billion <sup><a href="https://www.aljazeera.com/news/2021/3/10/fukushima-disaster-in-maps-and-charts" title="https://www.aljazeera.com/news/2021/3/10/fukushima-disaster-in-maps-and-charts" target="blank" >[10]</a></sup>.</p>
      </div>
      <div class="articleItem wide">
        <p>Following both events, exclusion zone perimeters were set up to prevent exposure to radioactive contaminants <sup><a href="https://doi.org/10.1080/13683500.2023.2298344" title="https://doi.org/10.1080/13683500.2023.2298344" target="blank" >[11]</a></sup>. Whilst nuclear disasters significantly impact the human population, the environment and the economy, they are also exceedingly rare, and the low humanitarian impact of the nuclear disaster at Fukushima shows the progress in nuclear safety. The large number of deaths in that area that are directly attributed to the preceding natural disaster underscores the idea that the greatest threat in this situation was the earthquake and succeeding tsunami, rather than the power plant.</p>
      </div>
    </div>
  `,
    ne2: `
    <div id="articleContainer">
      <div id="articleHead">
        <h1 id="articleTitle">Other Hazards and Comparison</h1>
      </div>
      <div id="articleBody">
        <div class="articleItem wide">
          <p>A common concern seen on social media is the fear over the safety of nuclear waste disposal, with some describing it as 'dangerous' and a 'potential human and environmental disaster' <sup><a href="https://www.facebook.com/thesusanbradley/" title="https://www.facebook.com/thesusanbradley/" target="blank" >[12]</a></sup>. Whilst nuclear waste may be hazardous, most major industrial processes produce hazardous waste and less than 0.05% of all hazardous waste in the US results from nuclear power. Additionally, the transport of nuclear waste has never resulted in any radioactive release that has caused harm to people or the environment. The vast majority of nuclear waste only remains harmfully radioactive for a few tens of years, meaning it can easily be disposed of in near-surface underground facilities. Only about 3% of nuclear waste requires isolation for many thousands of years, and national regulations and international conventions, combined with technological developments and a multi-barrier approach, ensure that this waste is handled correctly and disposed of in a manner that secures its isolation and guarantees that it poses no risk to human health or to the environment<sup><a href="https://world-nuclear.org/information-library/nuclear-fuel-cycle/nuclear-waste/radioactive-wastes-myths-and-realities" title="https://world-nuclear.org/information-library/nuclear-fuel-cycle/nuclear-waste/radioactive-wastes-myths-and-realities" target="blank" >[13]</a></sup>.</p>
      </div>
      <div class="articleItem left">
        <img class="articleImg" src="/assets/articleImages/fission-reaction.jpg" alt="Nuclear fission reaction">
        <p class="ImgCaption">Nuclear fission releases lots of energy</p>
      </div>
      <div class="articleItem right">
          <p><br>One of the most feared of the hazards associated with nuclear power is ionising radiation. Radiation is a form of energy that travels as energised particles or electromagnetic waves. It is known as 'ionising' when it has sufficient energy to pull an electron away from its atom. Whilst 'ionising' is often thrown around like a scary word, it includes types of waves we hear about every day, such as X-rays<sup><a href="https://www.arpansa.gov.au/understanding-radiation/what-is-radiation/ionising-radiation" title="https://www.arpansa.gov.au/understanding-radiation/what-is-radiation/ionising-radiation" target="blank" >[14]</a></sup>. Like X-rays, all ionising radiation is dangerous, as it can cause cells to die or mutate, then leading to cancer<sup><a href="https://www.who.int/news-room/questions-and-answers/item/radiation-ionizing-radiation" title="https://www.who.int/news-room/questions-and-answers/item/radiation-ionizing-radiation" target="blank" >[15]</a></sup>. Nuclear power plants naturally emit ionising radiation, but, like X-rays, barriers can protect against this radiation, and current protection standards for nuclear power plants are based on the idea that any exposure to radiation carries some risk, so all steps are taken to ensure that radiation exposure for power plant workers remains as low as possible and that exposure for local residents is almost zero<sup><a href="https://www.nrdc.org/stories/nuclear-power-101" title="https://www.nrdc.org/stories/nuclear-power-101" target="blank" >[16]</a></sup>.</p>
      </div>
          <div class="articleItem wide">
          <p><br>As we move towards a low-carbon society, nuclear energy continues to emerge as an incredibly important form of sustainable, truly clean energy. Unlike wind, solar or tidal power, nuclear power production is not intermittent and can run 24/7, meaning that it is incredibly reliable [18], all while not releasing any carbon (unlike natural gas production). The sheer amount of energy produced by nuclear power plants means that one large plant can replace multiple coal plants, or smaller nuclear reactors could even be built on the site of old coal power plants, thereby reusing the land. Nuclear energy uses 46 times less land and 17 times less material than solar power in order to produce the same amount of energy and is the second safest source of energy in the world<sup><a href="https://www.iaea.org/newscenter/news/international-day-of-clean-energy-why-nuclear-power" title="https://www.iaea.org/newscenter/news/international-day-of-clean-energy-why-nuclear-power" target="blank" >[17]</a></sup>. This makes nuclear an exciting method of energy production that will be essential in securing Earth's sustainable future.</p>
      </div>
    </div>
    `,
    ne3: `
    <div id="articleContainer">
      <div id="articleHead">
        <h1 id="articleTitle">What can you do to stay safe?</h1>
      </div>
      <div id="articleBody">
        <div class="articleItem wide">
          <p>Within this storyline, we see an example of mis/disinformation being spread in order to further a political aim. Such motives are surprisingly common and although in this case the political volunteer is unaware of the misinformation he is spreading, people often intentionally share disinformation in order to achieve social or political aims, despite knowing the information they are sharing is false<sup><a href="https://doi.org/10.58248/PN719" title="https://doi.org/10.58248/PN719" target="blank" >[19]</a></sup>.</p>
      </div>
      <div class="articleItem wide">
          <p>In this scenario, the political volunteer uses words that evoke upsetting and destructive imagery. His repeated use of 'poisonous' and 'weaponry' implies situations of death and terror, and whilst nuclear power plants do use fission - the same process used in nuclear bombs - the production of nuclear weapons is in fact strictly controlled. Similarly, nuclear power plants operate with extremely strict safety controls that make nuclear power the second safest form of energy<sup><a href="https://www.iaea.org/newscenter/news/international-day-of-clean-energy-why-nuclear-power" title="https://www.iaea.org/newscenter/news/international-day-of-clean-energy-why-nuclear-power" target="blank" >[17]</a></sup>. While the radiation produced can have harmful impacts on the human body, these safety controls mean no 'poisonous' effects can result from the presence of a well-functioning nuclear power plant.</p>
      </div>
      <div class="articleItem wide">
          <p>However, many people that are not familiar with physics may not be aware of these facts, meaning that the use of this kind of imagery can be very convincing, which constitutes a grave misuse of the real physics principles involved in nuclear power production. People are more likely to believe mis/disinformation when it plays on their emotions<sup><a href="https://doi.org/10.1186/s41235-020-00252-3" title="https://doi.org/10.1186/s41235-020-00252-3" target="blank" >[20]</a></sup>, but stating the facts - as your player did here - is a proven way to ensure that real science prevails<sup><a href="https://www.apa.org/topics/journalism-facts/misinformation-recommendations" title="https://www.apa.org/topics/journalism-facts/misinformation-recommendations" target="blank" >[21]</a><a href="https://doi.org/10.1186/s41235-020-00252-3" title="https://doi.org/10.1186/s41235-020-00252-3" target="blank" >[22]</a></sup>.</p>
      </div>
    </div>
    `, 
    grb1: `
    <div id="articleContainer">
      <div id="articleHead">
        <h1 id="articleTitle">Mass Extinction?</h1>
      </div>
      <div id="articleBody">
        <div class="articleItem wide">
          <p>Many believe that gamma ray bursts (GRBs) may have triggered one or more extinction events, particularly the Ordovician extinction, during which marine species experienced a dramatic decline. Given this, it's understandable that there exists concerns regarding GRBs. However, there is no need for alarm.</p>
      </div>
      <div class="articleItem wide">
        <img class="articleImg" src="/assets/articleImages/GRB080319B_illustration_NASA.jpg" alt="artist's impression of a GRB event">
        <p class="ImgCaption">It is possible Gamma Ray bursts may have already triggered a mass extinction millions of years ago</p>
      </div>
      <div class="articleItem left">
        <p>Currently, Earth is protected by a layer of ozone situated 15-30km above the surface. A nearby GRB could potentially break down this layer, resulting in the formation of ground-level ozone. Nonetheless, even if the event were centered over the South Pole, where ozone depletion would be most concentrated, models indicate that surface ozone levels would peak at about 10 parts per billion. This level is significantly below the threshold of 30 parts per billion that would pose an increased risk of respiratory failure in humans or harm to vegetation.</p>
      </div>
      <div class="articleItem right">
        <p>One explanation for the belief that a GRB caused the Ordovician extinction relates to the water solubility of ozone. However, even if all the ozone produced were to dissolve, it is unlikely to have had more than a very minor effect on bacteria and fish larvae, suggesting it is improbable to have caused an extinction event in the past, or to cause one in the future.</p>
      </div>
    </div>
    `,
    grb2: `
    <div id="articleContainer">
      <div id="articleHead">
        <h1 id="articleTitle">Other Hazards and Comparison</h1>
      </div>
      <div id="articleBody">
        <div class="articleItem wide">
          <p>While many conspiracy theories and sources of misinformation can be disproven through scientific investigation, the evidence supporting the existence of gamma ray bursts complicates efforts to counteract misinformation.<br>The depletion of the ozone layer would also affect human health in a different way. This layer serves as a protective shield against UV radiation, and its absence could lead to an increased risk of sunburn and DNA damage, similar to the effects observed in regions with a depleted ozone layer, such as parts of the southern hemisphere. Additionally, the presence of nitrous oxide in the atmosphere would reduce sunlight reaching the Earth's surface, potentially leading to global cooling, while nitric acid rain could adversely affect ecosystems. </p>
        </div>
        <div class="articleItem wide">
            <p>There is evidence suggesting that a gamma ray burst may have impacted Earth in 774CE, as indicated by tree rings from that year, which exhibit carbon-14 levels approximately 20 times higher than normal, pointing to a GRB occurring within 13,000 light years. Despite this, humanity has persisted. Recent calculations propose that a GRB occurs close enough to affect Earth approximately every 5 million years. Given these findings and their realistic implications, it suggests that, even with some potential impacts, it is exceedingly unlikely to destroy life as we know it. </p>
        </div>
      </div>
    </div>
    `,
    fiveg1: `
    <div id="articleContainer">
      <div id="articleHead">
        <h1 id="articleTitle">Paranoia about 5G</h1>
      </div>
      <div id="articleBody">
        <div class="articleItem wide">
          <p>In the game, players encounter a persistent hum near a newly installed 5G tower. Some dismiss it as background noise, while others believe it causes strange effects, from memory lapses to unusual animal behaviour. One character, Mervin, insists the hum is part of a larger cover-up, linking unrelated events to support his claim.</p>
      </div>
      <div class="articleItem wide">
        <p>This reflects how conspiracy theories develop in real life. Faced with uncertainty, people seek explanations that align with their fears rather than evidence. Even when a logical answer, such as interference from an old signal relay, is provided, some reject it in favour of a dramatic interpretation. The storyline demonstrates how misinformation spreads and how difficult it is to change minds once fear takes hold.</p>
      </div>
      <div class="articleItem wide">
        <p>Conspiracy theories often begin with an unexplained event linked to unrelated occurrences to create a pattern. Mervin connects the hum to memory loss, pet behaviour, and dying plants. Though these events have no proven link, presenting them together makes them appear as evidence of a larger problem. Emotional appeal is key—Mervin fuels fear and urgency, pressuring others to act without questioning his claims. He also mistrusts experts, portraying sceptics as blind or complicit. </p>
      </div>
    </div>
    `,
    fiveg2: `
    <div id="articleContainer">
      <div id="articleHead">
        <h1 id="articleTitle">Safety of 5G</h1>
      </div>
      <div id="articleBody">
        <div class="articleItem wide">
          <p>Despite growing paranoia, the explanation is simple: some buildings' wiring picks up certain frequencies, creating an audio glitch. The hum has no connection to memory loss, plant health, or animal behaviour. Concerns about 5G have been widely studied, with no scientific evidence proving harm. The World Health Organization and other regulators confirm that 5G's non-ionising radiation lacks the energy to damage human cells or DNA. Its frequency range is similar to Wi-Fi and radio waves, which have been safely used for decades. </p>
      </div>
      <div class="articleItem wide">
          <p>Fears about 5G stem from misunderstandings about radio frequencies, much like past concerns over electricity and mobile phones. As shown in the game, misinformation thrives when new technology emerges, and unfamiliarity breeds fear. Understanding how 5G works helps separate fact from speculation.</p>
      </div>
    </div>
    `,
    fiveg3: `
    <div id="articleContainer">
      <div id="articleHead">
        <h1 id="articleTitle">Combatting Fears</h1>
      </div>
      <div id="articleBody">
        <div class="articleItem wide">
          <p>The game demonstrates how conspiracy theories shape public perception, even without evidence. Mervin refuses to accept the engineer's explanation, insisting the hum is part of something bigger. If players choose to publish his claims, paranoia spreads, showing how misinformation influences beliefs. In reality, false 5G claims led to vandalism and harassment during the COVID-19 pandemic, proving how difficult it is to correct misinformation once it takes hold. </p>
      </div>
      <div class="articleItem wide">
          <p>The game highlights how emotion often outweighs evidence, eroding trust in experts and affecting real-world issues like public health and climate change. Recognising how misinformation spreads is crucial to ensuring facts, not fear, shape our understanding. The hum was never a real threat, yet reactions to it mirror the dangers of misinformation. Conspiracy theories may seem harmless, but they spread fear, erode trust in science, and can lead to real-world harm. Understanding their influence helps us approach new information critically.</p>
      </div>
    </div>
    `,
    conclusionInform:`
     <div id="articleContainer">
      <div id="articleBody">
        <div class="articleItem wide">
<p> <div id="articleContainer">
      <div id="articleHead">
        <h1 id="articleTitle">Combatting Fears</h1>
      </div>
      <div id="articleBody">
        <div class="articleItem wide">
          <p>Well done! You have saved Echo Grove from delusion by educating the townspeople on the misuses of physics that once plagued within their community.</p>
          <p>Thanks to your hard work and dedication, their fears about nuclear power, gamma ray bursts, weather control, microwaves and the Large Hadron Collider have been put to rest. You have educated them on the misconceptions surrounding quantum healing.</p>
          <p>The townsfolk now recognise how mis/disinformation and conspiracies theories exploit real physics principles and the motivations behind these actions. By relying on scientists, experts, books and peer-reviewed research, you have ensured that truth prevails over pseudoscience. </p>
          <p>Thank you for playing! Feel free to visit Echo Grove again or explore our informative articles on physics and the ways it can be misused any time you like!</p>
        </div>
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

  const hideSidebar = () => {
    if (!sideMenu.classList.contains('fade-out')) {
      sideMenu.classList.add('fade-out');
      setTimeout(() => {
        sideMenu.classList.remove('fade-out', 'show');
      }, 200);
    }
  };

  const showSidebar = () => {
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

