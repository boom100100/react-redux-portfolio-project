import * as dataApi from '../api/DataApi';

export const getRandomData = (updatefetchData) => {
  return getData(dataApi.getRandomData, updatefetchData);
}

export const getResearchData = (updatefetchData) => {
  // return getData(dataApi.getResearchData);
}

export const getPreliminaryData = (updatefetchData, urlSearchTerm) => {
  return getData(dataApi.getPreliminaryData, updatefetchData, urlSearchTerm);
}

export const getData = (doFetch, updatefetchData) => {
  return () => {
    console.log('random action');
    return doFetch()
      .then(response => response.json())
      .then(json => {
        console.log(json);
        updatefetchData(json);
        }).catch(error => console.log(error));
  }
}
