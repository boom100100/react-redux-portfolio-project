export const getRandomData = () => {
  return getData('https://uselessfacts.jsph.pl/random.json?language=en');

  /*format:

  json.*
  ex. json.id

  data sample:
  {
  "id":"bcaf7639-2f17-4308-beec-d51897243816",
  "text":"There are more psychoanalysts per capita in Buenos Aires than any other place in the world.",
  "source":"djtech.net",
  "source_url":"http:\/\/www.djtech.net\/humor\/useless_facts.htm",
  "language":"en",
  "permalink":"https:\/\/uselessfacts.jsph.pl\/bcaf7639-2f17-4308-beec-d51897243816"
  }
  */
}

export const getGraphData = () => {}
export const getPreliminaryData = (urlSearchTerm) => {
  //wikipedia fetch requires &origin=* in url
  return getData('https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + urlSearchTerm + '&format=json&origin=*');

  /*
  format:

  json.query.search[index].*
  ex. json.query.search[0].ns
  ex2. 'https://en.wikipedia.org/?curid=' + json.query.search[index].pageid

  data sample:
  {
    ns: 0
    pageid: 33306
    size: 141678
    snippet: "<span class="searchmatch">Water</span> is an inorganic, transparent, tasteless, odorless, and nearly colorless chemical substance, which is the main constituent of Earth's hydrosphere"
    timestamp: "2020-05-08T09:27:27Z"
    title: "Water"
    wordcount: 15458
  }

  */
}

export const getResearchData = () => {}

export const getSectionTitleData = () => {}

const getData = (url) => {
  return fetch(url);
}
