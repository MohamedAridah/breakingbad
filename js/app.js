// Build Website Header & Footer
window.addEventListener("DOMContentLoaded", () => {
  createHeader();
  createFooter();
});

/*
    Variables
*/
// Base Url For The Api
let apiBaseUrl = `https://breakingbadapi.com/api/`;
// Endpoints
let characters = "characters",
  episodes = "episodes",
  quotes = "quotes",
  deaths = "deaths";
// Character Queries
let characterName = "?name=";
let characterSeries = "?category=";
let characterRandom = "character/random";
let characterLimit = "?limit=10&offset=0";
// Episodes Queries
let episodeSeries = "?series=";
// Quotes Queries
let quoteName = "quote?author=";
let quoteSeries = "quote?series=";
let quoteRandom = "quote/random";
// Dead Characters Queries
let deadCharacterName = "death?name=";
let deadCharacterSeries = "?category=";
let deadCharacterRandom = "random-death";
// Series Categoyies
let breakingBadSeries = "Breaking+Bad";
let betterCallSaulSeries = "Better+Call+Saul";
// Series Data Wrapper
let seriesWrapper = document.querySelector(".series-data");

/*
  Navgations Functions
*/
// Create Header
function createHeader() {
  if (document.querySelector(".header")) {
    return;
  } else {
    return (
      document.body.insertAdjacentHTML(
        "afterbegin",
        `
      <header class="header">
        <div class="logo">
            <a href="index.html">
                <h3>Breaking Bad</h3>
            </a>
        </div>
        <nav class="main-navgation">
            <a href="index.html">Home</a>
            <a href="characters.html">Characters</a>
            <a href="episodes.html">Episodes</a>
            <a href="quotes.html">Quotes</a>
            <a href="deaths.html">Deaths</a>
            <a href="about.html">About</a>
        </nav>
        <div class="toggle-menu">
            <ion-icon name="menu-outline" class="icon"></ion-icon>
        </div>
      </header>
    `
      ),
      expandNavgation()
    );
  }
}

// Expand Header Navgation Function
function expandNavgation() {
  let toggleMenu = document.querySelector(".toggle-menu");
  let navgation = document.querySelector(".main-navgation");
  let icon = toggleMenu.querySelector(".icon");

  toggleMenu.addEventListener("click", () => {
    // Change Icon
    icon.name == "menu-outline"
      ? (icon.name = "close-outline")
      : (icon.name = "menu-outline");
    // Open Or Close Navgation Menu
    if (navgation.classList.contains("expand")) {
      navgation.classList.remove("expand");
      navgation.style.height = "";
    } else {
      let navgationHeight = navgation.scrollHeight;
      navgation.classList.add("expand");
      navgation.style.height = `${navgationHeight}px`;
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) {
      navgation.classList.remove("expand");
      icon.name = "menu-outline";
      navgation.style.height = "";
    }
  });
}

// Create Footer
function createFooter() {
  if (document.querySelector(".footer")) {
    return;
  } else {
    return document.body.insertAdjacentHTML(
      "beforeend",
      `
      <footer class="footer">
        <a href="about.html" class="copyright">
          &copy; 2022 . This website made by Mohamed Aridah.
        </a>
        <ul class="social">
            <li>
              <a href="https://codepen.io/FedLover" target="_blank">
                <ion-icon name="logo-codepen" class='social-icon'></ion-icon>
              </a>
            </li>
            <li>
              <a href="https://github.com/mohamedaridah/breakingbad" target="_blank">
              <ion-icon name="logo-github" class='social-icon'></ion-icon>
            </a>
          </li>
        </ul>
      </footer>
    `
    );
  }
}

/*
    Building HTML Structure Functions
*/
// 1. Characters
// Build Characters HTML Structure Function
function buildCharacters(data) {
  return `
    <div class="card" id="${data.char_id}">
    <img src=${
      data.char_id == 39
        ? (data.img =
            "https://www.hollywoodreporter.com/wp-content/uploads/2013/09/bryan_cranston_holly_breaking_bad_h_2013.jpg?w=681&h=383&crop=1")
        : data.img
    } alt="${data.name}" class="card-image">
      <div class="brief-info">
          <h2 class="card-title">${data.name}</h2>
          <h4 class="card-subtitle">${data.nickname}</h4>
          <button class="btn btn-default click-effect" type="button">character details</button>
      </div>
    </div>
    `;
}

// Build Character Details HTML Structure Function
function buildCharacterDetails(data) {
  return `
      <div class="card-details" id="${data.char_id}">
          <div class="card-image">
              <img src="${data.img}" alt="${data.name}">
          </div>
          <div class="card-info">
              <ul>
                  <li><strong>name:</strong>${data.name}</li>
                  <li><strong>nickname:</strong>${data.nickname}</li>
                  <li><strong>actor:</strong>${data.portrayed}</li>
                  <li><strong>birthday:</strong>${data.birthday}</li>
                  <li><strong>career:</strong>
                  ${
                    data.occupation.length == 1
                      ? data.occupation
                      : `
                    <ul>
                      ${data.occupation
                        .map((item) => `<li>&nbsp;${item}</li>`)
                        .join("")}
                    </ul>
                    `
                  }
                  </li>
                  <li><strong>category:</strong>${data.category}</li>
                  <li><strong>appearance:</strong>${
                    data.appearance.length == 1
                      ? `Season ${data.appearance}`
                      : `
                    <ul>
                      ${data.appearance
                        .map(
                          (season) =>
                            `<li style="list-style: disc">Season ${season}</li>`
                        )
                        .join("")}
                    </ul>
                    `
                  }</li>
                  <li><strong>better call saul:</strong>${
                    data.better_call_saul_appearance.length == 0
                      ? `No, Didn't act in this series.`
                      : data.better_call_saul_appearance.length == 1
                      ? `Season ${data.better_call_saul_appearance}`
                      : `
                      <ul>
                        ${data.better_call_saul_appearance
                          .map(
                            (season) =>
                              `<li style="list-style: disc">Season ${season}</li>`
                          )
                          .join("")}
                      </ul>
                      `
                  }</li>
                  <li><strong>status:</strong>${data.status}</li>
              </ul>
              <div class="buttons-wrapper">
                <a href="characters.html" class="btn btn-default click-effect">back </a>
                <a href="index.html" class="btn btn-default click-effect">back home</a>
              </div>
          </div>
      </div>
  `;
}

// 2. Episodes
// Build Episode HTML Structure Function
function buildEpisodes(data) {
  let episodeBanner =
    "https://i.pinimg.com/originals/29/56/59/295659acf4af585687d763a76ded90e7.jpg";
  return `
      <div class="card" id="${data.episode_id}">
        <img src=${episodeBanner} alt="Episode Default Image" class="card-image">
        <div class="episode-number">
            <span>${data.episode}</span>
        </div>
        <div class="brief-info">
            <h2 class="card-title">${data.title}</h2>
            <h4 class="card-subtitle">Season ${data.season}</h4>
            <button class="btn btn-default click-effect" type="button">episode details</button>
        </div>
      </div>
    `;
}

// Build Episode Details HTML Structure Function
function buildEpisodeDetails(data) {
  let episodeBanner =
    "https://i.pinimg.com/originals/29/56/59/295659acf4af585687d763a76ded90e7.jpg";
  return `
      <div class="card-details" id="${data.episode_id}">
          <div class="card-image">
              <img src=${episodeBanner} alt="Default Episode Image">
          </div>
          <div class="card-info">
              <ul>
                  <li><strong>name:</strong>${data.title}</li>
                  <li><strong>season:</strong>Season ${data.season}</li>
                  <li><strong>episode number:</strong>Episode ${
                    data.episode
                  }</li>
                  <li><strong>release:</strong>${data.air_date}</li>
                  <li><strong>series:</strong>${data.series}</li>
                  <li><strong>characters:</strong>
                    <ul>
                      ${data.characters
                        .map((character) => `<li>&nbsp;${character}</li>`)
                        .join("")}
                    </ul>
                  </li>
              </ul>
              <div class="buttons-wrapper">
                <a href="episodes.html" class="btn btn-default click-effect">back </a>
                <a href="index.html" class="btn btn-default click-effect">back home</a>
              </div>
          </div>
      </div>
  `;
}

// Build Series Season Html Structure function
function buildSeason(data) {
  return `
    <section class="series-wrapper">
      <div class="series-title title">
        <div class="icon">
            <ion-icon name="chevron-down-outline"></ion-icon>
        </div>
        <h2>${data[0][0].series}</h2>
      </div>
      <div class="series-seasons">
      ${data
        .map((season, index) => {
          return `
          <section class="season season-${index + 1}">
            <div class="season-title title">
                <div class="icon">
                    <ion-icon name="chevron-down-outline"></ion-icon>
                </div>
                <h2>season ${index + 1}</h2>
            </div>
            <div class="season-episodes">
              ${season
                .map((episode) => {
                  return buildEpisodes(episode);
                })
                .join("")}
            </div>
        </section>
          `;
        })
        .join("")}
      </div>
    </section>
    `;
}

// 3. Quotes
// Build Quote HTML Structure Function
function buildQuotes(data) {
  return `
  <div class="quote" id="${data.quote_id}">
    <div class="quote-text">
        <h3>
            ${data.quote}
        </h3>
    </div>
    <div class="quote-info">
        <span class="quote-author">${data.author}</span>
        <span class="quote-series">${data.series}</span>
    </div>
  </div>
  `;
}

// 4. Dead Characters
// Build Dead Characters HTML Structure Function
function buildDeadCharacters(data) {
  return `
  <div class="card" id="${data.death_id}" data-name=${data.death}>
    <img src=${
      data.image == "" || data.image == undefined
        ? "https://i.pinimg.com/originals/32/3f/42/323f42a4c0cd14a5b6ec05eb253b8c7b.jpg"
        : data.image
    } alt="Image Of ${data.death}" class="card-image">
    <div class="brief-info">
        <h2 class="card-title">${data.death}</h2>
        <h4 class="card-subtitle">Season ${data.season}</h4>
        <button class="btn btn-default click-effect" type="button">More details</button>
    </div>
  </div>
    `;
}

// Build Dead Character Details HTML Structure Function
function buildDeadCharacterDetails(data) {
  return `
      <div class="card-details" id="${data.death_id}">
          <div class="card-image">
              <img src=${
                data.image == "" || data.image == undefined
                  ? "https://i.pinimg.com/originals/32/3f/42/323f42a4c0cd14a5b6ec05eb253b8c7b.jpg"
                  : data.image
              } alt="Image Of ${data.death}"/>
          </div>
          <div class="card-info">
              <ul>
                  <li><strong>name:</strong>${data.death}</li>
                  <li><strong>cause of death:</strong>${data.cause}</li>
                  <li><strong>person who killed him:</strong>${
                    data.responsible
                  }</li>
                  <li><strong>episode:</strong>${data.episode}</li>
                  <li><strong>season:</strong>${data.season}</li>
                  <li><strong>last words:</strong>${data.last_words}</li>
                  <li><strong>number of people he/she killed:</strong>${
                    data.number_of_deaths
                  }</li>
              </ul>
              <div class="buttons-wrapper">
                <a href="deaths.html" class="btn btn-default click-effect">back </a>
                <a href="index.html" class="btn btn-default click-effect">back home</a>
              </div>
          </div>
      </div>
  `;
}

/*
  Fetching Functions
*/
// 1. Characters
// Fetch [All] Series Characters.
async function charactersData(
  fetchMethod = `${characters}`,
  backButton = false,
  wrapper = seriesWrapper,
  hozSlider = false
) {
  try {
    // Api Link should Be Like:
    //https://breakingbadapi.com/api/characters
    let response = await fetch(`${apiBaseUrl}${fetchMethod}`);
    if (response.status == 200) {
      let data = await response.json();
      wrapper.innerHTML = "";
      // No Data Returned For The Api Call.
      if (data == "") {
        wrapper.classList.add("no-grid");
        wrapper.innerHTML = noData();
        // Remove Back Buttons If It Exist
        removeBackBtnsWrapper();
        // Hander Loader [Close It]
        controlLoader();
      } else {
        wrapper.classList.remove("no-grid");
        data.forEach((element) => {
          wrapper.innerHTML += buildCharacters(element);
        });

        if (hozSlider == true) {
          horizontalSlider(
            data,
            buildCharacters,
            wrapper,
            "characters",
            "characters"
          );
        }
        controlLoader();
        moreDetailsButtons("id", "details.html", "character", wrapper);
        backButtonStatus(backButton, "characters.html", wrapper);
      }
    } else {
      wrapper.classList.add("no-grid");
      wrapper.innerHTML = noData(
        `<strong>Unfortunately,</strong> We couldn't load data please, try again. <br>Details: ${response.statusText}.`
      );
      // Hander Loader [Close It]
      controlLoader();
    }
  } catch (err) {
    wrapper.classList.add("no-grid");
    wrapper.innerHTML = checkNetwork();
    // Hander Loader [Close It]
    controlLoader();
  }
}

// Fetch Detailed Character Function
async function characterDetails(fetchMethod = `${characters}`) {
  let characterId = sessionStorage.getItem("id");
  let queryType = sessionStorage.getItem("query");
  let wrapper = document.querySelector(".details");
  if (characterId == "null") {
    wrapper.innerHTML = noData();
  } else {
    if (queryType == "") {
      try {
        let response = await fetch(
          `${apiBaseUrl}${fetchMethod}/${characterId}`
        );
        let data = await response.json();
        data = data[0];
        wrapper.innerHTML += buildCharacterDetails(data);
      } catch {
        wrapper.classList.add("no-grid");
        wrapper.innerHTML = checkNetwork();
        // Handel Loader [Close It]
        controlLoader();
      }
    }
    if (queryType == "name") {
      try {
        let response = await fetch(
          `${apiBaseUrl}${characters}${characterName}${characterId}`
        );
        let data = await response.json();
        if (data == "") {
          document.querySelector(".details").innerHTML += noData(
            `Sorry, no data to review.! <br> It seems that api doesn't has available informations about <strong>${characterId.replace(
              /\+/g,
              " "
            )}</strong> character.`
          );
        } else {
          data = data[0];
          document.querySelector(".details").innerHTML +=
            buildCharacterDetails(data);
        }
      } catch {
        wrapper.classList.add("no-grid");
        wrapper.innerHTML = checkNetwork();
        // Handel Loader [Close It]
        controlLoader();
      }
    }
  }
  // Handle Loader (Close)
  controlLoader();
}

// Fetch [Random] Character
async function characterRandoms() {
  // Show Loader Until Data Load
  controlLoader("!close");
  // Api Link should Be Like:
  //https://breakingbadapi.com/api/character/random
  charactersData((fetchMethod = `${characterRandom}`), (backButton = true));
}

// Fetch Characters Depending On Series Type
async function charactersBySeries(optionValue) {
  if (optionValue == "breaking bad") {
    // Api Link should Be Like:
    //https://breakingbadapi.com/api/characters?category=Breaking+Bad
    // Fetch Breaking Bad Characters.
    charactersData(
      (fetchMethod = `${characters}${characterSeries}${breakingBadSeries}`)
    );
  } else if (optionValue == "better call saul") {
    // Api Link should Be Like:
    //https://breakingbadapi.com/api/characters?category=Better+Call+Saul
    // Fetch Better Call Saul Characters
    charactersData(
      (fetchMethod = `${characters}${characterSeries}${betterCallSaulSeries}`)
    );
  } else {
    // Fetch All Characters [The 2 Series]
    charactersData();
  }
}

// 2. Episodes
// Fetch [All] Series Episodes
async function episodesData(
  fetchMethod = `${episodes}`,
  backButton = false,
  randomEpisode = false,
  specificSeries = "",
  wrapper = seriesWrapper,
  hozSlider = false
) {
  try {
    // Api Link For Breaking Bad Series should Be Like:
    //https://breakingbadapi.com/api/episodes?series='Breaking+Bad'
    // Api Link For Better Call Saul Series should Be Like:
    //https://breakingbadapi.com/api/episodes?series="Better Call Saul"
    let responseOne = await fetch(
      `${apiBaseUrl}${fetchMethod}${episodeSeries}${breakingBadSeries}`
    );
    let responseTwo = await fetch(
      `${apiBaseUrl}${fetchMethod}${episodeSeries}${betterCallSaulSeries}`
    );
    let dataOne = await responseOne.json();
    let dataTwo = await responseTwo.json();
    wrapper.innerHTML = "";
    if ((dataOne && dataTwo) == "") {
      wrapper.classList.add("no-grid");
      wrapper.innerHTML = noData();
      // Remove Back Buttons If It Exist
      removeBackBtnsWrapper();
      // Handle Loader (Close)
      controlLoader();
    } else {
      // Breaking Bad Seasons
      let breakingBadSeason1 = [],
        breakingBadSeason2 = [],
        breakingBadSeason3 = [],
        breakingBadSeason4 = [],
        breakingBadSeason5 = [],
        // Better Call Saul Seasons
        betterCallSaulSeason1 = [],
        betterCallSaulSeason2 = [],
        betterCallSaulSeason3 = [],
        betterCallSaulSeason4 = [],
        // All Breaking Bad Seasons
        breakingBadSeasons = [],
        // All Better Call Saul Seasons
        betterCallSaulSeasons = [],
        // Breaking Bad All Better Call Saul Seasons
        allSeasons = [];
      // Build Series Seasons [Season By Season].
      // Build Breaking Bad Seasons.
      dataOne.filter((episode) => {
        switch (episode.season) {
          case "1":
          case " 1": // Extra Space In The API Naming.
            breakingBadSeason1.push(episode);
            break;
          case "2":
            breakingBadSeason2.push(episode);
            break;
          case "3":
            breakingBadSeason3.push(episode);
            break;
          case "4":
            breakingBadSeason4.push(episode);
            break;
          case "5":
            breakingBadSeason5.push(episode);
            break;
        }
      });
      // Build Better Call Saul Seasons [Season By Season].
      dataTwo.filter((episode) => {
        switch (episode.season) {
          case "1":
            betterCallSaulSeason1.push(episode);
            break;
          case "2":
            betterCallSaulSeason2.push(episode);
            break;
          case "3":
            betterCallSaulSeason3.push(episode);
            break;
          case "4":
            betterCallSaulSeason4.push(episode);
            break;
        }
      });
      // All Breaking Bad Seasons.
      breakingBadSeasons.push(
        breakingBadSeason1,
        breakingBadSeason2,
        breakingBadSeason3,
        breakingBadSeason4,
        breakingBadSeason5
      );
      // All Better Call Saul Seasons
      betterCallSaulSeasons.push(
        betterCallSaulSeason1,
        betterCallSaulSeason2,
        betterCallSaulSeason3,
        betterCallSaulSeason4
      );
      // All Breaking Bad & Better Call Saul Seasons
      allSeasons.push(breakingBadSeasons, betterCallSaulSeasons);
      wrapper.classList.add("no-grid");
      if (specificSeries == breakingBadSeries) {
        wrapper.innerHTML = buildSeason(breakingBadSeasons);
      } else if (specificSeries == betterCallSaulSeries) {
        wrapper.innerHTML = buildSeason(betterCallSaulSeasons);
      } else {
        wrapper.innerHTML = allSeasons
          .map((series, index) => {
            return `
          <section class="series-wrapper">
            <div class="series-title title">
              <div class="icon">
                  <ion-icon name="chevron-down-outline"></ion-icon>
              </div>
              <h2>${series[0][0].series}</h2>
            </div>
            <div class="series-seasons">
            ${series
              .map((season, index) => {
                return `
                <section class="season season-${index + 1}">
                  <div class="season-title title">
                      <div class="icon">
                          <ion-icon name="chevron-down-outline"></ion-icon>
                      </div>
                      <h2>season ${index + 1}</h2>
                  </div>
                  <div class="season-episodes">
                    ${season
                      .map((episode) => {
                        return buildEpisodes(episode);
                      })
                      .join("")}
                  </div>
              </section>
                `;
              })
              .join("")}
            </div>
          </section>
        `;
          })
          .join("");
      }
    }

    // Random Episode
    if (randomEpisode == true) {
      // Generate Random Episode.
      let response = await fetch(`${apiBaseUrl}${episodes}`);
      let data = await response.json();
      let length = data.length;
      let random = Math.floor(Math.random() * length);
      data = data[random];
      wrapper.classList.remove("no-grid");
      wrapper.innerHTML = buildEpisodes(data);
    }

    if (hozSlider == true) {
      dataOne.length = 10;
      horizontalSlider(dataOne, buildEpisodes, wrapper, "episodes", "episodes");
    }

    // Handle Loader (Close)
    controlLoader();
    moreDetailsButtons("id", "details.html", "episode", wrapper);
    backButtonStatus(backButton, "episodes.html", wrapper);
    let titles = document.querySelectorAll(".series-wrapper .title");
    titles.forEach((title) => {
      title.addEventListener("click", () => {
        (
          title.closest(".season") || title.closest(".series-wrapper")
        ).classList.toggle("fold");
      });
    });
  } catch {
    wrapper.classList.add("no-grid");
    wrapper.innerHTML = checkNetwork();
    // Handel Loader [Close It]
    controlLoader();
  }
}

// Fetch Detailed Episode Function
async function episodeDetails(fetchMethod = `${episodes}`) {
  let characterId = sessionStorage.getItem("id");
  let wrapper = document.querySelector(".details");
  if (characterId == "null") {
    wrapper.innerHTML = noData();
    // Handle Loader
    controlLoader();
  } else {
    try {
      let response = await fetch(`${apiBaseUrl}${fetchMethod}/${characterId}`);
      let data = await response.json();
      data = data[0];
      wrapper.innerHTML = buildEpisodeDetails(data);
      // Handle Loader
      controlLoader();
    } catch {
      wrapper.classList.add("no-grid");
      wrapper.innerHTML = checkNetwork();
      // Handel Loader [Close It]
      controlLoader();
    }
  }
}

// Fetch [Random] Episode Function.
// API Doesn't Support Random Episode Feature By Default.
async function episodeRandoms() {
  // Show Loader Until Data Load
  controlLoader("!close");
  episodesData(
    (fetchMethod = `${episodes}`),
    (backButton = true),
    (randomEpisode = true)
  );
}

// Fetch Episodes Depending On Series Type
function episodesBySeries(optionValue) {
  if (optionValue == "breaking bad") {
    // Function Here For Fetching Breaking Bad Eposodes
    episodesData(
      (fetchMethod = `${episodes}`),
      (backButton = false),
      (randomEpisode = false),
      (specificSeries = breakingBadSeries)
    );
  } else if (optionValue == "better call saul") {
    // Function Here For Fetching Better Call Saul Eposodes
    episodesData(
      (fetchMethod = `${episodes}`),
      (backButton = false),
      (randomEpisode = false),
      (specificSeries = betterCallSaulSeries)
    );
  } else {
    episodesData(
      (fetchMethod = `${episodes}`),
      (backButton = false),
      (randomEpisode = false),
      (specificSeries = "")
    );
  }
}

// 3. Quotes
// Fetch [All] Series Quotes
async function quotesData(
  fetchMethod = `${quotes}`,
  wrapper = seriesWrapper,
  hozSlider = false,
  backButton = false
) {
  try {
    // Api Link should Be Like:
    //https://breakingbadapi.com/api/quotes
    let response = await fetch(`${apiBaseUrl}${fetchMethod}`);
    // Fetch Is Successfull
    if (response.status == 200) {
      let data = await response.json();
      wrapper.innerHTML = "";
      // No Data Returned For The Api Call.
      if (data == "") {
        wrapper.innerHTML = noData();
        // Remove Back Buttons If It Exist
        removeBackBtnsWrapper();
        // Handle Loader (Close)
        controlLoader();
      } else {
        data.forEach((element) => {
          wrapper.innerHTML += buildQuotes(element);
        });

        if (hozSlider == true) {
          // Limit Quotes To Use Just 6 Of Them.
          data.length = 10;
          horizontalSlider(data, buildQuotes, wrapper, "quotes", "quotes");
        }
        quoteAuthorDetails();
        backButtonStatus(backButton, "quotes.html", wrapper);
        // Handle Loader (Close)
        controlLoader();
      }
    }
    // Fetch Is Failed
    else {
      wrapper.classList.add("no-data");
      wrapper.innerHTML = noData(
        `<strong>Unfortunately,</strong> We couldn't load data please, try again. <br>Details: ${response.statusText}.`
      );
      // Handel Loader [Close It]
      controlLoader();
    }
  } catch (err) {
    wrapper.classList.add("no-grid");
    wrapper.innerHTML = checkNetwork();
    // Handel Loader [Close It]
    controlLoader();
  }
}

// Show Quote Author Details Function.
function quoteAuthorDetails() {
  let authors = document.querySelectorAll(".quote-author");
  authors.forEach((author) => {
    author.addEventListener("click", () => {
      let authorName = author.textContent.replace(/ /g, "+");
      selectedForDetails(authorName, "details.html", "character", "name");
    });
  });
}

// Fetch [Random] Character
async function quoteRandoms() {
  // Show Loader Until Data Load
  controlLoader("!close");
  // Api Link should Be Like:
  //https://breakingbadapi.com/api/quote/random
  quotesData((fetchMethod = `${quoteRandom}`));
}

// Fetch Quotes Depending On Series Type
async function quotesBySeries(optionValue) {
  if (optionValue == "breaking bad") {
    //API Doesn't Provide This Now,But If They Provide This Feature Link 'll Be:
    // Api Link should Be Like:
    //https://breakingbadapi.com/api/quote?series=Breaking+Bad
    // quotesData((fetchMethod = `${quoteSeries}${breakingBadSeries}`));
    seriesWrapper.innerHTML = noData(
      `<strong>Unfortunately,</strong> API doesn't support this feature now.`
    );
    controlLoader();
  } else if (optionValue == "better call saul") {
    //API Doesn't Provide This Now,But If They Provide This Feature Link 'll Be:
    // Api Link should Be Like:
    //https://breakingbadapi.com/api/quote?series=Better+Call+Saul
    // quotesData((fetchMethod = `${quoteSeries}${betterCallSaulSeries}`));
    seriesWrapper.innerHTML = noData(
      `<strong>Unfortunately,</strong> API doesn't support this feature now.`
    );
    controlLoader();
  } else {
    // Fetch All Quotes [The 2 Series]
    quotesData();
  }
}

// 4. Dead Characters
// Fetch [All] Series Dead Characters
async function deadCharactersData(
  fetchMethod = `${deaths}`,
  backButton = false,
  wrapper = seriesWrapper,
  hozSlider = false
) {
  try {
    // Api Link should Be Like:
    //https://breakingbadapi.com/api/deaths
    let response = await fetch(`${apiBaseUrl}${fetchMethod}`);
    if (response.status == 200) {
      let data = await response.json();
      wrapper.innerHTML = "";
      // No Data Returned For The Api Call.
      if (data == "") {
        wrapper.classList.add("no-grid");
        wrapper.innerHTML = noData();
        // Remove Back Buttons If It Exist
        removeBackBtnsWrapper();
        // Handle Loader
        controlLoader();
        return;
      } else {
        // We Want The Response To Be An Array.
        // And Reandom Dead Character Return Singl Object. So We Will Do The Following:
        if (Array.isArray(data)) {
          data = data;
        } else {
          let dataArray = [];
          dataArray.push(data);
          data = dataArray;
        }
        // Get Image For Dead Characters If Available.
        // API Doesn't Contain Images For The Dead Character When We Call
        // ['https://www.breakingbadapi.com/api/deaths'].
        // So I Use Images From The
        // ['https://www.breakingbadapi.com/api/characters'] Call.
        // But I Found Another Problem That Not All The Dead Character [Exist or Have the Name In The
        // ['https://www.breakingbadapi.com/api/characters'] Call.
        // So I Looped Through Both And Provided Image For the Dead character That Already Exist In The
        // ['https://www.breakingbadapi.com/api/characters'] Call With the Same Name.

        // Fetch Characters
        let responseCharacter = await fetch(`${apiBaseUrl}${characters}`);
        let dataCharacter = await responseCharacter.json();
        let character = dataCharacter.map((character) => {
          return {
            characterName: character.name,
            characterImage: character.img,
          };
        });
        // Add Image Property To Matched Names.
        character.forEach((character) => {
          data.forEach((deadCharacter) => {
            if (character.characterName == deadCharacter.death) {
              deadCharacter.image = character.characterImage;
            }
          });
        });
        wrapper.classList.remove("no-grid");
        wrapper.innerHTML = "";
        data.forEach((element) => {
          wrapper.innerHTML += buildDeadCharacters(element);
        });

        if (hozSlider == true) {
          data.length = 10;
          horizontalSlider(
            data,
            buildDeadCharacters,
            wrapper,
            "dead characters",
            "deaths"
          );
        }

        controlLoader();
        moreDetailsButtons(
          "data-name",
          "details.html",
          "dead-character",
          wrapper
        );
        backButtonStatus(backButton, "deaths.html", wrapper);
      }
    } else {
      wrapper.classList.add("no-grid");
      wrapper.innerHTML = noData(
        `<strong>Unfortunately,</strong> We couldn't load data please, try again. <br>Details: ${response.statusText}.`
      );
      // Handel Loader [Close It]
      controlLoader();
    }
  } catch {
    wrapper.classList.add("no-grid");
    wrapper.innerHTML = checkNetwork();
    // Handel Loader [Close It]
    controlLoader();
  }
}

// Fetch Detailed Dead Character Function
async function deadCharacterDetails() {
  let characterId = sessionStorage.getItem("id");
  let wrapper = document.querySelector(".details");
  if (characterId == "null") {
    wrapper.innerHTML = noData();
    // Handle Loader (Close)
    controlLoader();
  } else {
    try {
      // Api Link should Be Like:
      //https://breakingbadapi.com/api/death?name=Walter+White;
      let response = await fetch(
        `${apiBaseUrl}${deadCharacterName}${characterId}`
      );
      if (response.status == 200) {
        let data = await response.json();
        data = data[0];
        // Fetch Characters
        let responseCharacter = await fetch(`${apiBaseUrl}${characters}`);
        let dataCharacter = await responseCharacter.json();
        let character = dataCharacter.map((character) => {
          return {
            characterName: character.name,
            characterImage: character.img,
          };
        });
        // Build Object With Name & Image Of The Dead Character.
        character.forEach((character) => {
          if (character.characterName == data.death) {
            data.image = character.characterImage;
          }
        });
        wrapper.innerHTML += buildDeadCharacterDetails(data);
        // Handle Loader
        controlLoader();
      } else {
        wrapper.classList.add("no-grid");
        wrapper.innerHTML = noData(
          `<strong>Unfortunately,</strong> We couldn't load data please, try again. <br>Details: ${response.statusText}.`
        );
        // Handel Loader [Close It]
        controlLoader();
      }
    } catch {
      wrapper.classList.add("no-grid");
      wrapper.innerHTML = checkNetwork();
      // Handel Loader [Close It]
      controlLoader();
    }
  }
}

// Fetch [Random] Character
async function deadCharacterRandoms() {
  // Show Loader Until Data Load
  controlLoader("!close");
  // Api Link should Be Like:
  //https://breakingbadapi.com/api/deaths/random
  deadCharactersData(
    (fetchMethod = `${deadCharacterRandom}`),
    (backButton = true)
  );
}

// Fetch Dead Characters Depending On Series Type
function deadCharactersBySeries(optionValue) {
  if (optionValue == "breaking bad") {
    // Fetch Breaking Bad Dead Characters
    // But API Doesn't Support This Feature.
    seriesWrapper.classList.add("no-grid");
    seriesWrapper.innerHTML = noData(
      `<strong>Unfortunately,</strong> API doesn't support this Feature now.`
    );
    // Handel Loader (Close)
    controlLoader();
  } else if (optionValue == "better call saul") {
    // Fetch Better Call Saul Dead Characters
    // But API Doesn't Support This Feature.
    seriesWrapper.classList.add("no-grid");
    seriesWrapper.innerHTML = noData(
      `<strong>Unfortunately,</strong> API doesn't support this Feature now.`
    );
    // Handel Loader (Close)
    controlLoader();
  } else {
    // Fetch All Dead characters [The 2 Series]
    deadCharactersData();
  }
}

/*
  Helper Functions
*/
// Choose Which Series To Show Its Data Function
function chooseSeries(category) {
  // Default Is All Option
  let options = document.querySelectorAll(".choose-method li");
  options.forEach((option) => {
    option.addEventListener("click", () => {
      activeClasses(options, "active");
      // Add [active] Class For Deferent Styling.
      option.classList.add("active");
      // Get Option [data-option] Attribute Value
      let optionValue = option.dataset.option;
      // console.log(optionValue);
      // Show Loader Until Data Load
      controlLoader("!close");
      // Excute Function Depending On [optionValue] Value.
      if (category == "characters") {
        charactersBySeries(optionValue);
      }
      if (category == "episodes") {
        episodesBySeries(optionValue);
      }
      if (category == "quotes") {
        quotesBySeries(optionValue);
      }
      if (category == "dead-characters") {
        deadCharactersBySeries(optionValue);
      }
    });
  });
}

// Get Random [Character, Episode, Etc...] Function
function getRandom() {
  // Random Buttons
  let randomButtons = document.querySelectorAll(".btn-random");
  randomButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let buttonCategory = button.closest("form");
      // Get Random Character
      buttonCategory.classList.contains("form-characters")
        ? characterRandoms()
        : "";
      // Get Random Episode
      buttonCategory.classList.contains("form-episodes")
        ? episodeRandoms()
        : "";
      // Get Random quote
      buttonCategory.classList.contains("form-quotes") ? quoteRandoms() : "";
      // Get Random Dead Character
      buttonCategory.classList.contains("form-dead-characters")
        ? deadCharacterRandoms()
        : "";
    });
  });
}
getRandom();

// Remove Back Buttons Wrapper Function
function removeBackBtnsWrapper() {
  document.querySelector(".back-buttons")
    ? document.querySelector(".back-buttons").remove()
    : "";
}

// Show More Button. (To show More Characters || Episodes, Etc...)
function showMoreButton(destination) {
  return `
  <div class="card card-action">
    <a class="btn btn-default btn-plus-icon click-effect" href="${destination}.html">
      <ion-icon name="add-outline" class='icon'></ion-icon> 
      show more
    </a>
  </div>
  `;
}

// Horizontal Slider Function
function horizontalSlider(data, callback, wrapper, title, destination) {
  wrapper.innerHTML = `
  <div class="subtitle">
      <h3>Some ${title}:</h3>
  </div>
  <div class="slider-body">
      <div class="slider-stage-outer">
          <div class="slider-stage hoz-grid ${title}-data">
          ${data
            .map((element) => {
              return callback(element);
            })
            .join("")}
              ${showMoreButton(destination)}
          </div>
      </div>
      <div class="slider-nav">
        <button type="button" class="arrow arrow-prev" >
            <ion-icon name="chevron-back-outline"></ion-icon>
        </button>
        <button type="button" class="arrow arrow-next" >
            <ion-icon name="chevron-forward-outline"></ion-icon>
        </button>
      </div>
  </div>
  `;

  let fromLeft = 0;
  let sliderBody = wrapper.querySelector(".slider-body");
  let sliderStage = sliderBody.querySelector(".slider-stage");
  let cards = sliderStage.children;
  let cardsNumber = cards.length;
  let cardWidth = cards[0].offsetWidth + 20; // 20px = Gap For Card
  let sliderStageTotalWidth = cardWidth * cardsNumber;
  window.addEventListener("resize", () => {
    // Recalculate Card Width & Slider Total Width
    cardWidth = cards[0].offsetWidth + 20; // 20px = Gap For Card
    sliderStageTotalWidth = cardWidth * cardsNumber;

    if (767 >= window.innerWidth) {
      sliderStage.style.transform = "translateX(0px)";
      fromLeft = 0;
    }
  });
  // sliderStage.style.width = sliderStageTotalWidth + "px";

  sliderBody.querySelectorAll(".arrow").forEach((arrow) => {
    arrow.addEventListener("click", () => {
      if (arrow.classList.contains("arrow-next")) {
        if (Math.abs(fromLeft) > sliderStageTotalWidth - window.innerWidth) {
          arrow.classList.add("disabled");
          return;
        } else {
          arrow.classList.remove("disabled");
          // Ensure That [prev] Arrow Is Visible & Working
          sliderBody.querySelector(".arrow-prev").classList.remove("disabled");
          // Skip 1 Cards Every Click.
          fromLeft -= cardWidth * 1;
          sliderStage.style.transform = `translateX(${fromLeft}px)`;
        }
      }
      if (arrow.classList.contains("arrow-prev")) {
        if (fromLeft == 0) {
          arrow.classList.add("disabled");
          return;
        } else {
          arrow.classList.remove("disabled");
          // Ensure That [next] Arrow Is Visible & Working
          sliderBody.querySelector(".arrow-next").classList.remove("disabled");
          // Skip 1 Cards Every Click.
          fromLeft += cardWidth * 1;
          sliderStage.style.transform = `translateX(${fromLeft}px)`;
        }
      }
    });
  });
}

// Toggle Loading Animation
function controlLoader(status = "close") {
  // controlLoader() || controlLoader(close) ==> Close Loader
  // controlLoader(!close) ==> Open Loader
  status == "close"
    ? document.querySelector(".loader").classList.add("close")
    : document.querySelector(".loader").classList.remove("close");
}

// Get [character, Episode, Quotes,etc.][Id, Name, or etc..] For More Details.
function selectedForDetails(id, destination, type, query = "") {
  sessionStorage.setItem("id", id);
  sessionStorage.setItem("type", type);
  sessionStorage.setItem("query", query);
  window.location = destination;
  return false;
}

// No Data Function
function noData(message = `Sorry, no data to review.!`, details = false) {
  return `
    <div class="message data">
      <h4 class="message-description">${message}</h4>
      <ul class="message-details">
        <p>You can try:</p>
        <li>Check your spelling</li>
        <li>Write character, episode full name</li>
      </ul>
      <a href="index.html" class="btn btn-default btn-plus-icon click-effect">
        back home <ion-icon class="icon" name="arrow-forward-outline"></ion-icon>
      </a>
    </div>
`;
}

// Network Connection Problem
function checkNetwork() {
  return `
    <div class="message">
      <div class="icon-wrapper">
        <img src="./images/wifi.svg" class="image" alt="Wi-Fi Icon">
      </div>
      <h4 class="message-description">network connection problem</h4>
      <ul class="message-details">
          <p>You can try:</p>
          <li>Check network cables, modem, and router.</li>
          <li>Reconnect to Wi-Fi.</li>
      </ul>
      <button class="btn btn-default btn-plus-icon click-effect" type='button' onclick= 'location.reload()'>
      try again
      <img src='./images/refresh.svg'/ class="image" alt="Refresh Icon">
      </button>
    </div>
`;
}

// Loop And Remove Classes.
function activeClasses(array, className) {
  array.forEach((element) => {
    element.classList.remove(className);
  });
}

// Show Details About Something When Clicking It's Button.
function moreDetailsButtons(
  getIdFrom,
  destination,
  type,
  wrapper = seriesWrapper
) {
  let buttons = wrapper.querySelectorAll(".card .brief-info .btn");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      let id = button.closest(".card").getAttribute(`${getIdFrom}`);
      selectedForDetails(id, destination, type);
    });
  });
}

// Control Showing Or Hiding Back Buttons
function backButtonStatus(backButton, destination, wrapper) {
  // If Function Accept Back Buttons & Back Buttons Not Exists. Add It
  if (backButton == true && wrapper.nextElementSibling == null) {
    wrapper.insertAdjacentHTML(
      "afterend",
      `
      <div class="buttons-wrapper wrapper-end back-buttons">
        <a href=${destination} class="btn btn-default click-effect">back</a>
        <a href="index.html" class="btn btn-default click-effect">back home</a>
      </div>
    `
    );
  }
  // If Function Doesn't Accept Back Buttons & Back Buttons Are Exists.Remove It
  if (backButton == false && wrapper.nextElementSibling != null) {
    removeBackBtnsWrapper();
  }
}

// Hide Scrollbar & Navgation Arrows On Mobil Phones & Devices That Support Touch Events.
async function touchEffect() {
  let isMobile =
    "ontouchstart" in document.documentElement &&
    navigator.userAgent.match(/Mobi/);
  // console.log(isMobile);
  if (isMobile == false) {
    document.body.classList.remove("support-touch");
  } else {
    document.body.classList.add("support-touch");
  }
}
touchEffect();

/*
    Search Functionality
*/
let searchForm = document.querySelector(".search-series");
if (searchForm) {
  // Prevent From Submitting
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  let input = searchForm.querySelector(".input-value");
  input.addEventListener("keyup", (e) => {
    let inputValue = input.value.trim();
    let formAlert = searchForm.querySelector(".alert-message");

    // Show Error For Empty Submitting.
    if ((e.keyCode == 13 || e.which == 13) && inputValue.length == 0) {
      formAlert.classList.add("show");
      setTimeout(() => {
        formAlert.classList.remove("show");
      }, 2000);
    }

    // According To API Documentation There Must Be + sympol Between Strings.
    // So We Will Replace Spaces With + Sympol.
    inputValue = inputValue.replace(/ /g, "+");

    // Search Characters By Name
    // Api Link should Be Like:
    // 1- For Searching Charcter => https://breakingbadapi.com/api/characters?name= {characterName}
    if (searchForm.classList.contains("form-characters")) {
      charactersData(
        (fetchMethod = `${characters}${characterName}${inputValue}`),
        (backButton = true)
      );
    }

    // Search Episodes
    // 2- For Searching Episode => https://breakingbadapi.com/api/episodes/{episodeId}
    // API Search For Episodes Only By Id. So I Will Make Array Of Objects;
    // Every Object Is {EpisodeName , EpisodeId}.
    // Then Compare User Input With EpisodeName If Matches Fetch Episode By Its Id
    if (searchForm.classList.contains("form-episodes")) {
      // Remove
      inputValue = inputValue
        .replace(/\+/g, "")
        .replace(/-/g, "")
        .replace(/_/g, "")
        .replace(/\./g, "")
        .toLowerCase();

      // Search Episode
      async function searchEpisode(backButton = true) {
        // Fetch Episodes
        let responseEpisodes = await fetch(`${apiBaseUrl}${episodes}`);
        let dataEpisodes = await responseEpisodes.json();
        let episode = dataEpisodes.map((episode) => {
          return {
            episodeName: episode.title
              .replace(/\+/g, "")
              .replace(/-/g, "")
              .replace(/_/g, "")
              .replace(/\./g, "")
              .toLowerCase(),
            episodeId: episode.episode_id,
          };
        });
        episode.forEach((episode) => {
          if (episode.episodeName == inputValue) {
            let id = episode.episodeId;
            fetch(`${apiBaseUrl}${episodes}/${id}`)
              .then((res) => res.json())
              .then((data) => {
                seriesWrapper.innerHTML = "";
                if (data == "") {
                  seriesWrapper.classList.add("no-grid");
                  seriesWrapper.innerHTML = noData();
                  // Remove Back Buttons If It Exist
                  removeBackBtnsWrapper();
                  // Handle Loader (Close)
                  controlLoader();
                } else {
                  data = data[0];
                  seriesWrapper.classList.remove("no-grid");
                  seriesWrapper.innerHTML += buildEpisodes(data);
                  // Handle Loader (Close)
                  controlLoader();
                  moreDetailsButtons("id", "details.html", "episode");
                  backButtonStatus(backButton, "episodes.html", seriesWrapper);
                }
              });
          } else {
            seriesWrapper.classList.add("no-grid");
            seriesWrapper.innerHTML = noData();
            // Remove Back Buttons If It Exist
            removeBackBtnsWrapper();
            // Handle Loader (Close)
            controlLoader();
          }
        });
      }
      searchEpisode();
    }

    // Search Quotes
    // 3- For Searching Quotes Author=> https://breakingbadapi.com/api/quote?author= {characterName}
    if (searchForm.classList.contains("form-quotes")) {
      quotesData(
        (fetchMethod = `${quoteName}${inputValue}`),
        (wrapper = seriesWrapper),
        (hozSlider = false)
      );
    }
    // Search Dead Characters
    // 4- For Searching Dead Characters => https://breakingbadapi.com/api/dead?name= {characterName}
    if (searchForm.classList.contains("form-dead-characters")) {
      deadCharactersData(
        (fetchMethod = `${deadCharacterName}${inputValue}`),
        (backButton = true)
      );
    }
  });
}
