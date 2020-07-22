export const addToProject = (object, relativeUrl, method) => {
  return setupFetch(object, relativeUrl, method);
}

export const deleteProject = (object, relativeUrl, method) => {
  return setupFetch(object, relativeUrl, method);
}

export const updateSection = (object, relativeUrl, method) => {
  return setupFetch(object, relativeUrl, method);
}

export const deleteSection = (object, relativeUrl, method) => {
  return setupFetch(object, relativeUrl, method);
}

export const deleteData = (object, relativeUrl, method) => {
  return setupFetch(object, relativeUrl, method);
}

const setupFetch = (object, relativeUrl, method) => {
  const configData = {
    method: method,
    credentials: "include",
    headers: {
      "Host": 'http://localhost:3000',
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify( object )
  };

  return fetch('http://localhost:3001' + relativeUrl, configData);
}
