export const createUser = (state) => {
  return changeUser(state, 'http://localhost:3001/users', "POST");
}

export const updateUser = (state) => {
  return changeUser(state, 'http://localhost:3001/users/0', "PUT");
}

export const deleteUser = (state) => {
  return changeUser(state, 'http://localhost:3001/users/0', 'DELETE');
}

const changeUser = (state, url, method) => {
  const configData = {
    method: method,
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
