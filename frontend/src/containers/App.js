import React, { Component } from 'react';

import MyRouter from './navigation/MyRouter';
import HomeNav from './navigation/HomeNav';
//import '../App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
     };
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <HomeNav />{//links
          }
        </header>

        <MyRouter />{//routing infrastructure
        }
      </div>
    );
  }
}

export default App;
