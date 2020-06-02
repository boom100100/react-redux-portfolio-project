export const addToProject = (object, relativeUrl, method) => {
  console.log('project2', object);
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
