import React, { Component } from 'react';
import MyRouter from './navigation/MyRouter';
import HomeNav from './navigation/HomeNav';
//import '../App.css';

class App extends Component {
  state = {
    projects: {
      1: { id: 1, title: 'A River Runs Through It' },
      2: { id: 2, title: 'Se7en' },
      3: { id: 3, title: 'Inception' }
    }
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <HomeNav />{//links
          }{//routing infrastructure
          }<MyRouter />


        </header>
      </div>
    );
  }
}

export default App;
