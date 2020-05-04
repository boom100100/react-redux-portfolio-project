
export const newSession = () => {
  let url = 'http://localhost:3001/sessions/new';
  let configData = {method: "GET", headers: {
      "Host": 'http://localhost:3000',
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  };

  return fetch(url);
}

export const login = (state, token) => {
  let url = 'http://localhost:3001/sessions';
  let configData = {
    method: "POST",
    //"Credentials": "include",
    headers: {
      "Host": 'http://localhost:3000',
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify( state.user )
  };

  return fetch(url, configData);

}

export const logout = () => {
  let url = 'http://localhost:3001/sessions';
  let configData = {
    method: "DELETE",
    headers: {
      "Host": 'http://localhost:3000',
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Credentials': 'true'
    },
    // TODO: MODIFY 'user'
    body: JSON.stringify( 'user' )
  };

  return fetch(url, configData);
}
