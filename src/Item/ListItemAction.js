export const FETCH_ITEMS = "FETCH_ITEMS";

export const fetchItems = (serviceProvider) => (dispatch) => {
    serviceProvider.getItems()
    .then(res=>res.json())
    .then(items=>dispatch({
      type: FETCH_ITEMS,
      change: items
    }));
};
