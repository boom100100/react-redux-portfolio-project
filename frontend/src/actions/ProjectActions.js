import * as projectApi from '../api/ProjectApi';

export const addProjects = (projects) => {
  // console.log('projects action', projects);
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

export const addSectionToProject = (json) => {
  console.log('doing addSectionToProject');
  return {
    type: 'ADD_SECTION',
    sectionTitle: json.section_title
  }
}

export const addDataToProject = (json) => {
  // console.log('figure out render crash','json', json);
  return {
    type: 'ADD_DATA',
    data: json
  }
}

export const addToBackend = (object, url, method, callback) => {
  //write thunk action.
  return () => {
    return projectApi.addToProject(object, url, method)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        callback(json);

        }).catch(error => console.log(error));
  }
}

function junk(){} export default junk;
