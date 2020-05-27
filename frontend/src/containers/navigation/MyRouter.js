
import {BrowserRouter as Router, Route } from 'react-router-dom';
import LoginContainer from '../LoginContainer';
import LogoutContainer from '../LogoutContainer';
import SignupContainer from '../SignupContainer';
import ProfileContainer from '../ProfileContainer';
import ProfileEditContainer from '../ProfileEditContainer';
import ProfileDeleteContainer from '../ProfileDeleteContainer';
import ProjectsContainer from '../ProjectsContainer';
import ProjectContainer from '../ProjectContainer';
import NewProjectContainer from '../NewProjectContainer';
import EditProjectContainer from '../EditProjectContainer';
import React from 'react';

const MyRouter = (props) => {

  return (

    <Router>
      <Route exact path="/" render={() => <div>Home</div>} />
      <Route exact path='/login' render={() => <LoginContainer />}/>
      <Route exact path='/logout' render={() => <LogoutContainer />}/>
      <Route exact path='/signup' render={() => <SignupContainer />}/>
      <Route exact path='/profile' render={() => <ProfileContainer />}/>
      <Route exact path='/profile/edit' render={() => <ProfileEditContainer />}/>
      <Route exact path='/profile/delete' render={() => <ProfileDeleteContainer />}/>
      <Route exact path="/projects" render={() => <ProjectsContainer />} />
      <Route exact path="/projects/new" render={() => <NewProjectContainer />} />
      <Route exact path="/projects/:project_id" component={ProjectContainer} />
      <Route path="/projects/:project_id/read" component={ProjectContainer} />
      <Route path="/projects/:project_id/edit" component={EditProjectContainer} />
      <Route path="/projects/:project_id/delete" component={ProjectContainer} />
      {/*<Route path="/projects/:project_id/research-data" render={() => <div>Fake ID and research data</div>} />
      <Route path="/projects/:project_id/research-data/:data_id" render={() => <div>Fake ID and research data</div>} />
      <Route path="/projects/:project_id/preliminary-data" render={() => <div>Fake ID and preliminary data</div>} />
      <Route path="/projects/:project_id/preliminary-data/:data_id" render={() => <div>Fake ID and preliminary data</div>} />
      <Route path="/projects/:project_id/random-data" render={() => <div>Fake ID and random data</div>} />
      <Route path="/projects/:project_id/random-data/:data_id" render={() => <div>Fake ID and random data</div>} />
      <Route path="/projects/:project_id/graphs" render={() => <div>Fake ID and graph maker</div>} />
      <Route path="/projects/:project_id/graphs/:graph_id" render={() => <div>Fake ID and graph maker</div>} />
      <Route path="/projects/:project_id/section-titles" render={() => <div>Fake ID and section title writer</div>} />
      <Route path="/projects/:project_id/section-titles/:title_id" render={() => <div>Fake ID and section title writer</div>} />*/}
      <Route path="/random-data-finder" render={() => <div>Fake ID and section title writer</div>} />
      {/*Routes:

        #Projects
        #Official Data
        #Preliminary Data
        #Random Data
        #Graph Maker
        #Header Writer*/
      }
    </Router>
  )
}

export default MyRouter;
