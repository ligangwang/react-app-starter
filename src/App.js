import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import 'firebase/auth';
import "firebase/firestore";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import {Provider} from 'react-redux';
import {ListItems, PostItem} from './Item';
import store from './Data/store';

const firebaseConfig = require('./firebase-config.json');
const firebaseApp = firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();


class App extends Component {
  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: ()=>false,
    },
  };

  state = {
    isSignedIn : undefined,
  };

  componentDidMount(){
    try{
      this.unregisterAuthObserver = firebaseApp.auth().onAuthStateChanged((user)=>{
          this.setState({isSignedIn : !!user});
      });
    }catch(error){
      this.unregisterAuthObserver = null;
    }
  }

  componentWillUnmount(){
    if (this.unregisterAuthObserver)
      this.unregisterAuthObserver();
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React App Starter</h1>
          </header>
          {this.state.isSignedIn !== undefined && !this.state.isSignedIn &&
            <div>
              <StyledFirebaseAuth className="App-intro" uiConfig={this.uiConfig}
                                  firebaseAuth={firebaseApp.auth()}/>
            </div>
          }
          {this.state.isSignedIn &&
            <div className="App-intro">
              <a className="Button" onClick={() => firebaseApp.auth().signOut()}>Logout</a>
              <br/><br/>Hello {firebaseApp.auth().currentUser.displayName}
            </div>
          }
          <PostItem/>
          <ListItems/>
        </div>
      </Provider>
    );
  }
}

export default App;
