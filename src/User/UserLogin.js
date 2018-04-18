import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {changeUser} from './UserAction'
import './user.css'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent, 
  DialogTitle,
} from 'material-ui/Dialog'

class UserLogin extends Component{
  state = {
      loginBoxOpen: false,
    };

  onUserChange = user => {
    console.log(`change user: ${user}`)
    this.handleLoginClose();
    this.props.changeUser(user);
  }

  handleLoginClick = () => {
     this.setState({ loginBoxOpen: true });
  };

  handleLoginClose = () => {
    this.setState({ loginBoxOpen: false });
  };

  handleLogoutClick=()=>{
    this.props.serviceProvider.logOut(this.onUserChange);
  }
  render(){
    console.log(`render with user: ${this.props.user}`)

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
            <Button color="primary" onClick={this.handleLogoutClick}>Logout</Button>
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
