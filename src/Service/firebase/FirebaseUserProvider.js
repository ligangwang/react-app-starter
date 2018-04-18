import React from 'react'
import {firebase} from './firebaseApp'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

class FirebaseUserProvider{
  logIn(onSignedInOut){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      //var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      onSignedInOut({displayName: user.displayName});

    }).catch(function(error) {
      // Handle Errors here.
      //var errorCode = error.code;
      //var errorMessage = error.message;
      // The email of the user's account used.
      //var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      //var credential = error.credential;
      // ...
    });
  }

  logOut(onSignedInOut){
    firebase.auth().signOut().then(function(){
      onSignedInOut(null);
    });
  }

  getLoginUI(onSignedInOut){
    const uiConfig = {
      // Popup signin flow rather than redirect flow.
      signInFlow: 'popup',
      // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
      //signInSuccessUrl: '/signedIn',
      // We will display Google and Facebook as auth providers.
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        // Avoid redirects after sign-in.
        signInSuccess: (user) => {
          onSignedInOut({displayName: user.displayName})
        }
      }
    }
    return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
  }
}

const firebaseUserProvider = new FirebaseUserProvider();

export default firebaseUserProvider;
