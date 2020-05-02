export const createUser = (local_state) => {
  return {
    type: 'CREATE_USER',
    state: local_state
  };
};


export const editUser = (local_state) => {
  return {
    type: 'EDIT_USER',
    state: local_state
  };
};


export const deleteUser = (local_state) => {
  return {
    type: 'DELETE_USER',
    state: local_state
  };
};
