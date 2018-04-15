/** @flow */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import {AutoSizer, InfiniteLoader, List} from 'react-virtualized';
import './ListItems2.css';

const STATUS_LOADING = 1;
const STATUS_LOADED = 2;

export default class ListItems2 extends PureComponent {
  // static contextTypes = {
  //   list: PropTypes.instanceOf(Immutable.List).isRequired,
  // };

  constructor(props) {
    super(props);

    this.state = {
      loadedRowCount: 0,
      loadedRowsMap: {},
      loadingRowCount: 0,
      items: new Array(20),
    };


    this._clearData = this._clearData.bind(this);
    this._isRowLoaded = this._isRowLoaded.bind(this);
    this._loadMoreRows = this._loadMoreRows.bind(this);
    this._rowRenderer = this._rowRenderer.bind(this);
  }

  render() {
    const {items} = this.state;
    const {loadedRowCount, loadingRowCount} = this.state;
    return (
      <div className="contextBox">
        <div className="cacheButtonAndCountRow">
          <button onClick={this._clearData}>
            Flush Cached Data
          </button>

          <div className="cacheCountRow">
            {loadingRowCount} loading, {loadedRowCount} loaded
          </div>
        </div>

        <InfiniteLoader
          isRowLoaded={this._isRowLoaded}
          loadMoreRows={this._loadMoreRows}
          rowCount={items.length}>
          {({onRowsRendered, registerChild}) => (
            <AutoSizer disableHeight>
              {({width}) => (
                <List
                  ref={registerChild}
                  className="List"
                  height={200}
                  onRowsRendered={onRowsRendered}
                  rowCount={items.length}
                  rowHeight={30}
                  rowRenderer={this._rowRenderer}
                  width={width}
                />
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      </div>
    );
  }

  _clearData() {
    this.setState({
      loadedRowCount: 0,
      loadedRowsMap: {},
      loadingRowCount: 0,
      items: new Array(20),
    });
  }

  _isRowLoaded({index}) {
    const {loadedRowsMap} = this.state;
    return !!loadedRowsMap[index]; // STATUS_LOADING or STATUS_LOADED
  }

  _loadMoreRows({startIndex, stopIndex}) {
    const {loadedRowsMap, loadingRowCount} = this.state;
    const increment = stopIndex - startIndex + 1;

    for (var i = startIndex; i <= stopIndex; i++) {
      loadedRowsMap[i] = STATUS_LOADING;
    }

    this.setState({
      loadingRowCount: loadingRowCount + increment,
    });

    this.props.serviceProvider.getItems().then(returnItems => {
      this.setState({items:returnItems})
      const {loadedRowCount, loadingRowCount} = this.state;

//      delete this._timeoutIdMap[timeoutId];

      for (var i = startIndex; i <= stopIndex; i++) {
        loadedRowsMap[i] = STATUS_LOADED;
      }

      this.setState({
        loadingRowCount: loadingRowCount - increment,
        loadedRowCount: loadedRowCount + increment,
      });

      promiseResolver();
    });

    // this._timeoutIdMap[timeoutId] = true;

    let promiseResolver;

    return new Promise(resolve => {
      promiseResolver = resolve;
    });
  }

  _rowRenderer({index, key, style}) {
    const {items} = this.state;
    const {loadedRowsMap} = this.state;

    const item = items[index];
    let content;
    if (loadedRowsMap[index] === STATUS_LOADED) {
      content = `${item.title}   ${item.summary}   ${item.url}`;
    } else {
      content = (
        <div className="placeholder" style={{width: 100}} />
      );
    }

    return (
      <div className="row" key={key} style={style}>
        {content}
      </div>
    );
  }
}
