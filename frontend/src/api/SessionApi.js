
export const newSession = () => {
  const url = 'http://localhost:3001/sessions/new';
  return fetch(url);
}

export const login = (state) => {
  const url = 'http://localhost:3001/sessions';
  const configData = {
    method: "POST",
    credentials: "include",
    headers: {
      "Host": 'http://localhost:3000',
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify( state )
  };

  return fetch(url, configData);

}

export const logout = () => {
  const url = 'http://localhost:3001/sessions';
  const configData = {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Host": 'http://localhost:3000',
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    // TODO: MODIFY 'user'
    body: JSON.stringify( 'user' )
  };

  return fetch(url, configData);
}
