import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {changeUser} from './UserAction'

class UserLogin extends Component{
  constructor(props){
    super(props);

    this.onSignedInOut = this.onSignedInOut.bind(this);
  }


  onSignedInOut(user){
    this.props.changeUser(user);
  }

  render(){
    return (
      <div>
        {!this.props.user &&
          <a className="Button" onClick={() => this.props.serviceProvider.logIn(this.onSignedInOut)}>Login with Google</a>
        }
        {this.props.user &&
            <div>
            <a className="Button" onClick={() => this.props.serviceProvider.logOut(this.onSignedInOut)}>Logout</a>
            <br/><br/>Hello {this.props.user.displayName}
            </div>
        }
      </div>
    );
  }
}

UserLogin.propTypes = {
  changeUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = function(state){
  return {
    user: state.userState.user,
}};

export default connect(mapStateToProps, {changeUser})(UserLogin);
