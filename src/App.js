import React, { Component } from 'react'
import logo from './logo.svg'

import {Provider} from 'react-redux'
import {ListItems, PostItem} from './Item'
import {UserLogin} from './User'
import store from './store'
import firebaseItemProvider from './Service/Item/FirebaseItemProvider'
import firebaseUserProvider from './Service/User/FirebaseUserProvider'
import './App.css'
import {Link, Route, Switch} from 'react-router-dom'
// <PostItem serviceProvider={firebaseItemProvider}/>
const FirebasePostItem = (props) => <PostItem serviceProvider={firebaseItemProvider}/>
const FirebaseListItems = (props) => <ListItems serviceProvider={firebaseItemProvider}/>
const FirebaseUserLogin = (props) => <UserLogin serviceProvider={firebaseUserProvider}/>
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
              <FirebaseUserLogin/>
            </div>
          </header>
          <nav className="main-nav">
              <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/post">Post</Link></li>
              </ul>
          </nav>
          <div className="main-content">
            <Switch>
              <Route exact path="/" component={FirebaseListItems}/>
              <Route path="/post" component={FirebasePostItem}/>
              
            </Switch>
          </div>
          <aside className="main-sidebar"></aside>
          <div className="main-ad"></div>
          <footer className="main-footer">&copy; 2018</footer>
        </div>
      </Provider>
    );
  }
}

export default App;
