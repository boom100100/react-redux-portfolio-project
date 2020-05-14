import * as dataApi from '../api/DataApi';

export const getRandomData = (updatefetchData) => {
  return getData(dataApi.getRandomData, updatefetchData);
}

export const getResearchData = (updatefetchData, urlSearchTerm) => {
  return getData(dataApi.getResearchData, updatefetchData, urlSearchTerm);
}

export const getPreliminaryData = (updatefetchData, urlSearchTerm) => {
  return getData(dataApi.getPreliminaryData, updatefetchData, urlSearchTerm);
}

export const getData = (doFetch, updatefetchData, urlSearchTerm) => {
  return () => {
    // console.log('data fetch action');
    return doFetch(urlSearchTerm)
      .then(response => response.json())
      .then(json => {
        updatefetchData(json);
        }).catch(error => console.log(error));
  }
}
