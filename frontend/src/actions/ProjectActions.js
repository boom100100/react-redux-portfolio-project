export const addProjects = (projects) => {
  console.log('projects action', projects);
  return {
    type: 'ADD_PROJECTS',
    projects: projects
  };
}

// export const resetProjects = () => {
//   // console.log('projects action', projects);
//   return {
//     type: 'RESET_PROJECTS'
//   }
// }

export const createProject = (project) => {
  return {
    type: 'CREATE_PROJECT',
    project: project
  };
};


export const editProject = (project) => {
  return {
    type: 'EDIT_PROJECT',
    project: project
  };
};


export const deleteProject = (project) => {
  return {
    type: 'DELETE_PROJECT',
    project: project
  };
};

function junk(){} export default junk;
