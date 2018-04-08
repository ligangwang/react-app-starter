import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {postItem} from './PostItemAction';

class PostItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      title: "",
      summary: "",
      url: ""
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
      summary: this.state.summary,
      url: this.state.url
    }
    //action
    this.props.postItem(this.props.serviceProvider, item);
  }

  render(){
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Title: </label>
            <input type="text" name="title" onChange={this.onChange} value={this.state.title}/>
          </div>
          <br/>
          <div>
            <label>Summary: </label>
            <textarea name="summary" onChange={this.onChange} value={this.state.summary}/>
          </div>
          <br/>
          <div>
            <label>Url: </label>
            <input type="text" name="url" onChange={this.onChange} value={this.state.url}/>
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
