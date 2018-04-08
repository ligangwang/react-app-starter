import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {changeUser} from './UserAction'

import styled from 'styled-components'
const LoginOut = styled.a`
  cursor: pointer;
  color: blue;
  text-decoration: underline;
  margin-top: 10px;
`

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
          <LoginOut onClick={() => this.props.serviceProvider.logIn(this.onSignedInOut)}>Login with Google</LoginOut>
        }
        {this.props.user &&
            <div>
            <LoginOut onClick={() => this.props.serviceProvider.logOut(this.onSignedInOut)}>Logout</LoginOut>
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
