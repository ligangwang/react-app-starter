import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchItems} from './ListItemAction';
import PropTypes from 'prop-types';

class ListItems extends Component{
  componentWillMount(){
    this.props.fetchItems(this.props.serviceProvider);
  }

  componentWillReceiveProps(nextProps){
      if(nextProps.newItem){
        this.props.items.unshift(nextProps.newItem);
      }
  }

  render(){
    const items = this.props.items.map(item=>(
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
          <p>{item.url}</p>
        </div>
    ));
    return (
      <div>
        <h1>Items</h1>
        {items}
      </div>
    );
  }
}

ListItems.propTypes = {
  fetchItems: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  newItem: PropTypes.object
}

const mapStateToProps = function(state){
  return {
    items: state.itemState.items,
    newItem: state.itemState.item
}};

export default connect(mapStateToProps, {fetchItems})(ListItems);
