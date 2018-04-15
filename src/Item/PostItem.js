import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {postItem} from './PostItemAction';
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'

class PostItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      title: "",
      summary: "",
      url: "",
      postBoxOpen: false,
      errors: {title: "", summary: ""}
    };

  }

  whatIsError = (item)=>{
    if (item.title===""){
      return Object.assign(this.state.errors, {title: "title is required"});
    }
    if (item.summary === ""){
      return Object.assign(this.state.errors, {summary: "summary is required"});
    }
    return null
  }

  onChange = (e)=>{
    this.setState({[e.target.name] : e.target.value});
  }

  onSubmit = (e) => {
    e.preventDefault();
    const item = {
      title: this.state.title.trim(),
      summary: this.state.summary.trim(),
      url: this.state.url.trim()
    }
    const error = this.whatIsError(item)
    if (error!==null){
      this.setState({errors: error})
    }else{
    //action
      this.props.postItem(this.props.serviceProvider, item)
      this.handlePostBoxClose()
    }
  }

  handlePostClick = () => {
     this.setState({ postBoxOpen: true });
  };

  handlePostBoxClose = () => {
    this.setState({ postBoxOpen: false });
  }

  render(){
    return (
      <div>
        <Button variant="raised" color="primary" onClick={this.handlePostClick}>Post</Button>
        <Dialog
               open={this.state.postBoxOpen}
               onClose={this.handlePostBoxClose}
               aria-labelledby="alert-dialog-title"
               aria-describedby="alert-dialog-description"
             >
            <DialogTitle id="alert-dialog-title">{"Post"}</DialogTitle>
            <DialogContent>
              <TextField label={this.state.errors.title!==""? this.state.errors.title: "title"} name="title"
                error={this.state.errors.title!==""}
                onChange={this.onChange} value={this.state.title} fullWidth/>
              <TextField label={this.state.errors.summary!==""? this.state.errors.summary:"summary"} name="summary"
                error={this.state.errors.summary!==""}
                multiLine={true} rows={5} onChange={this.onChange}
                value={this.state.summary} fullWidth/>
              <TextField label="url" name="url" onChange={this.onChange}
                value={this.state.url} fullWidth/>
              <br/><br/>
              <Button variant="raised" color="primary" onClick={this.onSubmit}>Submit</Button>
            </DialogContent>
            <DialogActions>
               <Button onClick={this.handlePostBoxClose} color="primary" autoFocus>
                 Close
               </Button>
            </DialogActions>
         </Dialog>
    </div>
    )
  }
}

PostItem.propTypes = {
  postItem: PropTypes.func.isRequired
};

export default connect(null, {postItem})(PostItem);
