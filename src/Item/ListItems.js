import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchItems} from './ListItemAction';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import Table, {TableHead, TableBody, TableRow, TableCell} from 'material-ui/Table'

class ListItems extends Component{
  UNSAFE_componentWillMount(){
    this.props.fetchItems(this.props.serviceProvider);
  }

  UNSAFE_componentWillReceiveProps(nextProps){
      if(nextProps.newItem){
        this.props.items.unshift(nextProps.newItem);
      }
  }

  render(){
    const items = this.props.items.map(item=>(
        <TableRow key={item.id}>
          <TableCell>{item.title}</TableCell>
          <TableCell>{item.summary}</TableCell>
          <TableCell>{item.url}</TableCell>
        </TableRow>
    ));
    return (
        <Paper zDepth={1}>
          <Table>
            <TableBody>
            {items}
            </TableBody>
          </Table>
        </Paper>
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
