import React, { Component } from 'react'
import logo from './logo.svg'

import {Provider} from 'react-redux'
import {ListItems, PostItem} from './Item'
import {UserLogin} from './User'
import store from './store'
import firebaseItemProvider from './Service/Item/FirebaseItemProvider'
import firebaseUserProvider from './Service/User/FirebaseUserProvider'
import './App.css'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="wrapper">
          <header className="main-header">
            <div className="main-header-logo">
              <img src={logo} alt="logo" />
            </div>
            <div className="main-header-login">
              <UserLogin serviceProvider={firebaseUserProvider}/>
            </div>
          </header>
          <nav className="main-nav">
              <ul>
                  <li><a href="">Nav 1</a></li>
                  <li><a href="">Nav 2</a></li>
                  <li><a href="">Nav 3</a></li>
              </ul>
          </nav>
          <div className="main-content">
            <PostItem serviceProvider={firebaseItemProvider}/>
            <ListItems serviceProvider={firebaseItemProvider}/>
          </div>
          <aside className="main-sidebar">Sidebar</aside>
          <div className="main-ad">ad</div>
          <footer className="main-footer">&copy; 2018</footer>
        </div>
      </Provider>
    );
  }
}

export default App;
