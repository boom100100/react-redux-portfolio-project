import * as projectApi from '../api/ProjectApi';

export const addProjects = (projects) => {
  console.log('projects action', projects);
  return {
    type: 'ADD_PROJECTS',
    projects: projects
  };
}

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

export const addSectionToProject = (sectionTitle) => {
  console.log('doing addSectionToProject');
  return {
    type: 'ADD_SECTION',
    sectionTitle: sectionTitle
  }
}

export const addDataToProject = (data) => {
  console.log('figure out render crash','data', data);
  return {
    type: 'ADD_DATA',
    data: data
  }
}

export const addToBackend = (object, url, method) => {
  //write thunk action.
  return () => {
    return projectApi.addToProject(object, url, method)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        }).catch(error => console.log(error));
  }
}

function junk(){} export default junk;
