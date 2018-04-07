import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {postItem} from './PostItemAction';

class PostItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      title: "",
      body: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name] : e.target.value});
  }

  onSubmit(e){
    e.preventDefault();
    const item = {
      title: this.state.title,
      body: this.state.body
    }
    //action
    this.props.postItem(this.props.serviceProvider, item);
  }

  render(){
    return (
      <div>
        <h1>Post Item</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Title: </label>
            <input type="text" name="title" onChange={this.onChange} value={this.state.title}/>
          </div>
          <br/>
          <div>
            <label>Body: </label>
            <textarea name="body" onChange={this.onChange} value={this.state.body}/>
          </div>
          <br/>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

PostItem.propTypes = {
  postItem: PropTypes.func.isRequired
};

export default connect(null, {postItem})(PostItem);
