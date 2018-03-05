import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
// import axios from 'axios';
import './App.css';
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import About from './components/About/About';
import User from './components/User/User';
import Recipe from './components/Recipe/Recipe';


class App extends Component {
  render() {
    return (
      <div className='wBackground'>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/Search' component={Search} />
          <Route path='/User' component={User} />
          <Route path='/About' component={About} />
          <Route path='/Recipe' component={Recipe} />
        </Switch>
      </div>
    );
  }
}

export default App;
