import React, {Component} from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {firebase, firebaseApp} from '../firebase'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {changeLoginState} from './UserAction'

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

  componentDidMount(){
    try{
      this.unregisterAuthObserver = firebaseApp.auth().onAuthStateChanged((user)=>{
          //this.setState({isSignedIn : !!user});
          this.props.changeLoginState(!!user);
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
        {!this.props.isSignedIn &&
            <StyledFirebaseAuth className="App-intro" uiConfig={this.uiConfig}
                                firebaseAuth={firebaseApp.auth()}/>
        }
        {this.props.isSignedIn &&
            <div>
            <a className="Button" onClick={() => firebaseApp.auth().signOut()}>Logout</a>
            <br/><br/>Hello {firebaseApp.auth().currentUser.displayName}
            </div>
        }
      </div>
    );
  }
}

UserLogin.propTypes = {
  changeLoginState: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool.isRequired
};

const mapStateToProps = function(state){
  return {
    isSignedIn: state.userState.isSignedIn,
}};

export default connect(mapStateToProps, {changeLoginState})(UserLogin);
