import React, {Component} from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {firebase, firebaseApp} from '../firebase'

class UserLogin extends Component{
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
    isSignedIn : null,
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

  render(){
    return (
      <div>
        {!this.state.isSignedIn &&
            <StyledFirebaseAuth className="App-intro" uiConfig={this.uiConfig}
                                firebaseAuth={firebaseApp.auth()}/>
        }
        {this.state.isSignedIn &&
            <div>
            <a className="Button" onClick={() => firebaseApp.auth().signOut()}>Logout</a>
            <br/><br/>Hello {firebaseApp.auth().currentUser.displayName}
            </div>
        }
      </div>
    );
  }
}

export default UserLogin;
