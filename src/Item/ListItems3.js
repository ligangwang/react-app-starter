import React, {Component} from 'react'
import InfiniteList from './InfiniteList'
import './ListItems3.css'
import ListItem from 'material-ui';

const applyUpdateResult = (result) => (prevState) => ({
  items: [...prevState.items, ...result.hits],
  page: result.page,
  isError: false,
  isLoading: false,
});

const applySetResult = (result) => (prevState) => ({
  items: result.hits,
  page: result.page,
  isError: false,
  isLoading: false,
});

const applySetError = (prevState) => ({
  isError: true,
  isLoading: false,
});

const getHackerNewsUrl = (value, page) =>
  `https://hn.algolia.com/api/v1/search?query=${value}&page=${page}&hitsPerPage=20`;

class ListItems3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      page: null,
      isLoading: false,
      isError: false,
      searchKey: "reactjs"
    };
  }

  componentDidMount(){
    this.fetchStories('reactjs', 0);
  }


  onInitialSearch = (e) => {
    e.preventDefault();

    const { value } = this.input;
    this.setState({searchKey: value})
    if (value === '') {
      return;
    }

    this.fetchStories(value, 0);
  }

  onPaginatedSearch = (e) =>
    this.fetchStories(this.input.value, this.state.page + 1);

  fetchStories = (value, page) => {
    this.setState({ isLoading: true });
    fetch(getHackerNewsUrl(value, page))
      .then(response => response.json())
      .then(result => this.onSetResult(result, page))
      .catch(this.onSetError);
  }

  onSetResult = (result, page) =>
    page === 0
      ? this.setState(applySetResult(result))
      : this.setState(applyUpdateResult(result));

  onSetError = () =>
    this.setState(applySetError);

  onSearchChange = (e) => {
      this.setState({[e.target.name] : e.target.value});
  }

  render() {

    return (
      <div className="page">
        <div className="interactions">
          <form type="submit" onSubmit={this.onInitialSearch}>
            <input name="searchKey" type="text" ref={node => this.input = node} onChange={this.onSearchChange} value={this.state.searchKey}/>
            <button type="submit">Search</button>
          </form>
        </div>

        <InfiniteList
          items={this.state.items}
          isError={this.state.isError}
          isLoading={this.state.isLoading}
          page={this.state.page}
          onPaginatedSearch={this.onPaginatedSearch}
        />
      </div>
    );
  }
}

export default ListItems3
// ListItems3.propTypes = {
//   fetchItems: PropTypes.func.isRequired,
//   items: PropTypes.array.isRequired,
//   newItem: PropTypes.object,
//   startAt: PropTypes.Number
// }

// const mapStateToProps = function(state){
//   return {
//     items: state.itemState.items,
//     newItem: state.itemState.item,
// }};

// export default connect(mapStateToProps, {fetchItems})(ListItems3);
