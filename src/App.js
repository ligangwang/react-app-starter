import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {Provider} from 'react-redux';
import {ListItems, PostItem} from './Item';
import {UserLogin} from './User'
import store from './store';
import firebaseItemProvider from './Service/Item/FirebaseItemProvider';
import firebaseUserProvider from './Service/User/FirebaseUserProvider';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React App Starter</h1>
          </header>
          <UserLogin serviceProvider={firebaseUserProvider}/>
          <PostItem serviceProvider={firebaseItemProvider}/>
          <ListItems serviceProvider={firebaseItemProvider}/>
        </div>
      </Provider>
    );
  }
}

export default App;
