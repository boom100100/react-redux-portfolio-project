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
      if (redirect)
        redirect();

      }).catch(error => console.log(error));
}

export const deleteProjectState = (project) => {
  return {
    type: 'DELETE_PROJECT',
    project: project
  };
};

export const deleteProject = (object, url, method, callback, history, redirectCallback) => {
  return () => {
    return projectApi.deleteProject(object, url, method)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        callback(object);
        redirectCallback();
        // history.push('/projects');
        // history.go();

        }).catch(error => console.log(error));
  }
};

export const updateSectionState = (json) => {
  return {
    type: 'EDIT_SECTION',
    sectionTitle: json.section_title
  }
}

export const deleteSectionState = (json) => {
  return {
    type: 'DELETE_SECTION',
    sectionTitle: json.section_title
  }
}

export const deleteDataState = (json) => {
  return {
    type: 'DELETE_DATA',
    data: json
  }
}

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

export const updateSection = (object, url, method, callback) => {
  return () => {
    return projectApi.updateSection(object, url, method)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        callback(json);
      }).catch(error => console.log(error));
  }
}
export const deleteSection = (object, url, method, callback) => {
  return () => {
    return projectApi.deleteSection(object, url, method)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        callback(json);
      }).catch(error => console.log(error));
  }
}

export const deleteData = (object, url, method, callback) => {
  return () => {
    return projectApi.deleteData(object, url, method)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        callback(json);
      }).catch(error => console.log(error));
  }
}

export const addToBackend = (object, url, method, callback) => {
  return () => {
    return projectApi.addToProject(object, url, method)
      .then(response => response.json())
      .then(json => {
        callback(json);
      }).catch(error => console.log(error));
  }
}

function junk(){} export default junk;
