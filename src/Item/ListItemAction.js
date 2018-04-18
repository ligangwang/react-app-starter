export const FETCH_ITEMS = "FETCH_ITEMS";
export const FETCH_ITEMS_ERROR = "FETCH_ITEMS_ERROR";
export const SHOW_UI_LOADING = "SHOW_UI_LOADING";

export const fetchItems = (serviceProvider, searchValue, startAt, batchSize) => (dispatch) => {
    serviceProvider.getItems(searchValue, startAt, batchSize)
    .then(items=>{
      const hasMoreData = items.length === batchSize
      dispatch({
      type: FETCH_ITEMS,
      change: {items, searchValue, startAt, hasMoreData}
    })})
    .catch((prevState) => (dispatch({
      type: FETCH_ITEMS_ERROR
    })))
};

export const showUILoading = ()=>(dispatch) => {
  dispatch({
    type: SHOW_UI_LOADING
  })
}
