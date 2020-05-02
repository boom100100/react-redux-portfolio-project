
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoginContainer from '../LoginContainer';
import SignupContainer from '../SignupContainer';
import React from 'react';

const MyRouter = () => {
  return (

    <Router>
      <Route exact path="/" render={() => <div>Home</div>} />
      <Route exact path='/login' render={() => <LoginContainer />}/>
      <Route exact path='/signup' render={() => <SignupContainer />}/>
      <Route path="/projects" render={() => <div>Projects</div>} />
      <Route path="/projects/new" render={() => <div>New Project</div>} />
      <Route path="/projects/:project_id" render={() => <div>Fake ID</div>} />
      <Route path="/projects/:project_id/research-data" render={() => <div>Fake ID and research data</div>} />
      <Route path="/projects/:project_id/research-data/:data_id" render={() => <div>Fake ID and research data</div>} />
      <Route path="/projects/:project_id/preliminary-data" render={() => <div>Fake ID and preliminary data</div>} />
      <Route path="/projects/:project_id/preliminary-data/:data_id" render={() => <div>Fake ID and preliminary data</div>} />
      <Route path="/projects/:project_id/random-data" render={() => <div>Fake ID and random data</div>} />
      <Route path="/projects/:project_id/random-data/:data_id" render={() => <div>Fake ID and random data</div>} />
      <Route path="/projects/:project_id/graphs" render={() => <div>Fake ID and graph maker</div>} />
      <Route path="/projects/:project_id/graphs/:graph_id" render={() => <div>Fake ID and graph maker</div>} />
      <Route path="/projects/:project_id/section-titles" render={() => <div>Fake ID and section title writer</div>} />
      <Route path="/projects/:project_id/section-titles/:title_id" render={() => <div>Fake ID and section title writer</div>} />
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
