import React, {Component} from 'react'
import InfiniteList from './InfiniteList'
import './ListItems3.css'
import PropTypes from 'prop-types';
import {fetchItems, showUILoading} from './ListItemAction'
import {connect} from 'react-redux';

const PAGE_SIZE = 20

class ListItems3 extends Component {
  componentDidMount(){
    this.input.value = "reactjs"
    this.requestToLoadItems("reactjs", 0);
  }


  onSearch = (e) => {
    e.preventDefault();

    const { value } = this.input;
    if (value === '') {
      return;
    }
    console.log(`searching... ${value}`)
    this.requestToLoadItems(value, 0);
  }

  requestToLoadItems=(searchValue, startAt)=>{
    this.props.showUILoading()
    this.props.fetchItems(this.props.serviceProvider, searchValue, startAt, PAGE_SIZE);
  }
  onLoadMore = (e) =>
    this.requestToLoadItems(this.props.searchValue, this.props.startAt + PAGE_SIZE);

  
  render() {

    return (
      <div className="page">
        <div className="interactions">
          <form type="submit" onSubmit={this.onSearch}>
            <input name="searchValue" type="text" ref={node => this.input = node}/>
            <button type="submit">Search</button>
          </form>
        </div>

        <InfiniteList
          items={this.props.items}
          isError={this.props.isError}
          isLoading={this.props.isLoading}
          startAt={this.props.startAt}
          onLoadMore={this.onLoadMore}
        />
      </div>
    );
  }
}

ListItems3.propTypes = {
  fetchItems: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  newItem: PropTypes.object,
  startAt: PropTypes.number,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  searchValue: PropTypes.string
}

const mapStateToProps = function(state){
  return {
    items: state.itemState.items,
    newItem: state.itemState.item,
    startAt: state.itemState.startAt,
    searchValue: state.itemState.searchValue,
    isLoading: state.itemState.isLoading,
    isError: state.itemState.isError
}};

export default connect(mapStateToProps, {fetchItems, showUILoading})(ListItems3);
