export const addToProject = (object, url, method) => {
  console.log('project2', object);
  // const url = 'http://localhost:3001/projects/' + (project.id);
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

  return fetch('http://localhost:3001' + url, configData);
}
