import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {changeUser} from './UserAction'
import './user.css'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import googleLogin from './btn_google_signin_light_normal_web.png'

class UserLogin extends Component{
  constructor(props){
    super(props);
  }

  state = {
      loginBoxOpen: false,
    };

  onUserChange = user => {
    this.handleLoginClose();
    this.props.changeUser(user);
  }

  handleLoginClick = () => {
     this.setState({ loginBoxOpen: true });
  };

  handleLoginClose = () => {
    this.setState({ loginBoxOpen: false });
  };

  render(){
    return (
      <div>
        {!this.props.user &&
          <div><Button variant="raised" color="primary" onClick={this.handleLoginClick}>login</Button>
          <Dialog
                   open={this.state.loginBoxOpen}
                   onClose={this.handleLoginClose}
                   aria-labelledby="alert-dialog-title"
                   aria-describedby="alert-dialog-description"
                 >
                <DialogTitle id="alert-dialog-title">{"Login"}</DialogTitle>
                <DialogContent>
                  {this.props.serviceProvider.getLoginUI(this.onUserChange)}
                </DialogContent>
                <DialogActions>
                     <Button onClick={this.handleLoginClose} color="primary" autoFocus>
                       Close
                     </Button>
                   </DialogActions>
             </Dialog>
          </div>
        }
        {this.props.user &&
            <div>
            <a className="user-login" onClick={() => this.props.serviceProvider.logOut(this.onUserChange)}>Logout</a>
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
