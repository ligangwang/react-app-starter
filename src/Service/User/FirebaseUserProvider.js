import {firebase} from '../firebase'

class FirebaseUserProvider{
  logIn(onSignedInOut){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      onSignedInOut({displayName: user.displayName});

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  logOut(onSignedInOut){
    firebase.auth().signOut().then(function(){
      onSignedInOut(null);
    });
  }
}

const firebaseUserProvider = new FirebaseUserProvider();

export default firebaseUserProvider;
