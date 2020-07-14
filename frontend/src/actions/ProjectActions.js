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

export const updateProjectState = (project, type) => {
  return {
    type: type, //'EDIT_PROJECT', 'CREATE_PROJECT'
    project: project
  };
};

export const updateProject = (object, url, method, callback, callbackType, redirect) => {
  return () => projectApi.addToProject(object, url, method)
    .then(response => response.json())
    .then(json => {
      console.log('json', json);
      callback(json, callbackType);
      redirect();

      }).catch(error => console.log(error));
}

export const deleteProjectState = (project) => {
  return {
    type: 'DELETE_PROJECT',
    project: project
  };
};

export const deleteProject = (object, url, method, callback, history) => {
  return () => {
    return projectApi.deleteProject(object, url, method)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        callback(object);
        history.push('/projects');
        // history.go();

        }).catch(error => console.log(error));
  }
};

export const addSectionToProject = (json) => {
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
        callback(json);
      }).catch(error => console.log(error));
  }
}

function junk(){} export default junk;
