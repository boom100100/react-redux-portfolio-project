export const createUser = (state) => {
  const url = 'http://localhost:3001/users';
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

export const updateUser = (state) => {
  const url = `http://localhost:3001/users/${state.email}`;
  const configData = {
    method: "PUT",
    credentials: "include",
    headers: {
      "Host": 'http://localhost:3000',
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    // TODO: MODIFY 'user'
    body: JSON.stringify( state )
  };

  return fetch(url, configData);
}

export const deleteUser = (state) => {
  const url = `http://localhost:3001/users/${state.email}`;
  const configData = {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Host": 'http://localhost:3000',
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    // TODO: MODIFY 'user'
    body: JSON.stringify( state )
  };

  return fetch(url, configData);
}
