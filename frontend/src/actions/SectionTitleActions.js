import * as dataApi from '../api/DataApi';

export const getSectionTitleData = (updatefetchData, urlSearchTerm) => {
  return getData(dataApi.getSectionTitleData, updatefetchData, urlSearchTerm);
}

const getData = (doFetch, updatefetchData, urlSearchTerm) => {
  return () => {
    // console.log('data fetch action');
    return doFetch(urlSearchTerm)
      .then(response => response.json())
      .then(json => {
        updatefetchData(json);
        }).catch(error => console.log(error));
  }
}
