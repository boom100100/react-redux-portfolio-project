export const getRandomData = () => {
  return getData('https://uselessfacts.jsph.pl/random.json?language=en', "GET");
  /*format:
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
  return getData('https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + urlSearchTerm + '&format=json', "GET");
}
export const getResearchData = () => {}
export const getSectionTitleData = () => {}


const getData = (url, method) => {
  const configData = {
    method: method,
    credentials: 'include',
    headers: {
       
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  };

  return fetch(url);
}
