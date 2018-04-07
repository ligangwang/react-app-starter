export const FETCH_ITEMS = "FETCH_ITEMS";

export const fetchItems = () => (dispatch) => {
    fetch("http://jsonplaceholder.typicode.com/posts")
    .then(res=>res.json())
    .then(items=>dispatch({
      type: FETCH_ITEMS,
      change: items
    }));
};
