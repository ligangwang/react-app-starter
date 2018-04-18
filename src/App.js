import React, { Component } from 'react'
import logo from './logo.svg'

import {Provider} from 'react-redux'
import {ListItems3} from './Item'
import {UserLogin} from './User'
import store from './store'
import firebaseUserProvider from './Service/firebase/FirebaseUserProvider'
import './App.css'
import {Link, Route, Switch} from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Tabs, {Tab} from 'material-ui/Tabs'
import About from './About'
//const FirebasePostItem = (props) => <PostItem serviceProvider={firebaseItemProvider} props={props}/>
// import firebaseItemProvider from './Service/firebase/FirebaseItemProvider'
// const ListItemsContainer = (props) => <ListItems3 serviceProvider={firebaseItemProvider} props={props}/>
import hnItemProvider from './Service/hn/HNItemProvider'
const ListItemsContainer = (props) => <ListItems3 serviceProvider={hnItemProvider} props={props}/>
const FirebaseUserLogin = (props) => <UserLogin serviceProvider={firebaseUserProvider} props={props}/>

class App extends Component {
  render() {
    // <ul>
    //     <li><Link to="/">Home</Link></li>
    //     <li><Link to="/post">Post</Link></li>
    // </ul>
    return (
      <Provider store={store}>
        <div className="wrapper">
          <header className="main-header">
            <div className="main-header-logo">
              <img src={logo} alt="logo" />
            </div>
            <div className="main-header-command">
              <div className="main-header-command-item">
              </div>
              <div className="main-header-command-item">
                <FirebaseUserLogin/>
              </div>
            </div>
          </header>
          <nav className="main-nav">
            <AppBar position="static">
              <Tabs>
                <Tab label="Home" component={Link} to="/"/>
                <Tab label="About" component={Link} to="/about"/>
              </Tabs>
            </AppBar>
          </nav>
          <div className="main-content">
            <Switch>
              <Route exact path="/" component={ListItemsContainer}/>
              <Route path="/about" component={About}/>
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
