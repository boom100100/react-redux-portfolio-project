export const addToProject = (object, relativeUrl, method) => {
  return setupFetch(object, relativeUrl, method);
}

export const deleteProject = (object, relativeUrl, method) => {
  return setupFetch(object, relativeUrl, method);
}

const setupFetch = (object, relativeUrl, method) => {
  console.log('deleteProject project2 object', object);
  // const relativeUrl = 'http://localhost:3001/projects/' + (project.id);
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
