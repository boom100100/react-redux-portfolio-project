export const createProject = (state) => {
  return {
    type: 'CREATE_PROJECT',
    state: state
  };
};


export const editProject = (state) => {
  return {
    type: 'EDIT_PROJECT',
    state: state
  };
};


export const deleteProject = (state) => {
  return {
    type: 'DELETE_PROJECT',
    state: state
  };
};
